[English](README.md) | [Português](README.pt.md)

# DeepSFetch CLI

Use DeepSFetch API v2 from CMD, PowerShell, macOS or Linux terminals. Requires Node.js 20.3 or newer.

```sh
npm install -g @deepsfetch/cli
deepsfetch --help
```

Create an API key in [DeepSFetch → API keys](https://deepsfetch.com/app/api-keys). Save the full key when it is shown. Set it in the environment of your terminal:

```powershell
# PowerShell: applies to the current terminal only
$env:DEEPSFETCH_API_KEY = 'YOUR_DEEPSFETCH_API_KEY'
deepsfetch scrape https://example.com --wait
```

```sh
# macOS / Linux
export DEEPSFETCH_API_KEY='YOUR_DEEPSFETCH_API_KEY'
deepsfetch scrape https://example.com --wait
```

In Windows CMD use `set DEEPSFETCH_API_KEY=YOUR_DEEPSFETCH_API_KEY`. Do not commit API keys, put them in public frontend code, or share them. An AI provider key is a separate BYOK credential and does not authenticate the CLI.

## Commands

```sh
deepsfetch scrape https://example.com --wait
deepsfetch map https://example.com
deepsfetch crawl https://example.com --wait
deepsfetch search "renewable energy"
deepsfetch job JOB_ID
deepsfetch job JOB_ID --wait
deepsfetch cancel JOB_ID
deepsfetch estimate --file estimate.json
deepsfetch extract --file extract.json --wait
```

Use `--file request.json` (recommended across shells) or `--data '{"url":"https://example.com"}'` for the complete API request body. The commands `interact` and `watch` also accept these options. See the [API documentation](https://deepsfetch.com/docs) for fields and supported operations. Successful synchronous responses may not contain a job ID; use `--wait` only for job responses.

`scrape URL` defaults to HTTP basic, Markdown output and asynchronous execution. Results are JSON on stdout, suitable for files and pipelines. Status and errors go to stderr. `--wait` exits with code 1 for failed/cancelled jobs or a timeout. Other API/validation errors also exit with code 1.

## Credits and retries

Installing the CLI does not consume credits. The API key identifies your workspace; operations use the same balance and tariffs as the API and dashboard. In BYOK extraction, page collection still consumes DeepSFetch credits and the AI provider bills your own AI account directly. Eight concurrent requests is a plan limit, not eight free operations.

Each submitted operation prints its generated idempotency key to stderr. To retry that same operation after a connection failure, pass `--idempotency-key THE_SAME_KEY`; do not submit a new job just to check progress. The CLI never retries billable POST requests automatically. Query an existing job with `job JOB_ID`.

`--timeout-ms` changes the request timeout (default 30000); `--max-wait-ms` changes the polling deadline (default 900000). `--base-url` accepts an HTTPS API origin or an HTTP localhost test server. Point it only at a server you trust: it receives the API key.
