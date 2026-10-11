# Document and change feeds

Integrate collections with n8n, databases and agents using persistent cursors.

## Endpoint and authentication

Use the dashboard domain, the collection UUID shown in the dashboard, and Bearer with an active key from the same workspace. Feeds are read-only. Creation, scheduling and destination are managed in the authenticated dashboard. Replace COLLECTION_ID; do not use a job ID.

```text
curl https://deepsfetch.com/collection-feed/COLLECTION_ID/documents \
  -H "Authorization: Bearer $DEEPSFETCH_API_KEY"
```


## Current document snapshot

GET /collection-feed/{collectionId}/documents returns up to 10 active documents and nextCursor. When nextCursor is not null, pass it as after on the next request. This cursor is a document ID, not a timestamp. Listing is not a transactional snapshot: documents can change during pagination.

```text
{
  "documents": [
    {
      "id": "DOCUMENT_ID",
      "collectionId": "COLLECTION_ID",
      "url": "https://example.com/docs",
      "title": "Example",
      "version": 1,
      "deleted": false,
      "markdown": "# Example",
      "chunks": []
    }
  ],
  "nextCursor": null
}
```


## Reliable incremental synchronization

GET /collection-feed/{collectionId}/changes?after=0 returns up to 10 changes, a numeric cursor and hasMore. For an initial sync that includes removals, process changes from 0. Apply each document by (collectionId,id), accepting only newer versions. Persist the cursor only after committing the entire batch; on failure, retry from the previous cursor. Continue while hasMore=true, then poll periodically from the saved cursor.

```text
{
  "changes": [
    {
      "sequence": 42,
      "kind": "removed",
      "document": {
        "id": "DOCUMENT_ID",
        "collectionId": "COLLECTION_ID",
        "version": 3,
        "deleted": true,
        "markdown": null,
        "chunks": []
      }
    }
  ],
  "cursor": 42,
  "hasMore": false
}
```


## Data, deletions and failures

Examples show a subset of fields. Preserve URL, timestamps and hash when present. A tombstone has deleted=true, markdown=null and empty chunks: remove it from the query index or mark it deleted. Do not substitute a document nextCursor for a numeric changes cursor. invalid_cursor requires fixing the type; 401 requires checking the key; 404 requires checking collection and workspace. No retention period is guaranteed here: maintain checkpoints and backups.


## Step by step: initial load and updates

Upsert by document and track version; the two paginations use different cursor types.

1. Copy the Collection UUID and use a same-workspace key on deepsfetch.com.
2. Retrieve documents without after. Store by id and follow nextCursor as URL-encoded after.
3. After initial load query changes?after=0 or your saved cursor. Process changes by sequence.
4. Upsert added/updated and mark/remove removed/deleted documents. Persist cursor only afterwards.
5. Continue immediately when hasMore=true; otherwise wait. After failure resume from last committed cursor and process repeats without duplicating data.

```text
GET /collection-feed/COLLECTION_UUID/documents
GET /collection-feed/COLLECTION_UUID/documents?after=DOCUMENT_ID
GET /collection-feed/COLLECTION_UUID/changes?after=0

// Illustrative response
{
  "changes": [
    {
      "sequence": 1,
      "kind": "added",
      "document": {
        "id": "DOCUMENT_ID",
        "version": 1,
        "deleted": false,
        "markdown": "# Example",
        "chunks": []
      }
    }
  ],
  "cursor": 1,
  "hasMore": false
}
```

## Continue your integration

- [Automatically updated collections](https://deepsfetch.com/docs/collections)
- [Send collections to Supabase](https://deepsfetch.com/docs/supabase)
- [n8n template HTTP contract](https://deepsfetch.com/docs/n8n-api)
