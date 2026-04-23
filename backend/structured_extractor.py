from typing import Any


def extract_structured_content(analysis: dict[str, Any]) -> dict[str, Any]:
    return {
        "key_values": analysis.get("key_values", {}),
        "tables": analysis.get("tables", []),
        "full_text": analysis.get("full_text", ""),
    }
