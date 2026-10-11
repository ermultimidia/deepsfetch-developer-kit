# Automatically updated collections

Maintain versioned pages and track what changed.

## Create and run

Open Collections as the workspace owner or an administrator. Enter a name, root URL, active workspace key, interval and page limit. Up to 10 collections per workspace and 1–100 pages per run are supported. Choose an interval of 1, 24 or 168 hours. Save and use Run now; inspect the run and documents before connecting a destination.

- [/app/collections](https://deepsfetch.com/app/collections)


## Scope and schedule

Discovery stays within the root URL’s host and path, with link depth limited to 3. Use a specific root such as /docs to avoid irrelevant content. Collection uses HTML without JavaScript. Scheduling uses intervals, not business hours or cron expressions. Processing runs in the background; nextRunAt is a due time, not a completion guarantee.


## Versions and removals

New content generates added; a change generates updated; identical content keeps its version. Absence from discovery does not delete a document. Removal requires two confirmed 404/410 responses at least one hour apart and generates removed with deleted=true. Transient failures preserve previous content. Inspect warning, error and tasks on a partial run; completed does not replace checking expected documents.


## Pause and recover

Pausing prevents scheduled advancement of the collection and its deliveries; requests already sent may continue at the provider. On resuming, inspect a pending run before submitting another. Update the key in settings after rotation. For a limit error, inspect reservations and available budget. Common run states: queued, mapping, collecting, completed, partial and failed.


## Consume content

Use the authenticated feed to read documents and changes, or configure Supabase in the dashboard. Documents include stable identifiers, versions, source, Markdown and chunks. Collections do not automatically create embeddings, a vector database or a chatbot. Fetching and discovery use credits; the page limit bounds planned work, not the number actually found.


## Step by step: an updated document base

Validate a collection before connecting its consumer.

1. Sign in as owner, open Collections and choose a specific root such as https://your-site.example/docs.
2. Enter name, active key, small maximum (for example 5) and 24-hour interval. Configure a compatible cap and review estimate.
3. Save and use Run now when enabled. Inspect the run, tasks, warning/error and actual documents.
4. Open a document and inspect URL, title, Markdown, version and chunks; a chunk is not an embedding.
5. Consume documents feed until nextCursor=null, then follow changes with a persisted cursor; commit cursor only after data is stored.
6. Connect Supabase if needed, verify deliveries and then leave scheduling enabled. Pause for maintenance and update the saved key on rotation.

## Continue your integration

- [Document and change feeds](https://deepsfetch.com/docs/collection-feeds)
- [Send collections to Supabase](https://deepsfetch.com/docs/supabase)
- [Credits, estimates, cache and caps](https://deepsfetch.com/docs/costs)
- [Watch: legacy URL monitoring](https://deepsfetch.com/docs/watch)
