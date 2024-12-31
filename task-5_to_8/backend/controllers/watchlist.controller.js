import Watchlist from "../models/watchlist.model.js";

export const createWatchlist = async (req, res) => {
	const { title } = req.body;

	if (!title) {
		return res.status(400).json({ message: "Title is required" });
	}

	const owner = req.user._id;
	try {
		const watchlist = await Watchlist.create({ title, owner });

		res.status(201).json({
			message: "Watchlist created successfully",
			data: watchlist,
		});
	} catch (error) {
		res.status(500).json({ error: error.message });
	}
};

export const getAllWatchlists = async (req, res) => {
	try {
		const owner = req.user._id;

		const watchlists = await Watchlist.find({ owner });

		res.status(200).json({ data: watchlists });
	} catch (error) {
		res.status(500).json({ error: error.message });
	}
};

export const getWatchlist = async (req, res) => {
	try {
		const id = req.params.id;
		const owner = req.user._id;

		if (!id) {
			return res
				.status(400)
				.json({ message: "Watchlist id is required" });
		}

		const watchlist = await Watchlist.findOne({ _id: id, owner });

		res.status(200).json({ data: watchlist });
	} catch (error) {
		res.status(500).json({ error: error.message });
	}
};

export const updateWatchlist = async (req, res) => {
	try {
		const id = req.params.id;

		if (!id) {
			return res
				.status(400)
				.json({ message: "Watchlist id is required" });
		}

		const { title } = req.body;
		if (!title) {
			return res.status(400).json({ message: "Title is required" });
		}

		const updatedWatchlist = await Watchlist.findByIdAndUpdate(
			id,
			{ title },
			{ new: true }
		);
		if (!updatedWatchlist) {
			return res(400).json({ message: "Watchlist not found" });
		}

		res.status(200).json({
			message: "Watchlist updated successfully",
			data: updatedWatchlist,
		});
	} catch (error) {
		res.status(500).json({ error: error.message });
	}
};

export const deleteWatchlist = async (req, res) => {
	try {
		const id = req.params.id;

		if (!id) {
			return res
				.status(400)
				.json({ message: "Watchlist id is required" });
		}

		const watchlist = await Watchlist.findByIdAndDelete(id);
		if (!watchlist) {
			return res(400).json({ message: "Watchlist not found" });
		}

		res.status(200).json({
			message: "Watchlist deleted successfully",
		});
	} catch (error) {
		res.status(500).json({ error: error.message });
	}
};

export const addToWatchlist = async (req, res) => {
	try {
		const id = req.params.id;
		const { id: animeId } = req.body;

		if (!animeId) {
			return res.status(400).json({ message: "Anime id is required" });
		}

		const watchlist = await Watchlist.findById(id);
		if (!watchlist) {
			return res.status(400).json({ message: "Watchlist not found" });
		}

		if (watchlist.animes.includes(animeId)) {
			return res
				.status(400)
				.json({ message: "Anime already added to watchlist" });
		}

		watchlist.animes.push(animeId);
		watchlist.save();

		res.status(200).json({
			message: "Added to watchlist",
		});
	} catch (error) {
		res.status(500).json({ error: error.message });
	}
};

export const removeFromWatchlist = async (req, res) => {
	try {
		const id = req.params.id;
		const { id: animeId } = req.body;

		if (!animeId) {
			return res.status(400).json({ message: "Anime id is required" });
		}

		const updatedWatchlist = await Watchlist.findOneAndUpdate(
			{
				_id: id,
				animes: animeId,
			},
			{
				$pull: { animes: animeId },
			},
			{ new: true }
		);

		if (!updatedWatchlist) {
			return res
				.status(400)
				.json({ message: "Anime not found in watchlist" });
		}

		res.status(200).json({
			message: "Removed from watchlist",
		});
	} catch (error) {
		res.status(500).json({ error: error.message });
	}
};
