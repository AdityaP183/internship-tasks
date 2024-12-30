import api from "./api";

const login = async (credentails) => {
	const response = await api.post("/auth/login", credentails);
	return response.data.data;
};

const logout = async () => {
	const response = await api.post("/auth/logout");
	return response.data;
};

const getCurrentUser = async () => {
	const response = await api.get("/user");
	return response.data;
};

export { login, logout, getCurrentUser };
