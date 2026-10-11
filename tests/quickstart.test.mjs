import test from 'node:test';
import assert from 'node:assert/strict';
import { createServer } from 'node:http';
import { spawn } from 'node:child_process';
import { collect } from '../examples/scrape.mjs';

async function api(t, handler) {
  const calls = [];
  const server = createServer(async (req, res) => {
    let text = '';
    for await (const chunk of req) text += chunk;
    const call = { method: req.method, url: req.url, headers: req.headers, body: text ? JSON.parse(text) : null };
    calls.push(call);
    const reply = handler(call, calls);
    res.writeHead(reply.status || 200, { 'content-type': 'application/json' });
    res.end(JSON.stringify(reply.body));
  });
  await new Promise(resolve => server.listen(0, '127.0.0.1', resolve));
  t.after(async () => { server.closeAllConnections(); await new Promise(resolve => server.close(resolve)); });
  return { calls, base: `http://127.0.0.1:${server.address().port}` };
}

test('first-use example submits once with a credit cap and polls the same job', async t => {
  const fixture = await api(t, call => ({ body: call.method === 'POST'
    ? { id: 'job_demo', status: 'queued' }
    : { id: 'job_demo', status: 'completed', result: { markdown: '# Example' } } }));
  const output = [];
  const result = await collect('https://example.com', { ...fixture, key: 'fixture-key', idempotencyKey: 'same-operation', progress: message => output.push(message), pollIntervalMs: 1 });
  assert.equal(result.result.markdown, '# Example');
  assert.equal(fixture.calls.filter(call => call.method === 'POST').length, 1);
  assert.equal(fixture.calls[0].headers['idempotency-key'], 'same-operation');
  assert.equal(fixture.calls[0].headers.authorization, 'Bearer fixture-key');
  assert.deepEqual(fixture.calls[0].body.costControl, { maxCredits: 3, allowFallback: false, cacheMode: 'fresh' });
  assert.equal(fixture.calls[1].url, '/v2/jobs/job_demo');
  assert(output.some(line => line.includes('job_demo')));
  assert(output.every(line => !line.includes('fixture-key')));
});

test('resuming an existing job does not submit another collection', async t => {
  const fixture = await api(t, () => ({ body: { id: 'job_saved', status: 'completed', result: {} } }));
  await collect(undefined, { ...fixture, key: 'fixture-key', jobId: 'job_saved', progress: () => {} });
  assert.deepEqual(fixture.calls.map(call => call.method), ['GET']);
});

test('failed jobs and HTTP errors stop without another billable POST', async t => {
  for (const httpError of [false, true]) {
    const fixture = await api(t, call => httpError
      ? { status: 401, body: { error: 'invalid_api_key', message: 'private fixture-key' } }
      : { body: call.method === 'POST' ? { id: 'job_demo', status: 'queued' } : { id: 'job_demo', status: 'failed' } });
    await assert.rejects(collect('https://example.com', { ...fixture, key: 'fixture-key', progress: () => {}, pollIntervalMs: 1 }), error => {
      assert(!error.message.includes('fixture-key'));
      return /failed|invalid_api_key/.test(error.message);
    });
    assert.equal(fixture.calls.filter(call => call.method === 'POST').length, 1);
  }
});

test('CLI entry point uses the JSON quickstart and polls without duplicates', async t => {
  const fixture = await api(t, call => ({ body: call.method === 'POST'
    ? { id: 'job_cli', status: 'queued' }
    : { id: 'job_cli', status: 'completed', result: { markdown: '# CLI example' } } }));
  const child = spawn(process.execPath, ['packages/deepsfetch-cli/bin/deepsfetch.js', 'scrape', '--file', 'examples/scrape-request.json', '--wait', '--base-url', fixture.base], {
    cwd: new URL('..', import.meta.url), env: { ...process.env, DEEPSFETCH_API_KEY: 'fixture-cli-key' },
  });
  let stdout = '', stderr = '';
  child.stdout.on('data', chunk => stdout += chunk);
  child.stderr.on('data', chunk => stderr += chunk);
  const code = await new Promise((resolve, reject) => { child.on('error', reject); child.on('close', resolve); });
  assert.equal(code, 0, stderr);
  assert.equal(JSON.parse(stdout).status, 'completed');
  assert.equal(fixture.calls.filter(call => call.method === 'POST').length, 1);
  assert.equal(fixture.calls[0].body.costControl.maxCredits, 3);
  assert(!stderr.includes('fixture-cli-key'));
});
