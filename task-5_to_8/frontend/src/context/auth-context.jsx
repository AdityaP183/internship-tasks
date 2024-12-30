import api from "@/api/api";
import { login } from "@/api/auth";
import { createContext, useEffect, useState } from "react";

const AuthContext = createContext();

const AuthProvider = ({ children }) => {
	const [currentUser, setCurrentUser] = useState(null);
	const [loading, setLoading] = useState(true);
	const [error, setError] = useState(null);

	useEffect(() => {
		// Check if user is already logged in
		const fetchCurrentUser = async () => {
			try {
				const response = await api.get("/user");
				setCurrentUser(response.data?.data);
			} catch (error) {
				if (error.response?.status === 401) {
					console.error("Session expired, please login again");
				}
				setCurrentUser(null);
				setError(error.response);
			} finally {
				setLoading(false);
			}
		};

		fetchCurrentUser();
	}, []);

	const handleLogin = async (data) => {
		try {
			const user = await login(data);
			setCurrentUser(user);
			setError(null);
		} catch (error) {
			setError(error);
		}
	};

	const handleLogout = async () => {
		try {
			await api.post("/auth/logout");
			setCurrentUser(null);
			setError(null);
		} catch (error) {
			setError(error);
		}
	};

	return (
		<AuthContext.Provider
			value={{
				currentUser,
				loading,
				error,
				login: handleLogin,
				logout: handleLogout,
			}}
		>
			{children}
		</AuthContext.Provider>
	);
};

export { AuthContext, AuthProvider };