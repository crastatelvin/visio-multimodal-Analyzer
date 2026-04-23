# VISIO - Multimodal Document Intelligence

Drop any visual document and VISIO extracts document type, text, entities, key-values, tables, sentiment, and structured output in a scanner-style interface.

## Folder Structure
- `backend/main.py` - FastAPI app and API routes
- `backend/document_processor.py` - PDF/image/text conversion and normalization
- `backend/vision_analyzer.py` - Vision analysis orchestration
- `backend/entity_extractor.py` - Entity normalization
- `backend/structured_extractor.py` - Structured extraction helpers
- `backend/gemini_service.py` - Gemini API integration and parser
- `frontend/src/components/` - Scanner viewport and extraction UI components
- `frontend/src/pages/` - `UploadPage` and `ScannerPage`
- `sample_docs/` - Sample files for quick validation

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
- `POST /scan?job_id=<uuid>&pdf_mode=first_page|all_pages&pdf_page_limit=3`
- `POST /ask?job_id=<uuid>`
- `GET /latest?job_id=<uuid>`
- `GET /status`
- `GET /metrics`
- `WS /ws?job_id=<uuid>`

## Runtime Notes
- Set `GROQ_API_KEY` in `backend/.env`.
- Optional: set `VISIO_API_KEY` to require `x-api-key` on scan/ask routes.
- SQLite persistence path is set by `VISIO_DB_PATH` (default `visio.db`).
