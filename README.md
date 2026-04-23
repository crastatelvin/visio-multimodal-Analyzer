# VISIO - Multimodal Document Intelligence

VISIO scans uploaded documents, extracts structured intelligence, and supports Q&A over the extracted content.

## Scope Implemented
- Single-user demo baseline
- Synchronous scan API with job-scoped progress updates
- Canonical server-side preview image used by backend and frontend
- Typed response contracts
- JSON-first model parsing with safe fallback

## Project Structure
- `backend/`: FastAPI service, Gemini integration, parsing, tests
- `frontend/`: React app wired to typed API contracts

## Backend Setup
```bash
cd backend
python -m venv venv
venv\Scripts\activate
pip install -r requirements.txt
copy .env.example .env
uvicorn main:app --reload
```

## Frontend Setup
```bash
cd frontend
npm install
copy .env.example .env
npm start
```

## API
- `POST /scan?job_id=<uuid>`: upload and scan
- `POST /ask?job_id=<uuid>`: ask follow-up question
- `GET /latest?job_id=<uuid>`: fetch latest result for a job
- `WS /ws?job_id=<uuid>`: progress events for a job
- `GET /metrics`: basic service counters
- `GET /status`: health and runtime status

## Notes
- CORS is env-configurable via `VISIO_ALLOWED_ORIGINS`.
- Storage is SQLite-backed via `VISIO_DB_PATH` (default `visio.db`).
- Rate limiting is SQLite-backed for single-instance deployment.
- Request IDs are emitted in `x-request-id` response headers.
- Set `VISIO_API_KEY` to enforce `x-api-key` on `POST /scan` and `POST /ask`.
