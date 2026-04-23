from typing import Any


def extract_entities(analysis: dict[str, Any]) -> list[dict[str, Any]]:
    entities = analysis.get("entities", [])
    normalized: list[dict[str, Any]] = []
    for entity in entities:
        if not isinstance(entity, dict):
            continue
        normalized.append(
            {
                "type": str(entity.get("type", "UNKNOWN")).upper(),
                "value": str(entity.get("value", "")),
                "confidence": int(entity.get("confidence", 80)),
            }
        )
    return normalized
