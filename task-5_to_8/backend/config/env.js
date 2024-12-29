import dotenv from "dotenv";

dotenv.config();

const getEnv = (key, defaultValue) => {
	const value = process.env[key] || defaultValue;

	if (!value) {
		throw new Error(`Environment variable ${key} is required`);
	}

	return value;
};

const PORT = getEnv("PORT", 4000);
const NODE_ENV = getEnv("NODE_ENV", "development");
const MONGO_URI = getEnv("MONGO_URI");
const JWT_SECRET = getEnv("JWT_SECRET");
const JWT_EXPIRES_IN = getEnv("JWT_EXPIRES_IN", "1d");
const CLOUDINARY_API_NAME = getEnv("CLOUDINARY_API_NAME");
const CLOUDINARY_API_KEY = getEnv("CLOUDINARY_API_KEY");
const CLOUDINARY_API_SECRET = getEnv("CLOUDINARY_API_SECRET");
const CLOUDINARY_DEFAULT_FOLDER = getEnv("CLOUDINARY_DEFAULT_FOLDER");

export {
	PORT,
	NODE_ENV,
	MONGO_URI,
	JWT_SECRET,
	JWT_EXPIRES_IN,
	CLOUDINARY_API_NAME,
	CLOUDINARY_API_KEY,
	CLOUDINARY_API_SECRET,
	CLOUDINARY_DEFAULT_FOLDER,
};
