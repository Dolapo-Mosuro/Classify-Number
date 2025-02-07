import express, { Request, Response } from "express";
import cors from "cors";
import { getNumProperties, getFunFact } from "./function";

const app = express();
const PORT = process.env.PORT || 3001;

app.use(cors());

app.get(
	"/api/classify-number",
	async (req: Request, res: Response): Promise<void> => {
		const { number } = req.query;

		if (!number || isNaN(Number(number))) {
			res.status(400).json({ number: number || null, error: true });
			return;
		}

		const num = parseInt(number as string, 10);

		const properties = getNumProperties(num);
		const funFact = await getFunFact(num);

		res.status(200).json({
			number: num,
			is_prime: properties.isPrime,
			is_perfect: properties.isPerfect,
			properties: properties.properties,
			digit_sum: properties.digitSum,
			fun_fact: funFact,
		});
	}
);

app.listen(PORT, () => {
	console.log(`Server running on port ${PORT}`);
});
