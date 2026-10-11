# CLI: commands, files and recovery

Run the API from a terminal while retaining job control.

## 1. Install and configure

Requires Node.js 20.3+. Install the published CLI, inspect --help and set DEEPSFETCH_API_KEY in your terminal. Installation uses no credits. A BYOK key does not authenticate the CLI.

```text
npm install -g @deepsfetch/cli
deepsfetch --help
```


## 2. Execute a service body

Save /docs/scrape JSON as request.json and use --file to avoid shell escaping differences. scrape URL shortcut uses legacy basic HTTP; use the full body for auto engine. --wait waits for jobs and exits with error on failed/cancelled/timeout.

```text
deepsfetch scrape --file request.json --idempotency-key EXECUCAO_UNICA_20261011 --wait > result.json
```


## 3. Retrieve, cancel and estimate

map, crawl, search, extract, interact and watch accept --file. estimate reads estimator input. job retrieves; job --wait resumes. cancel changes public state and does not confirm provider interruption.

```text
deepsfetch job JOB_ID
deepsfetch job JOB_ID --wait
deepsfetch cancel JOB_ID
deepsfetch estimate --file estimate.json
```


## 4. Output, failures and retries

JSON goes to stdout; diagnostics and generated idempotency key go to stderr. Exit 1 indicates failure, cancellation or timeout. Preserve the recorded key and replay the same body only when needed; retrieving an existing job does not require another. Default --timeout-ms 30000; --max-wait-ms 900000.

## Continue your integration

- [Start here: account → key → first result](https://deepsfetch.com/docs/getting-started)
- [Jobs: track, resume and cancel](https://deepsfetch.com/docs/jobs)
- [Credits, estimates, cache and caps](https://deepsfetch.com/docs/costs)
