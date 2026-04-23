from groq_service import parse_json_response, _repair_amount_fields_from_text, _is_suspicious_extraction


def test_parse_json_response_valid():
    text = '{"document_type":"Invoice","sentiment":{"label":"neutral","score":0.5}}'
    out = parse_json_response(text)
    assert out["document_type"] == "Invoice"
    assert out["sentiment"]["label"] == "neutral"


def test_parse_json_response_invalid_fallback():
    out = parse_json_response("nonsense")
    assert out["document_type"] == "Unknown"
    assert out["entities"] == []


def test_repair_amount_fields_from_text_extracts_totals():
    payload = {
        "full_text": "Subtotal: 540.00\nTaxes: 54.00\nTotal Due: 594.00",
        "key_values": {}
    }
    out = _repair_amount_fields_from_text(payload)
    assert out["key_values"]["Subtotal"] == "$540.00"
    assert out["key_values"]["Taxes"] == "$54.00"
    assert out["key_values"]["Total"] == "$594.00"


def test_suspicious_detection_for_placeholder_tables():
    payload = {
        "full_text": "Invoice for services",
        "key_values": {"Subtotal": "$0.00", "Total": "$0.00"},
        "tables": [[["Item", "Amount"], ["x00", "$0.00"]]]
    }
    assert _is_suspicious_extraction(payload) is True
