import jwt from "jsonwebtoken";
import { JWT_SECRET } from "../config/env.js";
import User from "../models/user.model.js";

export const authoriseUser = async (req, res, next) => {
	try {
		// Check if user is authenticated
		const token =
			req.cookies?.token ||
			req.headers("Authorization")?.replace("Bearer ", "");
		if (!token) {
			return res.status(401).json({
				error: "Unauthorized Access",
			});
		}

		const isValidToken = jwt.verify(token, JWT_SECRET);

		const user = await User.findById(isValidToken?.id).select("-password");
		if (!user) {
			return res.status(401).json({
				error: "Unauthorized Access",
			});
		}

		req.user = user;

		next();
	} catch (error) {
		return res.status(401).json({
			error: "Unauthorized Access. Invalid Token",
		});
	}
};
