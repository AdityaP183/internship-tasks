import useAuth from "@/context/use-auth";
import { RefreshCw } from "lucide-react";
import { useEffect } from "react";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";

export default function Logout() {
	const { logout, currentUser } = useAuth();
	const navigate = useNavigate();

	useEffect(() => {
		const handleLogout = async () => {
			await logout();
		};

		handleLogout();
	}, [logout]);

	useEffect(() => {
		if (!currentUser) {
			navigate("/login");
			toast.success("Logout successful");
		}
	}, [currentUser, navigate]);

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
