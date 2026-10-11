import { readFile } from 'node:fs/promises';
import { randomUUID } from 'node:crypto';

const operations = new Set(['scrape', 'map', 'crawl', 'search', 'extract', 'interact', 'watch', 'estimate']);
const help = `DeepSFetch CLI 1.0.0

Usage: deepsfetch <command> [arguments] [options]

Commands:
  scrape <url>       Collect one page (HTTP basic, Markdown, async)
  map <url>          Discover pages on a website
  crawl <url>        Start a crawl
  search <query>     Search the web
  extract           Extract fields (--data or --file required)
  interact          Browser interaction (--data or --file required)
  watch             Monitor a URL (--data or --file required)
  estimate          Estimate credits (--data or --file required)
  job <id>          Get an existing job
  cancel <id>       Cancel an existing job

Options:
  --data <json>              Request body as a JSON object
  --file <path>              Read the request body from a JSON file
  --wait                    Poll the returned job until it finishes
  --timeout-ms <number>     Request timeout (default: 30000)
  --max-wait-ms <number>    Polling deadline (default: 900000)
  --idempotency-key <key>   Reuse the same key to retry the same operation
  --base-url <url>          API origin (default: https://api.deepsfetch.com)
  --help                    Show help
  --version                 Show version

Set DEEPSFETCH_API_KEY to a key created at https://deepsfetch.com/app/api-keys.
Never use a provider's AI key here. Installation is free; operations use your
workspace's DeepSFetch credits. BYOK model usage is billed by the AI provider.
POST requests are not retried automatically. JSON results are written to stdout.
`;

function parse(args) {
  const options = {}, positionals = [];
  const values = new Set(['data', 'file', 'timeout-ms', 'max-wait-ms', 'idempotency-key', 'base-url']);
  for (let i = 0; i < args.length; i++) {
    const arg = args[i];
    if (arg.startsWith('--')) {
      const name = arg.slice(2);
      if (name === 'wait') options.wait = true;
      else if (values.has(name)) {
        if (options[name] !== undefined) throw new Error(`Duplicate option: ${arg}`);
        if (args[i + 1] === undefined || args[i + 1].startsWith('--')) throw new Error(`Missing value for ${arg}`);
        options[name] = args[++i];
      } else throw new Error(`Unknown option: ${arg}`);
    } else positionals.push(arg);
  }
  return { options, positionals };
}

function positiveInt(value, fallback, label) {
  if (value === undefined) return fallback;
  const number = Number(value);
  if (!Number.isSafeInteger(number) || number <= 0) throw new Error(`${label} must be a positive integer`);
  return number;
}

function object(text) {
  let body;
  try { body = JSON.parse(text); } catch { throw new Error('Request body must be valid JSON'); }
  if (!body || Array.isArray(body) || typeof body !== 'object') throw new Error('Request body must be a JSON object');
  return body;
}

function origin(raw) {
  const url = new URL(raw);
  if (url.username || url.password || url.search || url.hash || !['', '/'].includes(url.pathname)) throw new Error('--base-url must be an API origin without credentials or a path');
  const local = ['localhost', '127.0.0.1', '[::1]'].includes(url.hostname);
  if (url.protocol !== 'https:' && !(local && url.protocol === 'http:')) throw new Error('--base-url requires HTTPS (HTTP is allowed for localhost tests)');
  return url.origin;
}

export async function run(args, {
  Client, env = process.env, stdout = process.stdout, stderr = process.stderr, read = readFile,
} = {}) {
  const key = typeof env.DEEPSFETCH_API_KEY === 'string' ? env.DEEPSFETCH_API_KEY.trim() : '';
  const redact = text => key ? text.split(key).join('[REDACTED]') : text;
  const print = value => stdout.write(redact(JSON.stringify(value, null, 2)) + '\n');
  try {
    if (!args.length || args.includes('--help') || args.includes('-h')) { stdout.write(help); return 0; }
    if (args.length === 1 && args[0] === '--version') { stdout.write('1.0.0\n'); return 0; }
    const { options, positionals } = parse(args);
    const [command, ...rest] = positionals;
    if (!operations.has(command) && !['job', 'cancel'].includes(command)) throw new Error('Unknown command. Run deepsfetch --help');
    if (options.wait && ['estimate', 'cancel'].includes(command)) throw new Error('--wait is supported for submitted jobs and job lookups');
    if (options.data !== undefined && options.file !== undefined) throw new Error('Choose --data or --file');
    if (['job', 'cancel'].includes(command) && (rest.length !== 1 || options.data !== undefined || options.file !== undefined)) throw new Error(`${command} requires exactly one job ID and no request body`);
    const timeoutMs = positiveInt(options['timeout-ms'], 30_000, '--timeout-ms');
    const maxWaitMs = positiveInt(options['max-wait-ms'], 900_000, '--max-wait-ms');
    const baseUrl = origin(options['base-url'] ?? 'https://api.deepsfetch.com');
    let body;
    if (operations.has(command)) {
      if (options.data !== undefined) body = object(options.data);
      else if (options.file !== undefined) body = object(await read(options.file, 'utf8'));
      else if (['scrape', 'map', 'crawl'].includes(command) && rest.length === 1) {
        body = { url: rest[0] };
        if (command === 'scrape') Object.assign(body, { formats: ['markdown'], plannedLane: 'http_basic', async: true });
      } else if (command === 'search' && rest.length) body = { query: rest.join(' ') };
      else throw new Error(`${command} requires --data, --file, or its documented argument`);
      if ((options.data !== undefined || options.file !== undefined) && rest.length) throw new Error('Do not combine a JSON body with positional arguments');
    }
    if (!key) throw new Error('Set DEEPSFETCH_API_KEY to an active DeepSFetch API key');
    const client = new Client({ apiKey: key, baseUrl, timeoutMs });
    const idempotencyKey = options['idempotency-key'] ?? randomUUID();
    let result;
    if (command === 'job') result = await client.getJob(rest[0]);
    else if (command === 'cancel') result = await client.cancelJob(rest[0], { idempotencyKey });
    else {
      if (command !== 'estimate') stderr.write(`Idempotency key: ${idempotencyKey}\n`);
      result = await client[command === 'estimate' ? 'estimateCost' : command](body, { idempotencyKey });
    }
    if (options.wait) {
      if (!result?.id) throw new Error('The response has no job ID to wait for');
      if (!['completed', 'failed', 'cancelled'].includes(result.status)) result = await client.waitForJob(result.id, { maxWaitMs });
    }
    print(result);
    return options.wait && ['failed', 'cancelled'].includes(result?.status) ? 1 : 0;
  } catch (error) {
    stderr.write(redact(JSON.stringify({ error: { code: error.code ?? 'cli_error', message: error.message ?? 'Command failed', ...(error.status ? { status: error.status } : {}) } })) + '\n');
    return 1;
  }
}
