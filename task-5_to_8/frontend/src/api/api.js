import axios from "axios";

const BASE_URL = import.meta.env.VITE_BACKEND_URL;

if (!BASE_URL) {
	throw new Error("VITE_BACKEND_URL is not defined");
}

const api = axios.create({
	baseURL: BASE_URL,
	withCredentials: true,
});

export default api;
