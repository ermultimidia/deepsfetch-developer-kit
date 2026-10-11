import test from 'node:test';
import assert from 'node:assert/strict';
import { run } from '../src/cli.js';

function fixture(response = { id: 'job_1', status: 'queued' }) {
  const state = { calls: [], out: '', err: '' };
  class Client {
    constructor(options) { state.options = options; }
    async scrape(body, options) { state.calls.push({ body, options }); return response; }
    async estimateCost(body, options) { state.calls.push({ body, options }); return { max: 3 }; }
    async getJob(id) { state.calls.push({ id }); return response; }
    async waitForJob(id, options) { state.wait = { id, options }; return { id, status: 'completed' }; }
  }
  state.deps = { Client, env: { DEEPSFETCH_API_KEY: 'test-secret' }, stdout: { write: s => state.out += s }, stderr: { write: s => state.err += s } };
  return state;
}

test('help requires no API key or network', async () => {
  const s = fixture(); s.deps.env = {};
  assert.equal(await run(['--help'], s.deps), 0);
  assert.match(s.out, /DEEPSFETCH_API_KEY/); assert.equal(s.calls.length, 0);
});
test('scrape forwards key, HTTP defaults, idempotency and job polling', async () => {
  const s = fixture();
  assert.equal(await run(['scrape', 'https://example.com', '--wait', '--idempotency-key', 'retry-1'], s.deps), 0);
  assert.equal(s.options.apiKey, 'test-secret'); assert.equal(s.calls.length, 1);
  assert.deepEqual(s.calls[0].body, { url: 'https://example.com', formats: ['markdown'], plannedLane: 'http_basic', async: true });
  assert.equal(s.calls[0].options.idempotencyKey, 'retry-1'); assert.equal(s.wait.id, 'job_1');
  assert.equal(JSON.parse(s.out).status, 'completed'); assert(!s.err.includes('test-secret'));
});
test('reads a JSON file and estimates without submitting a scrape', async () => {
  const s = fixture(); s.deps.read = async path => { assert.equal(path, 'input.json'); return '{"kind":"fetch"}'; };
  assert.equal(await run(['estimate', '--file', 'input.json'], s.deps), 0);
  assert.deepEqual(s.calls[0].body, { kind: 'fetch' }); assert.equal(JSON.parse(s.out).max, 3);
});
test('invalid JSON, missing key and untrusted transport fail before a request', async () => {
  for (const args of [['scrape', '--data', '{'], ['scrape', '--data', '[]'], ['scrape', 'https://example.com', '--base-url', 'http://remote.example'], ['scrape', '--file']]) {
    const s = fixture(); assert.equal(await run(args, s.deps), 1); assert.equal(s.calls.length, 0);
  }
  const s = fixture(); s.deps.env = {}; assert.equal(await run(['job', 'job_1'], s.deps), 1); assert.equal(s.calls.length, 0);
});
test('failed jobs exit nonzero and API errors redact keys', async () => {
  const s = fixture({ id: 'job_1', status: 'failed' });
  assert.equal(await run(['job', 'job_1', '--wait'], s.deps), 1);
  s.deps.Client.prototype.getJob = async () => { throw Object.assign(new Error('failed test-secret'), { status: 401, code: 'invalid_api_key' }); };
  assert.equal(await run(['job', 'job_1'], s.deps), 1); assert(!s.err.includes('test-secret')); assert.match(s.err, /invalid_api_key/);
});
