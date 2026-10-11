# API responses, artifacts and errors

Distinguish acceptance, completion and content quality.

## Job envelope

Job responses use id, kind, status, result, error and timestamps. result may be null while work is pending. A job error contains code and message; a request error uses error.code, error.message and error.requestId. This is an illustrative example with a subset of fields.

```text
{
  "id": "job_EXAMPLE",
  "kind": "scrape",
  "status": "completed",
  "result": {
    "provider": "deepsfetch-v1",
    "operation": "scrape",
    "providerJobId": "FETCH_JOB_ID",
    "status": "completed",
    "result": {}
  },
  "error": null,
  "createdAt": "2026-09-08T00:00:00Z"
}
```


## Results by operation

In the V1 adapter, result contains provider, operation, providerJobId, status, statusUrl, result and meta; provider-specific content is inside the nested result. Browser runtime uses a different shape. Do not assume a universal result.markdown property. Outer completion can also represent a provider’s completed_partial: inspect inner status, errors and page counts.

| Field / status | Behavior |
| --- | --- |
| scrape | Check the URL, formats and actual returned content references. |
| extract | Use the fetch providerJobId as source and inspect extracted JSON. |
| map / crawl | Map discovers URLs; crawl collects pages. Check counts and failures. |
| search | Check search results and, when requested, each destination fetch. |
| interact | Check action results and runtime output formats. |
| watch | Creating a monitor does not prove a recurring check occurred. |


## Artifacts and content integration

An r2:// reference or storage key is not a public download URL. Do not construct download links from those keys. Use returned URLs when usable or dashboard exports. For machine-ready content, prefer /integration/n8n/result for the three templates or collection feeds returning data/chunks. The generic API does not promise a universal public artifact-download endpoint.


## Handle errors without duplicating work

400: fix input, schema or provider limit. 401/403: review access. 404: check ID and workspace. 409: idempotency conflict, credit cap or unsupported operation; inspect the code. 429: reduce frequency and honor Retry-After when present. 502/503: inspect the job and provider availability before resubmitting. Preserve job ID and idempotency key after a timeout. Dashboard/n8n/feed adapters may return error as a string; do not blindly apply the V2 envelope.


## Auto engine: inline result example

Illustrative reduced auto-engine shape, separate from the legacy adapter. Read requested formats; billing confirms recorded usage and engine.attempts helps diagnosis.

```text
{
  "id": "job_EXAMPLE",
  "kind": "scrape",
  "status": "completed",
  "result": {
    "operation": "scrape",
    "providerJobId": "fetch_engine_EXAMPLE",
    "url": "https://example.com/",
    "markdown": "# Example Domain",
    "engine": {
      "mode": "basic",
      "attempts": []
    },
    "billing": {
      "credits": 1,
      "currency": "credits"
    }
  },
  "error": null
}
```


## Step by step: decide whether to consume

HTTP 200 alone is not a quality signal.

1. Check terminal status and error; result may be null while queued/running.
2. Identify provider/output shape: inline auto engine, nested legacy adapter or separate runtime.
3. Review final URL, expected pages, inner partial state, fields and warnings. r2:// is not a public link.
4. Validate your consumer schema and preserve secret-free original JSON for diagnosis.
5. Consume only checked content; use Collection feeds for updated documents/chunks.

## Continue your integration

- [Jobs: track, resume and cancel](https://deepsfetch.com/docs/jobs)
- [n8n template HTTP contract](https://deepsfetch.com/docs/n8n-api)
- [Document and change feeds](https://deepsfetch.com/docs/collection-feeds)
- [Credits, estimates, cache and caps](https://deepsfetch.com/docs/costs)
