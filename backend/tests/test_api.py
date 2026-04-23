from fastapi.testclient import TestClient
import main


client = TestClient(main.app)


def test_root():
    res = client.get("/")
    assert res.status_code == 200
    assert res.json()["status"] == "VISIO ONLINE"


def test_scan_rejects_unsupported_file():
    res = client.post(
        "/scan",
        files={"file": ("bad.exe", b"abcd", "application/octet-stream")},
    )
    assert res.status_code == 400
    assert "Unsupported" in res.json()["error"]


def test_scan_rejects_invalid_pdf_mode():
    res = client.post(
        "/scan?pdf_mode=bad_mode",
        files={"file": ("doc.txt", b"hello", "text/plain")},
    )
    assert res.status_code == 400
    body = res.json()
    assert body["code"] == "invalid_pdf_mode"


def test_request_id_header_present():
    res = client.get("/")
    assert res.status_code == 200
    assert "x-request-id" in res.headers


def test_api_key_enforced_when_enabled():
    old_key = main.settings.api_key
    try:
        main.settings.api_key = "secret"
        res = client.post(
            "/scan",
            files={"file": ("doc.txt", b"hello", "text/plain")},
        )
        assert res.status_code == 401
        assert res.json()["code"] == "unauthorized"
    finally:
        main.settings.api_key = old_key
