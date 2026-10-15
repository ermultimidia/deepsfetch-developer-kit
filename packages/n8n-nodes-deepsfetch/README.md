[English](README.md) | [Português](README.pt.md)

# DeepSFetch for n8n

Collect HTML pages, extract validated fields, and automate price checks, documentation updates and catalog collection. Start at https://deepsfetch.com/app/start and import the configured workflow into n8n.

## Installation

For self-hosted n8n, open **Settings → Community Nodes → Install**, enter `n8n-nodes-deepsfetch`, and install. Requires an n8n instance that permits community nodes. This package is not verified by n8n; on n8n Cloud use the standard HTTP Request workflows from guided setup instead.

For manual installation, run `npm install n8n-nodes-deepsfetch` in your n8n community-node directory (typically `~/.n8n/nodes`) and restart n8n. Follow your n8n version's installation documentation. Create a DeepSFetch API credential with an active workspace API key from https://deepsfetch.com/app/api-keys. The key is stored in n8n credentials, never workflow parameters.

Installing the package does not consume DeepSFetch credits. Your workspace API key authenticates requests and identifies the workspace balance. Collection operations use the same credit rates as the API and dashboard. Repeated requests to inspect an existing result do not submit another collection. Provider AI keys are separate BYOK credentials; external AI charges are not included in DeepSFetch credits.

Operations: Start Collection, Get Result, Estimate Credits. Import templates for a complete Start → Wait → Result loop. A stable idempotency key prevents duplicate submission during retries of the same execution. Waiting is delegated to n8n's Wait node. Workflow timeout is 15 minutes; reuse the returned job ID to inspect a slow job before resubmitting.

Each execution handles one URL. Catalogs support up to 100 products on one page, without automatic pagination. JSON-LD Product data or relative CSS selectors are required. Pages requiring JavaScript are outside this HTML-only workflow. Missing/ambiguous fields stop automation for review. Credit caps cover DeepSFetch collection, not external n8n, email or AI charges.

Price comparison and document change detection use workflow static data, which persists only after successful automatic executions, not manual tests. Avoid overlapping executions. Use a durable database in higher-volume workflows. The first automatic price run sets a baseline; a change within the same currency reaches the final output. Connect your own alert node. Documentation delivers source, stable IDs, content hash and chunks; connect your own AI destination. No email, embeddings or chatbot is provisioned automatically.
