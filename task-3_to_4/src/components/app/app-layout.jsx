import { Outlet } from "react-router-dom";
import Navbar from "./navbar";

export default function AppLayout() {
	return (
		<div className="w-full min-h-screen">
			<Navbar />
			<div className="flex-1 w-full">
				<Outlet />
			</div>
		</div>
	);
}
