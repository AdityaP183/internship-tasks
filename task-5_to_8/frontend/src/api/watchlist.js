import api from "./api";

const createWatchlist = async (data) => {
	const response = await api.post("/watchlist", data);
	return response.data;
};

const getAllWatchlists = async () => {
	const response = await api.get("/watchlist");
	return response.data.data;
};

const getWatchlist = async (id) => {
	const response = await api.get(`/watchlist/${id}`);
	return response.data.data;
};

const updateWatchlist = async (id, data) => {
	const response = await api.patch(`/watchlist/${id}`, data);
	return response.data;
};

const deleteWatchlist = async (id) => {
	const response = await api.delete(`/watchlist/${id}`);
	return response.data;
};

const addToWatchlist = async (id, data) => {
	const response = await api.post(`/watchlist/add/${id}`, data);
	return response.data;
};

const removeFromWatchlist = async (id, data) => {
	const response = await api.post(`/watchlist/remove/${id}`, data);
	return response.data;
};

export {
	createWatchlist,
	getAllWatchlists,
	getWatchlist,
	updateWatchlist,
	deleteWatchlist,
	addToWatchlist,
	removeFromWatchlist,
};
