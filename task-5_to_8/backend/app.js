import express from "express";
import dotenv from "dotenv";
import morgan from "morgan";
import cookieParser from "cookie-parser";
import connectDatabase from "./config/db.js";
import { FRONTEND_URL, NODE_ENV, PORT } from "./config/env.js";
import cors from "cors";

import { authoriseUser } from "./middleware/auth.middleware.js";

// Routes
import authRoutes from "./routes/auth.routes.js";
import userRoutes from "./routes/user.routes.js";
import watchlistRoutes from "./routes/watchlist.route.js";

const app = express();
dotenv.config();

// Middlewares
app.use(express.json());
app.use(
	cors({
		origin: FRONTEND_URL,
		credentials: true,
	})
);
app.use(express.urlencoded({ extended: true, limit: "16kb" }));
app.use(cookieParser());
app.use(express.static("public"));
app.use(morgan("dev"));

app.get("/", (req, res) => {
	res.json({
		status: "Alive",
		message: "Server is running",
	});
});

app.use("/auth", authRoutes);
app.use("/user", authoriseUser, userRoutes);
app.use("/watchlist", authoriseUser, watchlistRoutes);

// const PORT = process.env.PORT || 4000;
// const NODE_ENV = process.env.NODE_ENV || "development";
app.listen(PORT, async () => {
	console.log(`Server listening on port ${PORT} in ${NODE_ENV} environment`);
	await connectDatabase();
});
