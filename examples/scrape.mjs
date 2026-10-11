import { randomUUID } from 'node:crypto';
import { pathToFileURL } from 'node:url';

const terminal = new Set(['completed', 'failed', 'cancelled']);

export async function collect(url = 'https://example.com', {
  key = process.env.DEEPSFETCH_API_KEY,
  base = 'https://api.deepsfetch.com',
  jobId = process.env.DEEPSFETCH_JOB_ID,
  idempotencyKey = process.env.DEEPSFETCH_IDEMPOTENCY_KEY || randomUUID(),
  pollIntervalMs = 2_000,
  maxWaitMs = 15 * 60_000,
  progress = message => console.error(message),
} = {}) {
  if (typeof key !== 'string' || !key.trim()) throw new Error('Set DEEPSFETCH_API_KEY to a workspace API key.');
  if (!Number.isFinite(pollIntervalMs) || pollIntervalMs <= 0 || !Number.isFinite(maxWaitMs) || maxWaitMs <= 0) {
    throw new Error('Polling interval and deadline must be positive.');
  }
  const request = async (path, body) => {
    let response;
    try {
      response = await fetch(new URL(path, base), {
        method: body ? 'POST' : 'GET',
        headers: {
          authorization: `Bearer ${key}`,
          accept: 'application/json',
          ...(body ? { 'content-type': 'application/json', 'idempotency-key': idempotencyKey } : {}),
        },
        ...(body ? { body: JSON.stringify(body) } : {}),
        signal: AbortSignal.timeout(30_000),
      });
    } catch {
      throw new Error('DeepSFetch connection failed. Reuse the printed idempotency key or existing job ID.');
    }
    let data;
    try { data = await response.json(); } catch {
      throw new Error(`DeepSFetch HTTP ${response.status}: response is not JSON. Inspect the existing operation before retrying.`);
    }
    if (!response.ok) {
      const code = typeof data?.error === 'string' ? data.error : data?.error?.code;
      // Diagnostics never echo arbitrary server text, HTML, or credentials.
      const safeCode = typeof code === 'string' && /^[a-z_]{1,80}$/.test(code) ? code : 'request_failed';
      throw new Error(`DeepSFetch HTTP ${response.status}: ${safeCode}`);
    }
    return data;
  };
  let job;
  if (!jobId) {
    const parsed = new URL(url);
    if (!['https:', 'http:'].includes(parsed.protocol) || parsed.username || parsed.password) {
      throw new Error('Use a public HTTP(S) page URL without embedded credentials.');
    }
    progress(`Idempotency key: ${idempotencyKey}`);
    job = await request('/v2/scrape', {
      url, formats: ['markdown'], plannedLane: 'http_basic', async: true,
      costControl: { maxCredits: 3, allowFallback: false, cacheMode: 'fresh' },
    });
    jobId = job?.id;
    if (!jobId && !terminal.has(job?.status)) throw new Error('The submission response has no job ID. Preserve its idempotency key.');
  }
  if (jobId) progress(`Job ID: ${jobId}`);
  const started = Date.now();
  while (true) {
    if (job?.status === 'completed') return job;
    if (terminal.has(job?.status)) throw new Error(`Job ${jobId || 'unknown'} ${job.status}. Inspect this job before submitting another collection.`);
    const remaining = maxWaitMs - (Date.now() - started);
    if (remaining <= 0) throw new Error(`Timed out. Resume with DEEPSFETCH_JOB_ID=${jobId}; do not submit another collection.`);
    if (job) await new Promise(resolve => setTimeout(resolve, Math.min(pollIntervalMs, remaining)));
    job = await request(`/v2/jobs/${encodeURIComponent(jobId)}`);
  }
}

if (process.argv[1] && import.meta.url === pathToFileURL(process.argv[1]).href) {
  try {
    console.log(JSON.stringify(await collect(process.argv[2]), null, 2));
  } catch (error) {
    console.error(error.message);
    process.exitCode = 1;
  }
}
