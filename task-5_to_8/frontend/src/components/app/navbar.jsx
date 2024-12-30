import { Link, useNavigate } from "react-router-dom";
import { Button } from "../ui/button";
import useAuth from "@/context/use-auth";
import { Avatar, AvatarFallback, AvatarImage } from "../ui/avatar";
import { ListVideo, LogOut } from "lucide-react";

export default function Navbar() {
	const navigate = useNavigate();
	const { currentUser, loading } = useAuth();

	return (
		<header className="flex items-center justify-between w-full px-3 h-14 bg-secondary/50">
			<div
				className="flex items-center gap-2 cursor-pointer"
				onClick={() => navigate("/")}
			>
				<img src="/favicon.png" alt="logo" className="w-8 sm:w-10" />
				<h1 className="text-lg font-bold sm:text-2xl">AniSync</h1>
			</div>
			{!loading && currentUser ? (
				<div className="flex items-center gap-3">
					<Button
						asChild
						variant="secondary"
						size="icon"
						className="[&_svg]:size-5"
					>
						<Link to="/watchlist">
							<ListVideo className="w-6 h-6" />
						</Link>
					</Button>
					<Button
						asChild
						variant="secondary"
						size="icon"
						className="[&_svg]:size-5"
					>
						<Link to="/logout">
							<LogOut className="w-6 h-6" />
						</Link>
					</Button>
					<Avatar className="rounded-lg">
						<AvatarImage src={currentUser?.avatar} />
						<AvatarFallback>
							{currentUser?.firstName[0]}
						</AvatarFallback>
					</Avatar>
				</div>
			) : (
				<div className="flex items-center gap-2">
					<Button onClick={() => navigate("/register")}>
						Register
					</Button>
					<Button
						variant="secondary"
						onClick={() => navigate("/login")}
					>
						Login
					</Button>
				</div>
			)}
		</header>
	);
}
