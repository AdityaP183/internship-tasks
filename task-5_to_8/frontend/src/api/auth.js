import api from "./api";

const register = async (credentails) => {
	const response = await api.post("/auth/register", credentails);
	return response.data.data;
};

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

export { register, login, logout, getCurrentUser };
