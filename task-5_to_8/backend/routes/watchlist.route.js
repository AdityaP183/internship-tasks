import { Router } from "express";
import {
	addToWatchlist,
	createWatchlist,
	deleteWatchlist,
	getAllWatchlists,
	getWatchlist,
	removeFromWatchlist,
	updateWatchlist,
} from "../controllers/watchlist.controller.js";

const router = Router();

router.route("/").post(createWatchlist).get(getAllWatchlists);
router
	.route("/:id")
	.get(getWatchlist)
	.patch(updateWatchlist)
	.delete(deleteWatchlist);
router.route("/add/:id").post(addToWatchlist);
router.route("/remove/:id").post(removeFromWatchlist);

export default router;
