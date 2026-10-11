import { randomUUID } from 'node:crypto';

const key = process.env.DEEPSFETCH_API_KEY;
if (!key) throw new Error('Set DEEPSFETCH_API_KEY first');

const base = 'https://api.deepsfetch.com';
const headers = {
  Authorization: `Bearer ${key}`,
  'Content-Type': 'application/json',
};

async function read(response) {
  const data = await response.json();
  if (!response.ok) {
    throw new Error(`HTTP ${response.status}: ${data.code ?? 'request failed'}`);
  }
  return data;
}

const requestId = randomUUID();
console.error('Keep this request ID for submission recovery:', requestId);
let job = await read(await fetch(`${base}/v2/scrape`, {
  method: 'POST',
  headers: { ...headers, 'Idempotency-Key': requestId },
  body: JSON.stringify({
    url: 'https://quotes.toscrape.com/',
    formats: ['markdown'],
    collectionEngine: 'auto',
    engineStrategy: 'auto',
    async: true,
    costControl: {
      maxCredits: 1,
      allowFallback: false,
      cacheMode: 'fresh',
    },
  }),
  signal: AbortSignal.timeout(30000),
}));

console.error('Save this job ID:', job.id);
const deadline = Date.now() + 180000;
while (['queued', 'running'].includes(job.status)) {
  if (Date.now() >= deadline) {
    throw new Error(`Local timeout. Retrieve the same job later: ${job.id}`);
  }
  await new Promise(resolve => setTimeout(resolve, 2000));
  job = await read(await fetch(`${base}/v2/jobs/${encodeURIComponent(job.id)}`, {
    headers,
    signal: AbortSignal.timeout(30000),
  }));
}

if (job.status !== 'completed' || typeof job.result?.markdown !== 'string') {
  throw new Error(`Inspect job ${job.id}: ${job.status}`);
}
console.error('Billing:', job.result.billing);
console.log(job.result.markdown);
