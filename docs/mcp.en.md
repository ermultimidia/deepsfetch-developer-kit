[Português](mcp.md) | [English](mcp.en.md)

# Connect the hosted MCP server

DeepSFetch documents a remote MCP endpoint at `https://mcp.deepsfetch.com/mcp` using Streamable HTTP and a Bearer workspace API key. The server implementation is not included in this client toolkit.

## VS Code configuration

For a client version supporting remote HTTP and headers, save this as `.vscode/mcp.json` in your own project. The password prompt avoids putting the key in the file:

```json
{
  "inputs": [
    {
      "type": "promptString",
      "id": "deepsfetch-api-key",
      "description": "DeepSFetch workspace API key",
      "password": true
    }
  ],
  "servers": {
    "deepsfetch": {
      "type": "http",
      "url": "https://mcp.deepsfetch.com/mcp",
      "headers": {
        "Authorization": "Bearer ${input:deepsfetch-api-key}"
      }
    }
  }
}
```

Other clients use different configuration formats. Do not copy this file unchanged into every client. Consult https://deepsfetch.com/docs/mcp?lang=en and your client's documentation.

## First use

1. Connect and list tools to obtain the live schemas.
2. Request a scrape of a public HTML page with conservative credit limits supported by that schema.
3. If the result is pending, follow its documented job status flow.
4. Inspect the completed result before using it as agent context.

The published documentation lists `scrape`, `extract`, `search`, `map`, `crawl`, `interact`, `watch`, `job_status`, and `cancel_job`. On October 11, 2026 we verified initialize, tools/list and scrape → job_status against the live service. This does not validate every tool or client interface.

## Simpler extraction and polling

MCP 2.0.1 accepts the public `job_` ID of a completed scrape in `source.jobId`. It resolves the source automatically and submits extraction through API V2, returning another job queryable with `job_status`. Legacy internal `fetch_` IDs remain accepted. ID resolution and pending-source rejection passed local service-mock tests; this production run did not execute AI extraction.

The MCP schema now preserves `plannedLane` and `costControl`. For your first scrape:

```json
{"url":"https://example.com","formats":["markdown"],"plannedLane":"http_basic","async":true,"costControl":{"maxCredits":3,"allowFallback":false,"cacheMode":"fresh"}}
```

Inspect each tool's schema: `scrape` and `search` expose `costControl`; `interact` and `watch` do not offer the same control. MCP 2.0.1 `scrape` uses the legacy path and does not accept the HTTP V2 API's `engine` selectors. A result may contain artifact references instead of inline Markdown. Inspect available content and use dashboard exports where needed.

## Smithery: configure your own key

1. Open [DeepSFetch on Smithery](https://smithery.ai/servers/ermultimidia/deepsfetch).
2. Add it to your toolbox and select **Set up**.
3. Enter `Bearer YOUR_API_KEY` in **Deepsfetch Authorization**, including the prefix and space. Use a key from your DeepSFetch workspace.
4. Complete setup and check that the connection is active before invoking tools. **Attention** or **Set up** means authentication is still incomplete.
5. List tools and follow the first-use steps above. Revoke the key in the DeepSFetch dashboard when access ends.

The listing was published with nine tools discovered through its public metadata card. This does not establish execution through Smithery's proxy: the QA connection remained pending and was removed. Direct remote `initialize` → `tools/list` → `scrape` → `job_status` was validated separately. Visitors are not given a shared key.

## Official registry

Published as [io.github.ermultimidia/deepsfetch, version 2.0.1](https://registry.modelcontextprotocol.io/v0.1/servers/io.github.ermultimidia%2Fdeepsfetch/versions/2.0.1). Connection metadata is in [server.json](../server.json). The hosted endpoint requires a workspace API key. Registry presence does not imply a partnership or certification by every client.
