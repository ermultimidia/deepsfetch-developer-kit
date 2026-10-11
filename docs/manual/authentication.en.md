# Account, workspace and keys

Prepare access and keep your automations connected to the correct workspace.

## Prepare access

Sign in, complete onboarding and check the selected workspace. Open API Keys to create an active same-workspace key. Machine calls use Bearer; a dashboard session does not replace an external key.

```text
curl https://api.deepsfetch.com/v2/jobs/JOB_ID \
  -H "Authorization: Bearer $DEEPSFETCH_API_KEY"
```

- [/app/settings](https://deepsfetch.com/app/settings)
- [/app/integrations](https://deepsfetch.com/app/integrations)


## Permissions

Changing collections, cost policy and the AI connection requires the workspace owner or a system administrator. A different workspace key does not grant access to your jobs. Dashboard /api routes depend on a session and, for mutations, origin checks; they are not a substitute for the public API in scripts.


## Create, replace and revoke

Copy the key when creating it and store it in your secret manager or n8n credential. To rotate: create a new key, update consumers, test a query, then revoke the old key. Also update the key saved in collection settings. Revocation prevents future authenticated calls with that key; it does not confirm cancellation of already submitted jobs.


## When access fails

401: check Bearer, an active key, and active user/workspace. 403: check ownership and permissions. A job 404 requires checking the identifier and workspace; do not assume another user can query that ID. Keep keys out of URLs, exported workflow JSON and support reports.


## Step by step: verify and rotate

Perform the change on a small integration before updating all consumers.

1. Create a key in API Keys in the correct workspace and copy it when shown.
2. Configure DEEPSFETCH_API_KEY or client credentials. Use Bearer for MCP and credentials in n8n.
3. Verify connectivity without collection using GET https://deepsfetch.com/integration/n8n/connection. Check connected=true and expected workspaceId.
4. For rotation create the new key, update scripts/MCP/collections/monitors and verify each consumer.
5. Revoke the old key after migration; retain name/ID/prefix for diagnosis without exposing the complete key.

```text
curl --fail-with-body "https://deepsfetch.com/integration/n8n/connection" -H "Authorization: Bearer $DEEPSFETCH_API_KEY"
```

## Continue your integration

- [Jobs: track, resume and cancel](https://deepsfetch.com/docs/jobs)
- [n8n template HTTP contract](https://deepsfetch.com/docs/n8n-api)
- [Plans, subscription and billing](https://deepsfetch.com/docs/billing)
