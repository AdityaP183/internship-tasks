import { Outlet } from "react-router-dom";
import Navbar from "./navbar";
import ProtectedRoute from "./protected-route";

export default function AppLayout() {
	return (
		<ProtectedRoute>
			<div className="w-full min-h-screen">
				<Navbar />
				<div className="flex-1 w-full">
					<Outlet />
				</div>
			</div>
		</ProtectedRoute>
	);
}
