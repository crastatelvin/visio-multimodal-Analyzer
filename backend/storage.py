import json
import sqlite3
import time
from threading import Lock


class SQLiteStore:
    def __init__(self, db_path: str) -> None:
        self._conn = sqlite3.connect(db_path, check_same_thread=False)
        self._lock = Lock()
        self._init_tables()

    def _init_tables(self) -> None:
        with self._conn:
            self._conn.execute(
                """
                CREATE TABLE IF NOT EXISTS scans (
                    job_id TEXT PRIMARY KEY,
                    payload TEXT NOT NULL,
                    created_at REAL NOT NULL
                )
                """
            )
            self._conn.execute(
                """
                CREATE TABLE IF NOT EXISTS rate_limits (
                    rate_key TEXT PRIMARY KEY,
                    count INTEGER NOT NULL,
                    window_start REAL NOT NULL
                )
                """
            )

    def set_latest(self, job_id: str, payload: dict) -> None:
        with self._lock:
            with self._conn:
                self._conn.execute(
                    """
                    INSERT INTO scans(job_id, payload, created_at)
                    VALUES(?, ?, ?)
                    ON CONFLICT(job_id) DO UPDATE SET
                        payload=excluded.payload,
                        created_at=excluded.created_at
                    """,
                    (job_id, json.dumps(payload), time.time()),
                )

    def get_latest(self, job_id: str) -> dict | None:
        with self._lock:
            row = self._conn.execute("SELECT payload FROM scans WHERE job_id = ?", (job_id,)).fetchone()
            if not row:
                return None
            return json.loads(row[0])

    def latest_job_id(self) -> str | None:
        with self._lock:
            row = self._conn.execute("SELECT job_id FROM scans ORDER BY created_at DESC LIMIT 1").fetchone()
            if not row:
                return None
            return row[0]

    def allow_rate(self, key: str, limit: int, window_seconds: int) -> bool:
        now = time.time()
        with self._lock:
            row = self._conn.execute(
                "SELECT count, window_start FROM rate_limits WHERE rate_key = ?",
                (key,),
            ).fetchone()
            if row is None or now - row[1] > window_seconds:
                with self._conn:
                    self._conn.execute(
                        """
                        INSERT INTO rate_limits(rate_key, count, window_start)
                        VALUES(?, ?, ?)
                        ON CONFLICT(rate_key) DO UPDATE SET count=excluded.count, window_start=excluded.window_start
                        """,
                        (key, 1, now),
                    )
                return True
            if row[0] >= limit:
                return False
            with self._conn:
                self._conn.execute(
                    "UPDATE rate_limits SET count = count + 1 WHERE rate_key = ?",
                    (key,),
                )
            return True
