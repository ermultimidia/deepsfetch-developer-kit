# Interact: run browser actions

Execute a bounded action sequence on a URL.

## 1. Prepare

Choose a test page and stable selectors. Legacy runtime must be available and does not support costControl caps.

- [Start here: account → key → first result](https://deepsfetch.com/docs/getting-started)
- [Account, workspace and keys](https://deepsfetch.com/docs/authentication)


## 2. Execute step by step

Follow the sequence and check each step’s outcome.

1. Define actions in order. Start with wait, scroll and screenshot without data-changing actions.
2. Use selector to wait for an element or milliseconds for a fixed delay; type needs selector and text; press needs key.
3. Set top-level timeoutMs and formats. Submit once and track the returned id.
4. Inspect produced content and screenshot. If an action fails, review the selector and actual page state; do not automatically repeat purchases or forms.


## 3. Submit the request

Bash/macOS/Linux. For PowerShell, use the getting-started curl.exe and JSON-file example. Change the run identifier before starting new work.

```text
curl --fail-with-body "https://api.deepsfetch.com/v2/interact" \
  -H "Authorization: Bearer $DEEPSFETCH_API_KEY" \
  -H "Content-Type: application/json" \
  -H "Idempotency-Key: REPLACE_WITH_UNIQUE_RUN_ID" \
  --data '{
  "url": "https://example.com",
  "actions": [
    {
      "type": "wait",
      "selector": "h1"
    },
    {
      "type": "scroll",
      "y": 300
    },
    {
      "type": "screenshot",
      "fullPage": false
    }
  ],
  "formats": [
    "markdown"
  ],
  "timeoutMs": 30000,
  "waitUntil": "domcontentloaded",
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
| actions | Required; array. minItems=1; maxItems=20 Sequence of 1–20 actions; variants below. |
| actions[].click.type | Required; const. value: click See this service’s example and limits. |
| actions[].click.selector | Required; string. minLength=1; maxLength=500 See this service’s example and limits. |
| actions[].type.type | Required; const. value: type See this service’s example and limits. |
| actions[].type.selector | Required; string. minLength=1; maxLength=500 See this service’s example and limits. |
| actions[].type.text | Required; string. maxLength=10000 See this service’s example and limits. |
| actions[].type.clear | Optional; boolean. default=false See this service’s example and limits. |
| actions[].wait.type | Required; const. value: wait See this service’s example and limits. |
| actions[].wait.selector | Optional; string. minLength=1; maxLength=500 See this service’s example and limits. |
| actions[].wait.milliseconds | Optional; integer. minimum=0; maximum=10000 See this service’s example and limits. |
| actions[].scroll.type | Required; const. value: scroll See this service’s example and limits. |
| actions[].scroll.selector | Optional; string. minLength=1; maxLength=500 See this service’s example and limits. |
| actions[].scroll.x | Optional; integer. minimum=-100000; maximum=100000; default=0 See this service’s example and limits. |
| actions[].scroll.y | Required; integer. minimum=-100000; maximum=100000 See this service’s example and limits. |
| actions[].press.type | Required; const. value: press See this service’s example and limits. |
| actions[].press.selector | Optional; string. minLength=1; maxLength=500 See this service’s example and limits. |
| actions[].press.key | Required; string. minLength=1; maxLength=40 See this service’s example and limits. |
| actions[].screenshot.type | Required; const. value: screenshot See this service’s example and limits. |
| actions[].screenshot.fullPage | Optional; boolean. default=false Path-specific screenshot setting; auto engine rejects fullPage=true. |
| actions[].screenshot.redactSelectors | Optional; array. maxItems=20 See this service’s example and limits. |
| formats | Optional; array. minItems=1; maxItems=4; items=html, markdown, links, screenshot Auto engine: html, markdown, links, screenshot. Legacy HTML: html/markdown. json does not produce structured JSON. |
| timeoutMs | Optional; integer. minimum=1000; maximum=60000; default=30000 Legacy runtime option; rejected by auto engine. Separate from HTTP client timeout. |
| waitUntil | Optional; enum. values: domcontentloaded, load, networkidle0, networkidle2; default="domcontentloaded" Legacy runtime navigation condition; rejected by auto engine. |
| fullPage | Optional; boolean. default=true Path-specific screenshot setting; auto engine rejects fullPage=true. |
| redactSelectors | Optional; array. maxItems=20 See this service’s example and limits. |


## 4. Retrieve and interpret

Output follows the browser runtime and differs from the HTML adapter. This service does not offer persistent CDP sessions, live view, arbitrary Playwright/Python execution or prompt-based interaction.

```text
curl --fail-with-body "https://api.deepsfetch.com/v2/jobs/JOB_ID" \
  -H "Authorization: Bearer $DEEPSFETCH_API_KEY"
```

- [Jobs: track, resume and cancel](https://deepsfetch.com/docs/jobs)
- [API responses, artifacts and errors](https://deepsfetch.com/docs/api-results)


## Limits and cost

1–20 actions. Selector up to 500 characters; type.text up to 10,000; wait up to 10,000 ms; scroll x/y from -100,000 to 100,000; press.key up to 40 characters; screenshot up to 20 redaction selectors. Timeout 1,000–60,000 ms.

- [Credits, estimates, cache and caps](https://deepsfetch.com/docs/costs)


## Failures and recovery

400: check action variant, type and fields. Timeout/missing element: test selector and navigation condition. cost_operation_unsupported: this runtime does not implement caps; do not silently remove a required policy.

## Continue your integration

- [Common options and actual compatibility](https://deepsfetch.com/docs/common-options)
- [Webhooks: signing and delivery](https://deepsfetch.com/docs/webhooks)
- [Playground, history and export](https://deepsfetch.com/docs/playground)
