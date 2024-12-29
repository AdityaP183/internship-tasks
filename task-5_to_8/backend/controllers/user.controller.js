import User from "../models/user.model.js";

export const getCurrentUser = async (req, res) => {
	try {
		const user = req.user;
		return res.status(200).json({ data: user });
	} catch (error) {
		res.status(500).json({ error: error.message });
	}
};

export const updateUser = async (req, res) => {
	const fieldsToUpdate = ["firstName", "lastName", "gender"];

	const dataToUpdate = req.body
		? Object.keys(req.body).reduce((acc, key) => {
				if (fieldsToUpdate.includes(key)) {
					acc[key] = req.body[key];
				}
				return acc;
		  }, {})
		: {};

	if (dataToUpdate.length === 0) {
		return res.status(400).json({ message: "No field to update" });
	}

	try {
		const updatedUser = await User.findByIdAndUpdate(
			req.user._id,
			dataToUpdate,
			{ new: true }
		);

		res.status(200).json({
			message: "User updated successfully",
			data: updatedUser,
		});
	} catch (error) {
		res.status(500).json({ error: error.message });
	}
};
