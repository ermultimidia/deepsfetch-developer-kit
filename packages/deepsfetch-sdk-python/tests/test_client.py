import json
import unittest
from unittest.mock import patch

from deepsfetch_sdk import DeepSFetchClient, DeepSFetchError


class Response:
    def __init__(self, payload, status=200, headers=None):
        self._payload = payload
        self.status = status
        self.headers = headers or {}

    def read(self):
        return json.dumps(self._payload).encode()

    def __enter__(self):
        return self

    def __exit__(self, *_args):
        return False


class ClientTests(unittest.TestCase):
    def test_auth_json_and_idempotency_header(self):
        seen = {}

        def open_request(request, timeout):
            seen.update(url=request.full_url, auth=request.get_header("Authorization"), idem=request.get_header("Idempotency-key"), body=json.loads(request.data))
            return Response({"id": "job_1", "status": "queued"}, 202)

        client = DeepSFetchClient("secret", opener=open_request)
        job = client.scrape({"url": "https://example.com/"}, idempotency_key="qa-one")
        self.assertEqual(job["id"], "job_1")
        self.assertEqual(seen["url"], "https://api.deepsfetch.com/v2/scrape")
        self.assertEqual(seen["auth"], "Bearer secret")
        self.assertEqual(seen["idem"], "qa-one")
        self.assertEqual(seen["body"]["url"], "https://example.com/")

    def test_api_errors_keep_code_and_status_without_secret(self):
        def open_request(_request, timeout):
            return Response({"error": "invalid_api_key", "message": "Key is invalid"}, 401)

        client = DeepSFetchClient("never-print-this", opener=open_request)
        with self.assertRaises(DeepSFetchError) as raised:
            client.get_job("job_missing")
        self.assertEqual(raised.exception.status, 401)
        self.assertEqual(raised.exception.code, "invalid_api_key")
        self.assertNotIn("never-print-this", str(raised.exception))

    def test_wait_for_job_polls_to_completion(self):
        states = iter(["running", "completed"])

        def open_request(_request, timeout):
            return Response({"id": "job_1", "status": next(states), "result": {"ok": True}})

        client = DeepSFetchClient("test", opener=open_request)
        with patch("deepsfetch_sdk.client.time.sleep", return_value=None):
            job = client.wait_for_job("job_1", interval=0.001, max_wait=1)
        self.assertEqual(job["status"], "completed")


if __name__ == "__main__":
    unittest.main()
