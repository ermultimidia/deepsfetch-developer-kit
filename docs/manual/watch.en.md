# Watch: legacy URL monitoring

Register monitoring at minute intervals. For prices or documents, choose the dashboard’s dedicated workflows.

## 1. Prepare

Decide what to monitor: text/HTML through watch, prices/stock in the dashboard or versioned documents in Collections. These are different services.

- [Start here: account → key → first result](https://deepsfetch.com/docs/getting-started)
- [Account, workspace and keys](https://deepsfetch.com/docs/authentication)


## 2. Execute step by step

Follow the sequence and check each step’s outcome.

1. Set url and schedule, such as 60m. For a single digit use 1min. Do not use cron.
2. Submit with async=true and save the creation job id. Poll completion and inspect returned monitor data.
3. Check actual monitor runs in the available workflow. Creation job completed does not confirm a recurring comparison has finished.
4. Use Web monitors to pause/resume and inspect product alerts. Use Collections for content feeds/versioning. Cancelling a creation job is not a monitor deletion API.


## 3. Submit the request

Bash/macOS/Linux. For PowerShell, use the getting-started curl.exe and JSON-file example. Change the run identifier before starting new work.

```text
curl --fail-with-body "https://api.deepsfetch.com/v2/watch" \
  -H "Authorization: Bearer $DEEPSFETCH_API_KEY" \
  -H "Content-Type: application/json" \
  -H "Idempotency-Key: REPLACE_WITH_UNIQUE_RUN_ID" \
  --data '{
  "url": "https://example.com",
  "schedule": "60m",
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
| url | Required; string.  Public URL; network policy rejects internal targets and embedded credentials. |
| schedule | Required; string. minLength=3; maxLength=128 Minute interval, not cron. Examples: 15m, 1min, 60m. |
| changeThreshold | Optional; number. minimum=0; maximum=1 Legacy accepted field ignored by the current adapter. |


## 4. Retrieve and interpret

Output represents provider monitor creation. Public V2 does not expose full monitor CRUD or a universal public checks listing.

```text
curl --fail-with-body "https://api.deepsfetch.com/v2/jobs/JOB_ID" \
  -H "Authorization: Bearer $DEEPSFETCH_API_KEY"
```

- [Jobs: track, resume and cancel](https://deepsfetch.com/docs/jobs)
- [API responses, artifacts and errors](https://deepsfetch.com/docs/api-results)


## Limits and cost

Interval 1–525,600 minutes. changeThreshold is accepted and ignored; text/HTML use a fixed policy. V2 creation request costControl is unsupported; recurring costs are separate.

- [Credits, estimates, cache and caps](https://deepsfetch.com/docs/costs)


## Failures and recovery

Invalid schedule: use interval examples, not cron. Provider unavailable: check configuration. Prefer price monitors or Collections for dashboard recurrence and cost controls.


## Verified interval syntax

Use 60m, 15m or 1min. Current implementation does not accept whitespace between the number and suffix; a legacy error message may show a spaced example. Documentation uses parser-accepted examples instead of that old message.

## Continue your integration

- [Common options and actual compatibility](https://deepsfetch.com/docs/common-options)
- [Webhooks: signing and delivery](https://deepsfetch.com/docs/webhooks)
- [Playground, history and export](https://deepsfetch.com/docs/playground)
