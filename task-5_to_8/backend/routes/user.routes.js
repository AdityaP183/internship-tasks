import { Router } from "express";
import { getCurrentUser, updateUser } from "../controllers/user.controller.js";

const router = Router();

router.route("/").get(getCurrentUser).patch(updateUser);

export default router;
