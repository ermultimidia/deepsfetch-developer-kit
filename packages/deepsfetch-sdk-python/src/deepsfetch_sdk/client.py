"""Small, dependency-free synchronous client for DeepSFetch API v2."""

from __future__ import annotations

import json
import time
from typing import Any, Callable
from urllib.error import HTTPError, URLError
from urllib.parse import quote
from urllib.request import Request, urlopen


DEFAULT_BASE_URL = "https://api.deepsfetch.com"
TERMINAL_STATUSES = {"completed", "failed", "cancelled"}


class DeepSFetchError(Exception):
    """HTTP or transport error returned by DeepSFetch."""

    def __init__(self, message: str, *, status: int = 0, code: str = "request_failed", details: Any = None, request_id: str | None = None):
        super().__init__(message)
        self.status = status
        self.code = code
        self.details = details
        self.request_id = request_id


class DeepSFetchClient:
    """Client for the DeepSFetch API v2, using only Python's standard library."""

    def __init__(self, api_key: str, *, base_url: str = DEFAULT_BASE_URL, timeout: float = 30.0, opener: Callable[..., Any] | None = None):
        if not isinstance(api_key, str) or not api_key.strip():
            raise ValueError("api_key is required")
        if timeout <= 0:
            raise ValueError("timeout must be positive")
        self._api_key = api_key.strip()
        self.base_url = base_url.rstrip("/")
        self.timeout = timeout
        self._opener = opener or urlopen

    def request(self, path: str, *, method: str = "GET", body: dict[str, Any] | None = None, idempotency_key: str | None = None) -> Any:
        url = self.base_url + "/" + path.lstrip("/")
        headers = {"Authorization": f"Bearer {self._api_key}", "Accept": "application/json"}
        data = None
        if body is not None:
            headers["Content-Type"] = "application/json"
            data = json.dumps(body, separators=(",", ":")).encode("utf-8")
        if idempotency_key:
            headers["Idempotency-Key"] = idempotency_key
        request = Request(url, data=data, headers=headers, method=method)
        try:
            with self._opener(request, timeout=self.timeout) as response:
                raw = response.read()
                status = getattr(response, "status", 200)
                response_headers = response.headers
        except HTTPError as error:
            raw = error.read()
            response_headers = error.headers
            status = error.code
        except (URLError, TimeoutError, OSError) as error:
            raise DeepSFetchError("Could not reach DeepSFetch", code="network_error") from error

        text = raw.decode("utf-8", errors="replace")
        try:
            payload = json.loads(text) if text else None
        except json.JSONDecodeError:
            payload = text
        if status < 200 or status >= 300:
            error = payload.get("error") if isinstance(payload, dict) else None
            nested = error if isinstance(error, dict) else {}
            code = nested.get("code") or (error if isinstance(error, str) else None) or "request_failed"
            message = nested.get("message") or (payload.get("message") if isinstance(payload, dict) else None) or (payload if isinstance(payload, str) else None) or f"DeepSFetch returned HTTP {status}"
            request_id = response_headers.get("x-request-id") or response_headers.get("cf-ray")
            raise DeepSFetchError(str(message), status=status, code=str(code), details=payload.get("details") if isinstance(payload, dict) else None, request_id=request_id)
        return payload

    def scrape(self, body: dict[str, Any], *, idempotency_key: str | None = None) -> Any:
        return self.request("/v2/scrape", method="POST", body=body, idempotency_key=idempotency_key)

    def extract(self, body: dict[str, Any], *, idempotency_key: str | None = None) -> Any:
        return self.request("/v2/extract", method="POST", body=body, idempotency_key=idempotency_key)

    def search(self, body: dict[str, Any], *, idempotency_key: str | None = None) -> Any:
        return self.request("/v2/search", method="POST", body=body, idempotency_key=idempotency_key)

    def map(self, body: dict[str, Any], *, idempotency_key: str | None = None) -> Any:
        return self.request("/v2/map", method="POST", body=body, idempotency_key=idempotency_key)

    def crawl(self, body: dict[str, Any], *, idempotency_key: str | None = None) -> Any:
        return self.request("/v2/crawl", method="POST", body=body, idempotency_key=idempotency_key)

    def interact(self, body: dict[str, Any], *, idempotency_key: str | None = None) -> Any:
        return self.request("/v2/interact", method="POST", body=body, idempotency_key=idempotency_key)

    def watch(self, body: dict[str, Any], *, idempotency_key: str | None = None) -> Any:
        return self.request("/v2/watch", method="POST", body=body, idempotency_key=idempotency_key)

    def estimate_cost(self, body: dict[str, Any]) -> Any:
        return self.request("/v2/cost/estimate", method="POST", body=body)

    def get_job(self, job_id: str) -> Any:
        return self.request(f"/v2/jobs/{quote(job_id, safe='')}")

    def cancel_job(self, job_id: str) -> Any:
        return self.request(f"/v2/jobs/{quote(job_id, safe='')}/cancel", method="POST", body={})

    def wait_for_job(self, job_id: str, *, interval: float = 2.0, max_wait: float = 900.0) -> Any:
        if interval <= 0 or max_wait <= 0:
            raise ValueError("interval and max_wait must be positive")
        deadline = time.monotonic() + max_wait
        while True:
            job = self.get_job(job_id)
            if job.get("status") in TERMINAL_STATUSES:
                return job
            remaining = deadline - time.monotonic()
            if remaining <= 0:
                raise DeepSFetchError(f"Job {job_id} did not finish within {max_wait:g}s", status=408, code="job_wait_timeout")
            time.sleep(min(interval, remaining))
