# Playground, history and export

Use the interface to configure, track and reproduce collection.

## 1. Choose a tool

Sign into a workspace and open Playground. Choose Search, Scrape, Map or Crawl. Interaction, files, extraction and monitoring have their own views. Playground uses your session and an internal credential; external scripts need an API Key.

- [/app/playground](https://deepsfetch.com/app/playground)


## 2. Configure and check cost

Enter URL/query, format and options. Scrape Automatic uses the one-credit engine; direct HTML/browser change its strategy. Cache is disabled for this engine. Select search sources; adjust map/crawl scope and limit before running. Review estimate and cap.


## 3. Track and resume

Start once. If the view stops waiting, open View result from recent runs. Filter by URL, query or status. Closing a tab does not confirm job cancellation. Recent runs are limited and are not the complete usage history.


## 4. Inspect and export

Inspect content and status, then use copy/download options available for the returned format. JSON preserves the envelope; Markdown is for text; CSV is for tabular data. Exports can contain partial results; review fields/errors before feeding another system.


## 5. Reproduce outside the dashboard

Use Get code to obtain the matching request. Store your key in the environment, replace examples and use idempotency. Generated code is a recipe: inspect actual output and parameter compatibility. dashboard_key_revoked requires reviewing API Keys/Playground access.

- [CLI: commands, files and recovery](https://deepsfetch.com/docs/cli)
- [JavaScript SDK: install, execute and resume](https://deepsfetch.com/docs/sdk-javascript)

## Continue your integration

- [Jobs: track, resume and cancel](https://deepsfetch.com/docs/jobs)
- [API responses, artifacts and errors](https://deepsfetch.com/docs/api-results)
- [Credits, estimates, cache and caps](https://deepsfetch.com/docs/costs)
