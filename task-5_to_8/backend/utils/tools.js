import jwt from "jsonwebtoken";
import {
	CLOUDINARY_DEFAULT_FOLDER,
	JWT_EXPIRES_IN,
	JWT_SECRET,
} from "../config/env.js";

export const generateToken = (data) => {
	return jwt.sign(data, JWT_SECRET, { expiresIn: JWT_EXPIRES_IN });
};

export const defaultAvatar = (gender) => {
	const randomNumber = Math.floor(Math.random() * 5) + 1;
	const randomAvatarUrl = `${CLOUDINARY_DEFAULT_FOLDER}/${gender}/${gender}-0${randomNumber}.png`;

	return randomAvatarUrl;
};
