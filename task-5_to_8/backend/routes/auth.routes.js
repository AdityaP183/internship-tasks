import { Router } from "express";
import {
	loginUser,
	logoutUser,
	registerUser,
} from "../controllers/auth.controller.js";
import { upload } from "../middleware/multer.middleware.js";

const router = Router();

router.route("/register").post(
	upload.fields([
		{
			name: "avatar",
			maxCount: 1,
		},
	]),
	registerUser
);

router.post("/login", loginUser);
router.post("/logout", logoutUser);

export default router;
