def is_prime(n: int) -> bool:
    if n <= 1:
        return False
    if n == 2:
        return True
    if n % 2 == 0:
        return False
    for i in range(3, int(n**0.5) + 1, 2):
        if n % i == 0:
            return False
    return True

def is_perfect(n: int) -> bool:
    if n <= 0:
        return False
    sum_divisors = 1
    if n == 1:
        return False
    for i in range(2, int(n**0.5) + 1):
        if n % i == 0:
            sum_divisors += i
            other_divisor = n // i
            if other_divisor != i:
                sum_divisors += other_divisor
    return sum_divisors == n

def is_armstrong(n: int) -> bool:
    if n < 0:
        return False
    original = n
    num_str = str(n)
    num_digits = len(num_str)
    sum_powers = sum(int(digit) ** num_digits for digit in num_str)
    return sum_powers == original

def digit_sum(n: int) -> int:
    return sum(int(digit) for digit in str(abs(n)))

def get_parity(n: int) -> str:
    return 'even' if n % 2 == 0 else 'odd'