export type JobStatus = "queued" | "running" | "completed" | "failed" | "cancelled";
export interface Job<T = unknown> {
  id: string;
  kind: string;
  status: JobStatus;
  result: T | null;
  error: { code?: string; message?: string } | null;
  createdAt?: string;
  startedAt?: string | null;
  completedAt?: string | null;
}
export interface RequestOptions {
  idempotencyKey?: string;
  signal?: AbortSignal;
  headers?: HeadersInit;
}
export interface ClientOptions {
  apiKey: string;
  baseUrl?: string;
  timeoutMs?: number;
  fetch?: typeof globalThis.fetch;
}
export class DeepSFetchError extends Error {
  status: number;
  code: string;
  details: unknown;
  requestId: string | null;
}
export class DeepSFetchClient {
  constructor(options: ClientOptions);
  request<T = unknown>(path: string, options?: RequestOptions & {method?: string; body?: unknown}): Promise<T>;
  scrape<T = Job>(body: Record<string, unknown>, options?: RequestOptions): Promise<T>;
  extract<T = Job>(body: Record<string, unknown>, options?: RequestOptions): Promise<T>;
  search<T = Job>(body: Record<string, unknown>, options?: RequestOptions): Promise<T>;
  map<T = Job>(body: Record<string, unknown>, options?: RequestOptions): Promise<T>;
  crawl<T = Job>(body: Record<string, unknown>, options?: RequestOptions): Promise<T>;
  interact<T = Job>(body: Record<string, unknown>, options?: RequestOptions): Promise<T>;
  watch<T = Job>(body: Record<string, unknown>, options?: RequestOptions): Promise<T>;
  estimateCost<T = unknown>(body: Record<string, unknown>, options?: RequestOptions): Promise<T>;
  getJob<T = Job>(jobId: string, options?: RequestOptions): Promise<T>;
  cancelJob<T = Job>(jobId: string, options?: RequestOptions): Promise<T>;
  waitForJob<T = Job>(jobId: string, options?: {intervalMs?: number; maxWaitMs?: number; signal?: AbortSignal}): Promise<T>;
}
