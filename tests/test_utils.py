from app.utils import is_prime, is_perfect, is_armstrong, digit_sum, get_parity

def test_is_prime():
    assert is_prime(2) == True
    assert is_prime(29) == True
    assert is_prime(1) == False

def test_is_perfect():
    assert is_perfect(6) == True
    assert is_perfect(28) == True
    assert is_perfect(10) == False

def test_is_armstrong():
    assert is_armstrong(153) == True
    assert is_armstrong(371) == True
    assert is_armstrong(123) == False

def test_digit_sum():
    assert digit_sum(123) == 6
    assert digit_sum(456) == 15

def test_get_parity():
    assert get_parity(4) == 'even'
    assert get_parity(7) == 'odd'