# Start here: account → key → first result

Run a small collection and recognize its completion.

## 1. Create an account and check workspace

Sign up, sign in and complete onboarding. Check selected workspace and balance. Free signup still requires a key for API/MCP.

- [/login?tab=signup](https://deepsfetch.com/login?tab=signup)
- [/app/playground](https://deepsfetch.com/app/playground)


## 2. Create and store a key

Open API Keys, create a key, copy its complete value when shown and store it in an environment variable. It identifies the workspace and differs from account password and BYOK key.

```text
# PowerShell — somente o terminal atual
$env:DEEPSFETCH_API_KEY = "SUA_CHAVE"

# Bash — somente o terminal atual
export DEEPSFETCH_API_KEY="SUA_CHAVE"
```

- [/app/api-keys](https://deepsfetch.com/app/api-keys)


## 3. PowerShell: submit a JSON file

Save this body as UTF-8 request.json. curl.exe avoids the Windows PowerShell curl alias. Change the idempotency key for a new run; preserve body and key for retries.

```text
{
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
}

# PowerShell
curl.exe --fail-with-body "https://api.deepsfetch.com/v2/scrape" `
  -H "Authorization: Bearer $env:DEEPSFETCH_API_KEY" `
  -H "Content-Type: application/json" `
  -H "Idempotency-Key: PRIMEIRA_COLETA_ID_UNICO" `
  --data-binary "@request.json"
```


## 3. Bash: alternative submission

Choose the version matching your terminal; running both creates two collections if their identifiers differ.

```text
curl --fail-with-body "https://api.deepsfetch.com/v2/scrape" \
  -H "Authorization: Bearer $DEEPSFETCH_API_KEY" \
  -H "Content-Type: application/json" \
  -H "Idempotency-Key: REPLACE_WITH_UNIQUE_RUN_ID" \
  --data '{
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
}'
```


## 4. Save id and poll

HTTP 202 means accepted. Replace JOB_ID with the returned public id. Wait around two seconds between polls. Stop on completed, failed or cancelled; do not submit another collection to check progress.

```text
curl.exe --fail-with-body "https://api.deepsfetch.com/v2/jobs/JOB_ID" -H "Authorization: Bearer $env:DEEPSFETCH_API_KEY"
```

- [Jobs: track, resume and cancel](https://deepsfetch.com/docs/jobs)


## 5. Confirm content and usage

With auto engine, inspect status=completed, result.markdown, final URL and result.billing. With legacy adapter, inspect result.result and artifact references. Completion without useful content does not finish validation. Check workspace usage.

- [Scrape: URL to content](https://deepsfetch.com/docs/scrape)
- [API responses, artifacts and errors](https://deepsfetch.com/docs/api-results)
- [Credits, estimates, cache and caps](https://deepsfetch.com/docs/costs)


## 6. Choose the next workflow

Use SDK/CLI for applications, MCP for agents, validated extraction for fields, Collections for recurring documents and Web monitors for prices. Start with one target before scaling.

- [JavaScript SDK: install, execute and resume](https://deepsfetch.com/docs/sdk-javascript)
- [Python SDK: install and retrieve jobs](https://deepsfetch.com/docs/sdk-python)
- [CLI: commands, files and recovery](https://deepsfetch.com/docs/cli)
- [MCP for AI agents](https://deepsfetch.com/docs/mcp)
- [Automatically updated collections](https://deepsfetch.com/docs/collections)
- [Monitor prices and stock](https://deepsfetch.com/docs/price-monitors)

## Continue your integration

- [Account, workspace and keys](https://deepsfetch.com/docs/authentication)
- [Troubleshooting and recovery](https://deepsfetch.com/docs/troubleshooting)
