import api from "./api";

const getAllWatchlists = async () => {
	const response = await api.get("/watchlist");
	return response.data.data;
};

const getWatchlist = async (id) => {
	const response = await api.get(`/watchlist/${id}`);
	return response.data.data;
};

export { getAllWatchlists, getWatchlist };
