import mongoose from "mongoose";

const watchlistSchema = new mongoose.Schema({
	title: {
		type: String,
		required: true,
	},
	owner: {
		type: mongoose.Schema.Types.ObjectId,
		ref: "User",
	},
	animes: [
		{
			type: Number,
		},
	],
});

const Watchlist = mongoose.model("Watchlist", watchlistSchema);

export default Watchlist;
