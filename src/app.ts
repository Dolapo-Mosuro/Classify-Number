import { Request, Response } from "express";
import * as express from "express";

import cors from "cors";
import { getNumProperties, getFunFact } from "./function";

const app = express();
const PORT = process.env.PORT || 3001;

app.use(cors());
app.use(express.json()); // Useful for future expansions

app.get("/api/classify-number", async (req: Request, res: Response) => {
	const numParams = req.query.number;

	// Validate query parameter existence
	if (typeof numParams !== "string" || numParams.trim() === "") {
		return res.status(400).json({
			success: false,
			error: true,
			number: "",
			message: "Number parameter is required",
		});
	}

	// Ensure input is a valid integer
	const num = parseInt(numParams, 10);
	if (Number.isNaN(num) || num < 0) {
		return res.status(400).json({
			success: false,
			error: true,
			number: numParams,
			message: "Number must be a non-negative integer",
		});
	}

	const properties = getNumProperties(num);

	// Handle fun fact fetching
	let funFact = "No fun fact available.";
	try {
		funFact = await getFunFact(num);
	} catch (error) {
		console.error("Error fetching fun fact:", error);
	}

	// Send response
	return res.status(200).json({
		success: true,
		number: num,
		is_prime: properties.isPrime,
		is_perfect: properties.isPerfect,
		properties: properties.properties,
		digit_sum: properties.digitSum,
		fun_fact: funFact,
	});
});

app.listen(PORT, () => {
	console.log(`🚀 Server running on port ${PORT}`);
});
