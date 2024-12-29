import { v2 as cloudinary } from "cloudinary";
import fs from "fs";
import {
	CLOUDINARY_API_KEY,
	CLOUDINARY_API_NAME,
	CLOUDINARY_API_SECRET,
} from "../config/env.js";

// Configuration
cloudinary.config({
	cloud_name: CLOUDINARY_API_NAME,
	api_key: CLOUDINARY_API_KEY,
	api_secret: CLOUDINARY_API_SECRET,
});

const uploadImageToCloudinary = async (imageLocalPath) => {
	try {
		if (!imageLocalPath) return null;

		// Upload to Cloudinary
		const res = await cloudinary.uploader.upload(imageLocalPath, {
			resource_type: "auto",
			folder: "avatar",
		});

		// Deleting local image
		fs.unlinkSync(imageLocalPath);

		return res.secure_url;
	} catch (error) {
		fs.unlinkSync(imageLocalPath);
		return null;
	}
};

export default uploadImageToCloudinary;
