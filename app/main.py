from fastapi import FastAPI, Query
from fastapi.middleware.cors import CORSMiddleware
from fastapi.responses import JSONResponse
import requests
from app.utils import is_prime, is_perfect, is_armstrong, digit_sum, get_parity

app = FastAPI()

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

@app.get("/api/classify-number")
async def classify_number(number: str = Query(...)):
    try:
        num = int(number)
    except ValueError:
        return JSONResponse(
            status_code=400,
            content={"number": number, "error": True}
        )

    is_prime_num = is_prime(num)
    is_perfect_num = is_perfect(num)
    is_armstrong_num = is_armstrong(num)
    digit_sum_num = digit_sum(num)
    parity = get_parity(num)

    properties = []
    if is_armstrong_num:
        properties.append("armstrong")
    properties.append(parity)

    # Fetch fun fact from Numbers API
    fun_fact = "No fun fact found."
    try:
        response = requests.get(f"http://numbersapi.com/{num}/math?json", timeout=3)
        if response.status_code == 200:
            data = response.json()
            if data.get('found', False):
                fun_fact = data.get('text', 'No fun fact found.')
    except requests.exceptions.RequestException:
        fun_fact = "Failed to retrieve fun fact."

    return {
        "number": num,
        "is_prime": is_prime_num,
        "is_perfect": is_perfect_num,
        "properties": properties,
        "digit_sum": digit_sum_num,
        "fun_fact": fun_fact
    }