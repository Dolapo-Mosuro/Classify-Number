import express, { Request, Response } from "express";
import cors from "cors";
import { getNumProperties, getFunFact } from "./function";

const app = express();
const PORT = process.env.PORT || 3001;

app.use(cors());

app.get("/api/classify-number/:number", async (req: Request, res: Response) => {
	const numParams = req.params.number;

	if (!numParams) {
		res.status(400).json({ number: null, error: true });
		return;
	}

	const num = parseInt(numParams, 10);
	if (isNaN(num)) {
		res.status(400).json({ number: numParams, error: true });
		return;
	}

	const properties = getNumProperties(num);
	try {
		const funFact = await getFunFact(num);
		res.status(200).json({
			number: num,
			is_prime: properties.isPrime,
			is_perfect: properties.isPerfect,
			properties: properties.properties,
			digit_sum: properties.digitSum,
			fun_fact: funFact,
		});
	} catch (error) {
		res.status(200).json({
			number: num,
			is_prime: properties.isPrime,
			is_perfect: properties.isPerfect,
			properties: properties.properties,
			digit_sum: properties.digitSum,
			fun_fact: "No fun fact available.",
		});
	}
});

app.listen(PORT, () => {
	console.log(`Server running on port ${PORT}`);
});
