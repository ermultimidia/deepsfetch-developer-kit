# Troubleshooting and recovery

Identify the failed stage before repeating an operation.

## 1. Record the run

Record UTC time, workspace, endpoint/tool, public id, internal ID if present, status and error.code/message/requestId. Remove Authorization, BYOK keys and private data before reporting.


## 2. Recover after interruption

If you have id, retrieve it instead of starting a second collection. If no id arrived but you saved Idempotency-Key, replay the same body/key. Without either, inspect History and usage before submitting another intent. Do not treat local timeout as server terminal failure.


## 3. Fix by code

Specific codes are more useful than HTTP status alone. Input/access errors require correction; limits require budget/frequency review; provider errors require diagnosis.

| Field / status | Behavior |
| --- | --- |
| 400 | Check types, fields, URL and path limits; fix before retrying. |
| 401 / 403 | Check active key/workspace and owner authorization. |
| 404 | Check host, path, ID and workspace; /v2/parse does not exist. |
| 409 | Inspect code: idempotency, cap, balance, premium offer or unsupported operation. |
| 429 | Honor Retry-After when present, back off and reduce concurrency. |
| 502 / 503 | Check existing job, provider availability/configuration and provider error. |
| completed sem dados úteis | Check inner partial state, fields, target selection and artifacts. |


## 4. Report with evidence

Include a minimal secret-free example, expected/actual result and identifiers. Use Help or public kit issues for reproducible questions. Do not publish private content. A report does not automatically imply an SLA.

- [/support](https://deepsfetch.com/support)

## Continue your integration

- [Jobs: track, resume and cancel](https://deepsfetch.com/docs/jobs)
- [API responses, artifacts and errors](https://deepsfetch.com/docs/api-results)
- [Account, workspace and keys](https://deepsfetch.com/docs/authentication)
- [Credits, estimates, cache and caps](https://deepsfetch.com/docs/costs)
