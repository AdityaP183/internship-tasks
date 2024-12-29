import mongoose from "mongoose";
import { MONGO_URI } from "./env.js";

const connectDatabase = async () => {
	try {
		const conn = await mongoose.connect(MONGO_URI);
		console.log("Database connected: ", conn.connection.host);
	} catch (error) {
		console.log("Database connection failed");
		console.error(error);
		process.exit(1);
	}
};

export default connectDatabase;
