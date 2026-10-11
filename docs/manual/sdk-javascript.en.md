# JavaScript SDK: install, execute and resume

Integrate the API server-side with explicit completion and error handling.

## 1. Install and configure

Requires Node.js 20+; use 20.3+ when combining AbortSignal signals. Install @deepsfetch/sdk, configure DEEPSFETCH_API_KEY and save as collect.mjs. Run node collect.mjs. Do not expose the key in a public browser bundle.

```text
npm install @deepsfetch/sdk
```


## 2. Execute and validate

Use a new idempotency key per collection. waitForJob returns any terminal state, including failed/cancelled; code must check it. A polling timeout does not cancel server work.

```text
import { DeepSFetchClient } from '@deepsfetch/sdk';
import { randomUUID } from 'node:crypto';
const client = new DeepSFetchClient({ apiKey: process.env.DEEPSFETCH_API_KEY });
const job = await client.scrape({
  "url": "https://example.com",
  "collectionEngine": "auto",
  "engineStrategy": "auto",
  "formats": [
    "markdown"
  ],
  "costControl": {
    "maxCredits": 1,
    "allowFallback": false,
    "cacheMode": "fresh"
  },
  "async": true
}, { idempotencyKey: randomUUID() });
console.error('jobId:', job.id); // Save before waiting.
const done = await client.waitForJob(job.id);
if (done.status !== 'completed') throw new Error(JSON.stringify(done.error || done.status));
console.log(JSON.stringify(done.result, null, 2));
```


## 3. Resume without collecting again

Save submitted id before waiting. After interruption call client.getJob(id) or client.waitForJob(id). Default per-request timeoutMs is 30,000; waitForJob defaults to 2,000-ms interval and 900,000-ms deadline. Preserve id on expiry.


## 4. Other services and errors

Methods: scrape, extract, search, map, crawl, interact, watch, estimateCost, getJob, cancelJob and waitForJob. The first seven take the HTTP bodies from their guides. estimateCost does not collect. DeepSFetchError includes status/code/details/requestId. POST is not automatically retried; a custom baseUrl receives your key, use a trusted server.

## Continue your integration

- [Scrape: URL to content](https://deepsfetch.com/docs/scrape)
- [Jobs: track, resume and cancel](https://deepsfetch.com/docs/jobs)
- [Python SDK: install and retrieve jobs](https://deepsfetch.com/docs/sdk-python)
- [CLI: commands, files and recovery](https://deepsfetch.com/docs/cli)
