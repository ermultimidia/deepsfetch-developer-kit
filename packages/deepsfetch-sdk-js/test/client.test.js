import test from "node:test";
import assert from "node:assert/strict";
import {DeepSFetchClient, DeepSFetchError} from "../src/index.js";

test("sends bearer auth, JSON and idempotency key", async () => {
  let seen;
  const client = new DeepSFetchClient({apiKey:"secret", fetch:async (url, init) => {
    seen = {url:String(url), init};
    return Response.json({id:"job_123", status:"queued"}, {status:202});
  }});
  const result = await client.scrape({url:"https://example.com/"}, {idempotencyKey:"qa-one"});
  assert.equal(result.id, "job_123");
  assert.equal(seen.url, "https://api.deepsfetch.com/v2/scrape");
  assert.equal(seen.init.headers.get("authorization"), "Bearer secret");
  assert.equal(seen.init.headers.get("idempotency-key"), "qa-one");
  assert.deepEqual(JSON.parse(seen.init.body), {url:"https://example.com/"});
});

test("maps API errors without leaking the API key", async () => {
  const client = new DeepSFetchClient({apiKey:"never-print-this", fetch:async () => Response.json({error:"invalid_api_key", message:"Key is invalid"}, {status:401})});
  await assert.rejects(client.getJob("job_missing"), error => {
    assert(error instanceof DeepSFetchError);
    assert.equal(error.status, 401);
    assert.equal(error.code, "invalid_api_key");
    assert(!error.message.includes("never-print-this"));
    return true;
  });
});

test("waitForJob polls until a terminal result", async () => {
  let calls = 0;
  const client = new DeepSFetchClient({apiKey:"test", fetch:async () => Response.json({id:"job_1", status:++calls === 1 ? "running" : "completed", result:{ok:true}})});
  const result = await client.waitForJob("job_1", {intervalMs:1, maxWaitMs:100});
  assert.equal(result.status, "completed");
  assert.equal(calls, 2);
});

test("does not retry billable POST requests implicitly", async () => {
  let calls = 0;
  const client = new DeepSFetchClient({apiKey:"test", fetch:async () => { calls++; return Response.json({error:"upstream_error"}, {status:503}); }});
  await assert.rejects(client.scrape({url:"https://example.com/"}));
  assert.equal(calls, 1);
});
