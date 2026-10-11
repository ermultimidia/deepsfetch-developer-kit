[Português](n8n.md) | [English](n8n.en.md)

# Build a workflow with n8n

Start with the [guided setup and template documentation](https://deepsfetch.com/docs/n8n?lang=en).

The published npm package is `n8n-nodes-deepsfetch`. It is a community node for self-hosted n8n and is not verified by n8n. On n8n Cloud, use the documented templates built from standard nodes.

## Recommended first example: price monitoring

1. Open https://deepsfetch.com/app/start?lang=en.
2. Choose a public product page, preview it, and check the extracted fields. Preview consumes credits.
3. Download the configured workflow and import it into your own n8n instance.
4. Create the API credential described in the setup guide. Keep the key in credentials, not workflow parameters or an exported JSON file.
5. Test the collection and connect your own alert destination.
6. Review frequency and timezone before activating the workflow.

The first successful automatic price run establishes the baseline. Manual tests do not persist comparison history. The example compares price within the same currency; no alert is sent until you connect a delivery node.

## Included node source

`packages/n8n-nodes-deepsfetch/dist` contains the JavaScript implementation distributed in the npm package, including credential definitions and an icon. The node supports starting a collection, getting a result, and estimating credits. Waiting is handled by n8n's Wait node.

The HTML-only workflow handles one URL per execution. Catalog extraction supports up to 100 products on that page, without automatic pagination. JavaScript-dependent pages are outside this workflow. Missing or ambiguous fields require review. External n8n, email, storage and AI costs are separate from DeepSFetch credits.

A native partnership or verified catalog entry is a later distribution step, not a feature claimed by this toolkit.
