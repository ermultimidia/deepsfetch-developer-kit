# Feature catalog and limits

Choose an available service and open its walkthrough.

## Documented features

This inventory covers public V2 API, nine MCP tools and user services identified in deployed code during this review. API, dashboard and MCP are different surfaces. The review does not prove success on every target/provider.

| Field / status | Behavior |
| --- | --- |
| scrape | Auto engine and legacy adapter; HTML, Markdown, links and screenshots by path. Guide: /docs/scrape |
| extract | AI over completed fetch; HTTP uses internal ID; MCP resolves public ID. Guide: /docs/extract |
| validated-fields | Dashboard: page data, managed AI and BYOK with evidence. Guide: /docs/validated-extraction |
| search | Web/News/Images/Developer/Research; separate collection. Guide: /docs/search |
| map | URL discovery with filters and maximum 500. Guide: /docs/map |
| crawl | Asynchronous collection of up to 500 planned pages; inspect partials. Guide: /docs/crawl |
| interact | Six action types and up to 20 steps; legacy runtime. Guide: /docs/interact |
| watch | Legacy interval-based creation; no full public CRUD. Guide: /docs/watch |
| price-monitors | Dashboard: price/stock, history, pause/resume and webhook alerts. Guide: /docs/price-monitors |
| collections | Dashboard: schedule, versioned documents, chunks and outbox. Guide: /docs/collections |
| feeds | Authenticated documents/changes API with cursors. Guide: /docs/collection-feeds |
| supabase | Collection destination with SQL and outbox delivery. Guide: /docs/supabase |
| batch-csv | Dashboard: up to 500 URLs, pause, history and JSON/CSV. Guide: /docs/batches |
| parse-local | Local reading of eight file families; separate Mistral OCR. Guide: /docs/files |
| social | X/Reddit through official APIs; Sheets through existing workflow. Guide: /docs/connectors |
| mcp | Registered remote server, nine tools; actual schemas define options. Guide: /docs/mcp |
| n8n | Three validated templates and connection/start/result/estimate contract. Guide: /docs/n8n-api |
| sdk-js | npm-published client, jobs and estimates. Guide: /docs/sdk-javascript |
| sdk-python | Client from developer kit; PyPI publication not confirmed. Guide: /docs/sdk-python |
| cli | npm CLI, JSON input, retrieval/polling and idempotency. Guide: /docs/cli |
| account-keys | Account/workspace/keys, permissions and rotation. Guide: /docs/authentication |
| billing | Catalog, checkout and portal; actual amounts read from the system. Guide: /docs/billing |
| costs | Estimate, policy, usage and reservations by path. Guide: /docs/costs |
| webhooks | Terminal jobs with HMAC; no automatic V2 retry. Guide: /docs/webhooks |
| byok | Seven accepted providers; models/access/external costs depend on account. Guide: /docs/byok |
| playground | Interface, code, results, history and export. Guide: /docs/playground |
| jobs | Retrieval, resume, states and public cancellation. Guide: /docs/jobs |
| support | Code/ID-based triage and secret-free reporting. Guide: /docs/troubleshooting |

- [Scrape: URL to content](https://deepsfetch.com/docs/scrape)
- [Extract: JSON from a completed fetch](https://deepsfetch.com/docs/extract)
- [Validated field extraction](https://deepsfetch.com/docs/validated-extraction)
- [Search: Web, News, Images and categories](https://deepsfetch.com/docs/search)
- [Map: discover URLs](https://deepsfetch.com/docs/map)
- [Crawl: collect multiple pages](https://deepsfetch.com/docs/crawl)
- [Interact: run browser actions](https://deepsfetch.com/docs/interact)
- [Watch: legacy URL monitoring](https://deepsfetch.com/docs/watch)
- [Monitor prices and stock](https://deepsfetch.com/docs/price-monitors)
- [Automatically updated collections](https://deepsfetch.com/docs/collections)
- [Document and change feeds](https://deepsfetch.com/docs/collection-feeds)
- [Send collections to Supabase](https://deepsfetch.com/docs/supabase)
- [Batch collection from CSV](https://deepsfetch.com/docs/batches)
- [Read PDF, DOCX, XLSX and text files](https://deepsfetch.com/docs/files)
- [Social connectors, spreadsheets and destinations](https://deepsfetch.com/docs/connectors)
- [MCP for AI agents](https://deepsfetch.com/docs/mcp)
- [n8n template HTTP contract](https://deepsfetch.com/docs/n8n-api)
- [JavaScript SDK: install, execute and resume](https://deepsfetch.com/docs/sdk-javascript)
- [Python SDK: install and retrieve jobs](https://deepsfetch.com/docs/sdk-python)
- [CLI: commands, files and recovery](https://deepsfetch.com/docs/cli)
- [Account, workspace and keys](https://deepsfetch.com/docs/authentication)
- [Plans, subscription and billing](https://deepsfetch.com/docs/billing)
- [Credits, estimates, cache and caps](https://deepsfetch.com/docs/costs)
- [Webhooks: signing and delivery](https://deepsfetch.com/docs/webhooks)
- [Integrations and your AI key — BYOK](https://deepsfetch.com/docs/byok)
- [Playground, history and export](https://deepsfetch.com/docs/playground)
- [Jobs: track, resume and cancel](https://deepsfetch.com/docs/jobs)
- [Troubleshooting and recovery](https://deepsfetch.com/docs/troubleshooting)


## Features without current equivalence

DeepSFetch has no equivalent autonomous Agent, Alexandria/data marketplace, specialized research/government indexes, CDP/live view/persistent profiles, V2 file parsing API, full public monitor CRUD, recurring goal-based AI search, native email/Slack monitor alerts, scrape branding/product/audio/video formats, generalized PII redaction or SaaS self-hosting documentation. The open kit is an API client. Do not label these supported because Firecrawl provides them.


## How to maintain coverage

Every public endpoint should link to a guide and every guide should include preparation, procedure, output, limits and recovery. Accepted fields without effect are marked in Common options. New functionality requires inventory, schema and guide updates before promotion.

- [Common options and actual compatibility](https://deepsfetch.com/docs/common-options)
- [/openapi.json](https://deepsfetch.com/openapi.json)
- [Start here: account → key → first result](https://deepsfetch.com/docs/getting-started)

## Continue your integration

- [Start here: account → key → first result](https://deepsfetch.com/docs/getting-started)
- [Troubleshooting and recovery](https://deepsfetch.com/docs/troubleshooting)
