import axios from "axios";

export const checkPrime = (n: number): boolean => {
	if (n < 2) return false;
	for (let i = 2; i * i <= n; i++) {
		if (n % i === 0) return false;
	}
	return true;
};

export const checkArmstrong = (n: number): boolean => {
	const numString = Math.abs(n).toString();
	const length = numString.length;
	const total = numString
		.split("")
		.reduce((total, digit) => total + Math.pow(parseInt(digit), length), 0);
	return total === n;
};

export const checkPerfect = (n: number): boolean => {
	if (n <= 1) return false;
	let total = 1;
	for (let i = 2; i * i <= n; i++) {
		if (n % i === 0) {
			total += i;
			if (i !== n / i) total += n / i;
		}
	}
	return total === n;
};

export const sumDigits = (n: number): number => {
	return Math.abs(n)
		.toString()
		.split("")
		.reduce((sum, digit) => sum + parseInt(digit, 10), 0);
};

export const getNumProperties = (n: number) => {
	const properties: string[] = [];

	if (checkArmstrong(n)) properties.push("armstrong");
	properties.push(n % 2 === 0 ? "even" : "odd");

	return {
		isPrime: checkPrime(n),

		properties,
		digitSum: sumDigits(n),
		isPerfect: checkPerfect(n),
	};
};

export const getFunFact = async (n: number): Promise<string> => {
	try {
		const response = await axios.get(`http://numbersapi.com/${n}/math?json`, {
			timeout: 3000,
		});
		return response.data.text || "No fun fact available.";
	} catch (error) {
		return "No fun fact available.";
	}
};
