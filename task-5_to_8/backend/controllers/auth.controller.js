import { defaultAvatar, generateToken } from "../utils/tools.js";
import User from "../models/user.model.js";
import uploadImageToCloudinary from "../services/cloudinary.js";

export const registerUser = async (req, res) => {
	const { firstName, email, lastName, password, gender } = req.body;

	// Check if all required fields are provided
	if (!firstName || !email || !lastName || !password || !gender) {
		return res.status(400).json({
			error: "All fields are required",
		});
	}

	// Check if email is valid
	const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
	if (!emailRegex.test(email)) {
		return res.status(400).json({
			error: "Invalid email format",
		});
	}

	// Check if user already exists
	const isAlreadyRegistered = await User.findOne({ email });
	if (isAlreadyRegistered) {
		return res.status(400).json({
			error: "User already registered",
		});
	}

	// Check if password is at least 6 characters long
	if (password.length < 6) {
		return res.status(400).json({
			error: "Password must be at least 6 characters long",
		});
	}

	// Handle avatar either user uploads or default
	let avatarUrl;
	let avatarLocalPath = req.files?.avatar ? req.files.avatar[0].path : null;

	if (!avatarLocalPath) {
		avatarUrl = defaultAvatar(gender);
	} else {
		try {
			avatarUrl = await uploadImageToCloudinary(avatarLocalPath);
		} catch (error) {
			return res.status(500).json({
				error: "Error uploading avatar image",
			});
		}
	}

	const userToCreate = {
		firstName,
		lastName,
		email,
		password,
		avatar: avatarUrl,
	};

	try {
		const user = await User.create(userToCreate);
		res.status(201).json({
			message: "User registered successfully",
			user,
		});
	} catch (error) {
		res.status(500).json({
			error: error.message || "Something went wrong",
		});
	}
};

export const loginUser = async (req, res) => {
	const { email, password } = req.body;

	if (!email || !password) {
		return res.status(400).json({
			error: "All fields are required",
		});
	}

	try {
		// Check for existing user
		const user = await User.findOne({ email });
		if (!user) {
			return res.status(400).json({
				error: "User not found",
			});
		}

		// Check if password is correct
		const isPasswordCorrect = await user.isPasswordCorrect(password);
		if (!isPasswordCorrect) {
			return res.status(401).json({
				error: "Credentials do not match",
			});
		}

		// Generate JWT token
		const token = generateToken({
			id: user._id,
			email: user.email,
		});

		const userWithoutPassword = {
			id: user._id,
			firstName: user.firstName,
			lastName: user.lastName,
			email: user.email,
			avatar: user.avatar,
		};

		res.status(200)
			.cookie("token", token, {
				httpOnly: true,
			})
			.json({
				message: "User logged in successfully",
				data: userWithoutPassword,
			});
	} catch (error) {
		res.status(500).json({
			error: error.message || "Something went wrong",
		});
	}
};

export const logoutUser = async (req, res) => {
	return res
		.status(200)
		.clearCookie("token", {
			httpOnly: true,
		})
		.json({ message: "User logged out successfully" });
};
