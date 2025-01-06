import useAuth from "@/context/use-auth";
import { RefreshCw } from "lucide-react";
import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";

export default function Logout() {
	const navigate = useNavigate();
	const [isLoggingOut, setIsLoggingOut] = useState(true);
	const { logout, currentUser } = useAuth();

	useEffect(() => {
		const handleLogout = async () => {
			await logout();
			setIsLoggingOut(false);
		};

		handleLogout();
	}, [logout]);

	useEffect(() => {
		if (!isLoggingOut && !currentUser) {
			navigate("/login");
			toast.success("Logout successful");
		}
	}, [isLoggingOut, currentUser, navigate]);

	if (isLoggingOut) {
		return (
			<div className="flex items-center justify-center h-[80vh] sm:min-h-screen animate-pulse bg-gradient-to-br from-secondary to-secondary/50">
				<div className="flex flex-col items-center gap-10">
					<RefreshCw className="w-20 h-20 animate-spin" />
					<p className="text-2xl animate-bounce">
						Logging You Out Please Wait...
					</p>
				</div>
			</div>
		);
	}

	return null;
}
