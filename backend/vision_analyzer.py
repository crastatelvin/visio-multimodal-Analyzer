from typing import Any
from groq_service import analyze_document_vision


def analyze_visual_document(base64_image: str, media_type: str) -> dict[str, Any]:
    return analyze_document_vision(base64_image, media_type)
