# Webhooks: signing and delivery

Receive terminal notifications and retrieve results through the API.

## Configure in the request

Include webhook when creating an asynchronous operation. Use a public HTTPS URL accepted by service policy and a random secret of at least 16 characters. The destination must be reachable; redirects are not followed. Share the secret only with your receiver.

```text
{
  "url": "https://example.com",
  "async": true,
  "formats": [
    "markdown"
  ],
  "webhook": {
    "url": "https://your-domain.example/deepsfetch-events",
    "secret": "REPLACE_WITH_RANDOM_SECRET_32_CHARS"
  }
}
```


## Events and content

The delivery chain publishes job.completed and job.failed. The body contains job identity and status, not collected content: query GET /v2/jobs/{id}. Do not depend on a cancellation event. The metadata field accepted in configuration is not included in the current delivery payload; correlate using jobId. The following JSON is illustrative.

```text
{
  "id": "evt_EXAMPLE",
  "type": "job.completed",
  "created": 1788825600,
  "data": {
    "jobId": "job_EXAMPLE",
    "kind": "scrape",
    "status": "completed"
  }
}
```


## Verify the signature — Node.js

Read x-deepsfetch-timestamp and x-deepsfetch-signature. The signature is v1= followed by the hexadecimal HMAC-SHA256 of timestamp + dot + exact body bytes. Verify before parsing JSON. The example applies a five-minute tolerance as a receiver policy; keep the clock synchronized. After verification, persist the event durably and respond with 2xx.

```text
import { createHmac, timingSafeEqual } from 'node:crypto';

// rawBody: Buffer containing the exact HTTP request bytes, before JSON parsing.
export function verifyWebhook(rawBody, timestamp, signature, secret, now = Date.now()) {
  if (!Buffer.isBuffer(rawBody) || !/^\d+$/.test(timestamp || '') ||
      !/^v1=[a-f0-9]{64}$/.test(signature || '')) return false;
  if (Math.abs(now / 1000 - Number(timestamp)) > 300) return false;
  const expected = createHmac('sha256', secret)
    .update(timestamp + '.').update(rawBody).digest();
  const received = Buffer.from(signature.slice(3), 'hex');
  return timingSafeEqual(expected, received);
}
```


## Failures and recovery

The implementation records delivery failure but provides no automatic retry in this webhook chain. Keep periodic job queries as a recovery path. Deduplicate by event ID and apply state idempotently by jobId. Reject invalid signatures. A lost notification does not mean collection failed. Supabase outbox retries are a separate mechanism.


## Step by step: receiver and recovery

Verify the original body signature and keep job polling as recovery.

1. Prepare a public HTTPS receiver. Store a random secret and read body bytes before JSON parsing.
2. Add webhook.url/webhook.secret to an asynchronous operation. Save jobId/idempotency in your system.
3. Verify timestamp/HMAC with a safe comparison. Reject invalid/expired signatures according to your policy.
4. Durably store event.id/jobId, deduplicate and return 2xx. Retrieve authenticated job content separately.
5. If no event arrives query the saved job; the current V2 chain does not automatically retry. product.changed alerts and Supabase outbox have separate rules.

## Continue your integration

- [Jobs: track, resume and cancel](https://deepsfetch.com/docs/jobs)
- [API responses, artifacts and errors](https://deepsfetch.com/docs/api-results)
- [Send collections to Supabase](https://deepsfetch.com/docs/supabase)
