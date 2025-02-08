from fastapi.testclient import TestClient
from app.main import app

client = TestClient(app)

def test_classify_number_valid_input():
    response = client.get("/api/classify-number?number=371")
    assert response.status_code == 200
    assert response.json() == {
        "number": 371,
        "is_prime": False,
        "is_perfect": False,
        "properties": ["armstrong", "odd"],
        "digit_sum": 11,
        "fun_fact": "371 is an Armstrong number because 3^3 + 7^3 + 1^3 = 371"
    }

def test_classify_number_invalid_input():
    response = client.get("/api/classify-number?number=abc")
    assert response.status_code == 400
    assert response.json() == {"number": "abc", "error": True}

def test_classify_number_negative_input():
    response = client.get("/api/classify-number?number=-123")
    assert response.status_code == 200
    assert response.json() == {
        "number": -123,
        "is_prime": False,
        "is_perfect": False,
        "properties": ["odd"],
        "digit_sum": 6,
        "fun_fact": "No fun fact found."
    }