[Português](getting-started.md) | [English](getting-started.en.md)

# Your first collection

1. Create a DeepSFetch account and review the current free plan and limits at https://deepsfetch.com/pricing?lang=en.
2. Create a workspace API key at https://deepsfetch.com/app/api-keys. This is different from an AI provider's BYOK key.
3. Set `DEEPSFETCH_API_KEY` in your terminal as shown in the root README.
4. Run `node examples/scrape.mjs https://example.com` from the repository root. Node.js 22+ is required.
5. Check that the JSON output reports `status: "completed"` and inspect `result`. A queued response alone is not a successful collection.

## What the example does

The request selects `http_basic`, Markdown output, asynchronous execution, `maxCredits: 3`, and `allowFallback: false`. This is a small starting configuration for publicly accessible HTML. It does not run a browser or an AI model. Some pages will fail or contain no useful text with this configuration.

The example prints the operation's idempotency key and job ID to stderr. It does not print the API key or automatically retry a billable POST. It waits up to 15 minutes, and exits with a nonzero status for failure, cancellation, request errors, or timeout.

## Resume instead of paying for a duplicate collection

If you already received a job ID, use it to resume polling:

```powershell
$env:DEEPSFETCH_JOB_ID = 'job_YOUR_JOB_ID'
node examples/scrape.mjs
Remove-Item Env:DEEPSFETCH_JOB_ID
```

```sh
DEEPSFETCH_JOB_ID='job_YOUR_JOB_ID' node examples/scrape.mjs
```

If the POST connection failed before returning a job ID, reuse the printed idempotency key for the same operation:

```powershell
$env:DEEPSFETCH_IDEMPOTENCY_KEY = 'THE_PREVIOUS_KEY'
node examples/scrape.mjs https://example.com
Remove-Item Env:DEEPSFETCH_IDEMPOTENCY_KEY
```

```sh
DEEPSFETCH_IDEMPOTENCY_KEY='THE_PREVIOUS_KEY' node examples/scrape.mjs https://example.com
```

Keep the URL and request unchanged when reusing a key. Clear these environment variables before a deliberately new collection. API idempotency retention limits still apply; see the API documentation.

## Common blockers

| Symptom | Next action |
| --- | --- |
| Missing environment variable | Set a workspace API key in the same terminal session |
| HTTP 401 | Check that the key is active and belongs to the expected workspace |
| Credit cap or balance error | Review the estimate, plan balance and operation limits |
| HTML-only result is incomplete | Check whether the site requires JavaScript before choosing another collection lane |
| Timeout after a job ID | Inspect the same job; do not submit another collection to check its status |

Source content from websites is untrusted input. Inspect it before passing it to an agent. Do not publish keys or raw customer responses in an issue.
