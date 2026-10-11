# Send collections to Supabase

Configure the destination and monitor deliveries with automatic retries.

## Prepare the project

Download the SQL below and run it once in the destination Supabase project SQL Editor. It creates deepsfetch_documents, the deepsfetch_active_documents view and deepsfetch_apply_document function. The script enables RLS and restricts access to service_role. Review it before applying it to your project.

- [/collections-supabase.sql](https://deepsfetch.com/collections-supabase.sql)


## Connect the collection

In Collections, enter the Supabase project HTTPS URL and a server key allowed to access the created table and function. This differs from the DeepSFetch key. The server checks the destination and stores the key encrypted. The destination origin is bound to the collection; destination_locked indicates an attempt to change it. The key for the same destination can be updated.

- [/app/collections](https://deepsfetch.com/app/collections)


## Delivery and retries

An outbox records the version to deliver. Failures remain retrying with attempt count and next attempt time; backoff grows to one hour. The SQL function applies only newer versions, making repeated delivery of the same version harmless. The outbox keeps the latest version per document; it is not a log of every version. Use the changes feed for that history.


## Verify and recover

Read deepsfetch_active_documents to exclude tombstones from results. Compare collection_id, document_id and version with the dashboard. For destination_unavailable or destination_http_401/403, check URL, key and permissions, and confirm that the SQL was applied. Saving the connection again reopens deliveries for an attempt. Pausing the collection also pauses delivery. Markdown and chunks are sent; embeddings and vector-index synchronization belong to your workflow.

```text
select collection_id, document_id, version, url
from public.deepsfetch_active_documents
order by updated_at desc
limit 20;
```


## Step by step: confirm delivery

Creating a connection does not mean all documents have reached the destination.

1. Download Collections SQL and run it in the intended Supabase project. Check deepsfetch_documents/deepsfetch_chunks tables and permissions.
2. Enter https://YOUR_PROJECT.supabase.co and an authorized destination key in the Collection. Do not substitute a DeepSFetch key.
3. Save. Connection tests the documents table; also confirm data/chunks after a run. The Collection is locked to its configured destination origin.
4. Run/wait for the Collection and inspect outbox: pending, delivered or failures with attempts/next_attempt.
5. In Supabase inspect document_id, version, chunks and removals. On failure fix table/key/permissions and track retries; do not delete valid documents to unblock delivery.

- [/collections-supabase.sql](https://deepsfetch.com/collections-supabase.sql)

## Continue your integration

- [Automatically updated collections](https://deepsfetch.com/docs/collections)
- [Document and change feeds](https://deepsfetch.com/docs/collection-feeds)
- [Integrations and your AI key — BYOK](https://deepsfetch.com/docs/byok)
