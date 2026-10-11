# Social connectors, spreadsheets and destinations

Configure integrations the product actually provides.

## X and Reddit: retrieve one post

Open Documents and connectors, choose X or Reddit, enter post ID and official API Bearer token, then retrieve. X uses numeric IDs; Reddit accepts base36 IDs with or without t3_. Inspect data/errors; network permissions can limit results. This is not unrestricted search, a full feed or private-account access.

1. Open Documents and connectors in your workspace and choose X or Reddit.
2. Obtain an authorized official network API token. A DeepSFetch key does not replace this token.
3. Copy post ID, enter ID/token and click Retrieve post once.
4. Inspect provider and data/errors. Review permissions on access denial; wait before retrying 429.
5. Use Download result when available and remove tokens before sharing. Retrieval does not automatically follow new posts.

- [/app/data-tools](https://deepsfetch.com/app/data-tools)


## External costs, limits and errors

The connector charges no DeepSFetch credits; networks enforce access, quotas and possible fees. Shared OCR/social limit: six calls per minute per workspace. Tokens are not stored. provider_access_denied requires token/permission review; provider_rate_limited requires lower frequency. Instagram is unavailable.


## Google Sheets through the available workflow

Download the Google Sheets template in connectors, import into n8n, configure DeepSFetch/Google credentials and select spreadsheet/tab. Review column mapping and leave inactive until the destination is checked. This is a workflow, not native automatic account synchronization. The existing n8n case remains documented; recreating it is unnecessary.

- [/downloads/deepsfetch-sheets.json](https://deepsfetch.com/downloads/deepsfetch-sheets.json)
- [/docs/n8n](https://deepsfetch.com/docs/n8n)
- [n8n template HTTP contract](https://deepsfetch.com/docs/n8n-api)


## Supabase for Collections

Prepare SQL tables, configure the Collection destination and track the outbox. Keep service keys in a secure destination. For other databases, consume authenticated feeds and persist cursors; an external API does not imply a native connector.

- [Send collections to Supabase](https://deepsfetch.com/docs/supabase)
- [Document and change feeds](https://deepsfetch.com/docs/collection-feeds)

## Continue your integration

- [Read PDF, DOCX, XLSX and text files](https://deepsfetch.com/docs/files)
- [Integrations and your AI key — BYOK](https://deepsfetch.com/docs/byok)
- [JavaScript SDK: install, execute and resume](https://deepsfetch.com/docs/sdk-javascript)
- [Python SDK: install and retrieve jobs](https://deepsfetch.com/docs/sdk-python)
