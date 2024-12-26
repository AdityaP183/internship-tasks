import { useNavigate } from "react-router-dom";
import { Button } from "../ui/button";

export default function Navbar() {
	const navigate = useNavigate();
	return (
		<header className="flex items-center justify-between w-full px-3 h-14 bg-secondary/50">
			<div
				className="flex items-center gap-2 cursor-pointer"
				onClick={() => navigate("/")}
			>
				<img src="/favicon.png" alt="logo" className="w-8 sm:w-10" />
				<h1 className="text-lg font-bold sm:text-2xl">AniSync</h1>
			</div>
			<div className="flex items-center gap-2">
				<Button onClick={() => navigate("/register")}>Register</Button>
				<Button variant="secondary" onClick={() => navigate("/login")}>
					Login
				</Button>
			</div>
		</header>
	);
}
