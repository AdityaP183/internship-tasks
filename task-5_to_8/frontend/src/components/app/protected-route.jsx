import useAuth from "@/context/use-auth";
import { useEffect } from "react";
import toast from "react-hot-toast";
import { Navigate } from "react-router-dom";
import MainLoader from "./main-loader";

export default function ProtectedRoute({ children }) {
	const { currentUser, loading, error } = useAuth();

	useEffect(() => {
		if (!loading && !currentUser) {
			if (error && error.status === 401) {
				toast.error("You are not logged in");
			}
		}
	}, [currentUser, loading, error]);

	if (loading) {
		return <MainLoader />;
	}

	return currentUser ? children : <Navigate to="/login" replace />;
}
