# Extract: JSON from a completed fetch

Extract fields with AI from previously collected content. Dashboard evidence validation is a separate service.

## 1. Prepare

Complete scrape and obtain result.providerJobId from the adapter or auto engine. This internal fetch_ ID must belong to the same workspace. Configure managed AI or BYOK.

- [Start here: account → key → first result](https://deepsfetch.com/docs/getting-started)
- [Account, workspace and keys](https://deepsfetch.com/docs/authentication)


## 2. Execute step by step

Follow the sequence and check each step’s outcome.

1. Confirm scrape completed; save the returned internal ID. Do not send the public job_ id directly to HTTP extract.
2. Define a schema with types and required fields. Replace FETCH_JOB_ID_FROM_SCRAPE_RESULT in the example.
3. Submit /v2/extract with aiMode and a new idempotency key. Save the new extraction id and poll its state.
4. Validate final JSON against the schema. Check missing values before exporting. Use dashboard Structured extraction for per-field evidence.


## 3. Submit the request

Bash/macOS/Linux. For PowerShell, use the getting-started curl.exe and JSON-file example. Change the run identifier before starting new work.

```text
curl --fail-with-body "https://api.deepsfetch.com/v2/extract" \
  -H "Authorization: Bearer $DEEPSFETCH_API_KEY" \
  -H "Content-Type: application/json" \
  -H "Idempotency-Key: REPLACE_WITH_UNIQUE_RUN_ID" \
  --data '{
  "source": {
    "type": "fetch_job",
    "jobId": "FETCH_JOB_ID_FROM_SCRAPE_RESULT"
  },
  "schema": {
    "type": "object",
    "properties": {
      "title": {
        "type": "string"
      }
    },
    "required": [
      "title"
    ]
  },
  "aiMode": "managed",
  "plannedLane": "http_basic",
  "async": true
}'
```


## Fields and nested options

Child fields are required only when their parent object is present. Legacy fields and incompatibilities are marked; schema acceptance does not imply implementation on every path.

| Field / status | Behavior |
| --- | --- |
| async | Optional; boolean. default=false Requests asynchronous execution. Save id before retrieving results. |
| webhook | Optional; union.  Terminal notification; secret and signature in /docs/webhooks. |
| webhook.url | Required; string.  Public URL; network policy rejects internal targets and embedded credentials. |
| webhook.secret | Required; string. minLength=16 See this service’s example and limits. |
| webhook.metadata | Optional; object.  Legacy: not included in delivered events. |
| geo | Optional; object.  Legacy; no effect on the current HTML adapter/runtime. |
| geo.country | Optional; string.  See this service’s example and limits. |
| geo.region | Optional; string.  See this service’s example and limits. |
| geo.city | Optional; string.  See this service’s example and limits. |
| geo.language | Optional; string.  See this service’s example and limits. |
| session | Optional; object.  Legacy: does not create a persistent browser session. |
| session.id | Required; string.  See this service’s example and limits. |
| session.ttlSeconds | Optional; integer. minimum=60; maximum=86400 See this service’s example and limits. |
| device | Optional; enum. values: desktop, mobile, tablet Legacy; device customization is not implemented. |
| render | Optional; union.  Selects browser on legacy scrape. With auto engine use engineStrategy; nested options do not configure runtime. |
| render[2].waitMs | Optional; integer.  See this service’s example and limits. |
| render[2].waitFor | Optional; string.  See this service’s example and limits. |
| render[2].timeoutMs | Optional; integer.  Legacy runtime option; rejected by auto engine. Separate from HTTP client timeout. |
| costControl | Optional; object.  Additional cap; check path compatibility in /docs/costs. |
| costControl.maxCredits | Optional; integer. minimum=0; maximum=1000000000 DeepSFetch credit cap, separate from external BYOK costs. |
| costControl.cacheMode | Optional; enum. values: fresh, prefer fresh collects again; prefer allows eligible reuse. Auto engine uses fresh. |
| costControl.maxAgeSeconds | Optional; integer. minimum=0; maximum=86400 Desired maximum age; subject to cache eligibility. |
| costControl.allowFallback | Optional; boolean.  false prevents cost escalation on supported paths. |
| costControl.taskId | Optional; string. minLength=1; maxLength=160; pattern="^[a-zA-Z0-9:_-]+$" Groups workspace budget; use a new ID per logical run. This is not an idempotency key. |
| source | Required; object.  Extract source: a completed workspace fetch. |
| source.type | Required; const. value: fetch_job See this service’s example and limits. |
| source.jobId | Required; string. minLength=1 HTTP extract uses internal fetch_; MCP 2.0.1 automatically resolves public job_ IDs. |
| schema | Optional; object.  Desired JSON schema. Validate returned JSON before using it. |
| plannedLane | Optional; enum. values: http_basic, cf_browser, unlocker_http, managed_browser; default="http_basic" Legacy lane: http_basic, cf_browser, unlocker_http or managed_browser. |
| aiMode | Optional; enum. values: managed, byok; default="managed" managed uses platform AI; byok requires an active connection and external billing. |


## 4. Retrieve and interpret

Response uses the job envelope. Adapter-specific content is nested inside result; validation.fields is not guaranteed. HTTP uses fetch_; MCP 2.0.1 accepts public job_ and resolves its source.

```text
curl --fail-with-body "https://api.deepsfetch.com/v2/jobs/JOB_ID" \
  -H "Authorization: Bearer $DEEPSFETCH_API_KEY"
```

- [Jobs: track, resume and cancel](https://deepsfetch.com/docs/jobs)
- [API responses, artifacts and errors](https://deepsfetch.com/docs/api-results)


## Limits and cost

Collection and AI are separate steps. BYOK requires an active connection; external costs are outside DeepSFetch caps. Matching a schema does not guarantee factual truth.

- [Credits, estimates, cache and caps](https://deepsfetch.com/docs/costs)


## Failures and recovery

Missing/incomplete source: check workspace, internal ID and completion. byok_not_configured: configure the connection. provider_unavailable: check provider. Invalid JSON: preserve job, schema and error; do not invent missing values.

## Continue your integration

- [Common options and actual compatibility](https://deepsfetch.com/docs/common-options)
- [Webhooks: signing and delivery](https://deepsfetch.com/docs/webhooks)
- [Playground, history and export](https://deepsfetch.com/docs/playground)
