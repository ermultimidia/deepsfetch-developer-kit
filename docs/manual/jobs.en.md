# Jobs: track, resume and cancel

Save the public ID and distinguish acceptance, completion and quality.

## 1. Save the submission

Store id, kind, time, request body and Idempotency-Key. job_ IDs are public V2 jobs; fetch_ IDs are internal collection sources; Collection/monitor UUIDs are separate resources.


## 2. Poll without resubmitting

Use GET /v2/jobs/{jobId} with the same key/workspace. Wait around two seconds between polls, back off on 429 and apply a local deadline. A local timeout leaves the job queryable.

```text
curl --fail-with-body "https://api.deepsfetch.com/v2/jobs/JOB_ID" \
  -H "Authorization: Bearer $DEEPSFETCH_API_KEY"
```


## 3. Interpret states

Stop active polling at a terminal state and validate content separately.

| Field / status | Behavior |
| --- | --- |
| queued | Accepted and awaiting execution. |
| running | Executing; result may be absent. |
| completed | Flow finished; inspect inner partial state and data. |
| failed | Terminal failure; record code/message and retain id. |
| cancelled | Public state cancelled; does not prove provider interruption. |


## 4. Resume after interruption

After power loss retrieve the same id through History, CLI job --wait or SDK. If submission response was lost, reuse the same idempotency/body. Retrieval should not create another collection.


## 5. Cancel an eligible job

POST /v2/jobs/{jobId}/cancel changes public queued/running state. Inspect response and retrieve again. This is not a recurring-monitor deletion, universal provider interrupt or refund endpoint. Started work and prior charges can remain.

```text
curl --fail-with-body -X POST "https://api.deepsfetch.com/v2/jobs/JOB_ID/cancel" -H "Authorization: Bearer $DEEPSFETCH_API_KEY"
```


## Common failures

404: wrong ID/workspace/host. 409 on submission: changed body with the same idempotency or a cap. 429: reduce polling. 502/503: check the existing job before recreating. Never replace an error with invented results.

## Continue your integration

- [API responses, artifacts and errors](https://deepsfetch.com/docs/api-results)
- [Troubleshooting and recovery](https://deepsfetch.com/docs/troubleshooting)
- [Webhooks: signing and delivery](https://deepsfetch.com/docs/webhooks)
