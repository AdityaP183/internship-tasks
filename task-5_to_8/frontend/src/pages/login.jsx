import { Button } from "@/components/ui/button";
import {
	Card,
	CardContent,
	CardDescription,
	CardFooter,
	CardHeader,
	CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import useAuth from "@/context/use-auth";
import useIsMobile from "@/hooks/use-Ismobile";
import { ArrowLeft } from "lucide-react";
import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import { Link, useNavigate } from "react-router-dom";

export default function Login() {
	const isMobile = useIsMobile();
	const navigate = useNavigate();
	const { currentUser, login, loading, error } = useAuth();
	const [formData, setFormData] = useState({
		email: "",
		password: "",
	});

	const handleFormChange = (e) => {
		const { id, value } = e.target;
		setFormData({ ...formData, [id]: value });
	};

	const handleLogin = async (e) => {
		e.preventDefault();
		await login(formData);
	};

	useEffect(() => {
		if (!loading) {
			if (currentUser) {
				// If logged in successfully
				navigate("/");
				toast.success("Login successful");
			} else if (error) {
				// If there's an error
				if (error.status !== 401) {
					toast.error("Login failed! Check your credentials");
				}
			}
		}
	}, [loading, currentUser, error, navigate]);

	return (
		<div
			className="flex items-center justify-center w-full min-h-screen"
			style={{
				background: isMobile
					? `url('/auth-banner.jpg') center / cover no-repeat`
					: "transparent",
			}}
		>
			<Card className="flex h-fit sm:h-[650px] w-[90%] sm:w-1/2 mx-auto rounded-lg overflow-hidden items-center">
				{!isMobile && (
					<div
						className="flex-1 h-full"
						style={{
							background: `url('/auth-banner.jpg') center / cover no-repeat`,
						}}
					></div>
				)}
				<Card className="flex-1 h-full border-none">
					<CardHeader>
						<CardTitle className="text-4xl font-bold">
							Login
						</CardTitle>
						<CardDescription className="text-lg">
							Don&apos;t have an account?{" "}
							<Link
								to="/register"
								className="font-semibold underline text-primary"
							>
								Register
							</Link>{" "}
							now
						</CardDescription>
					</CardHeader>
					<CardContent>
						<form
							onSubmit={handleLogin}
							className="flex flex-col gap-4"
						>
							<div className="space-y-2">
								<Label htmlFor="email">Email</Label>
								<Input
									id="email"
									type="email"
									placeholder="Email"
									value={formData.email}
									onChange={handleFormChange}
								/>
							</div>
							<div className="space-y-2">
								<Label htmlFor="password">Password</Label>
								<Input
									id="password"
									type="password"
									placeholder="Password"
									value={formData.password}
									onChange={handleFormChange}
								/>
							</div>
							<Button className="w-full mt-5" type="submit">
								Login
							</Button>
						</form>
					</CardContent>
					<CardFooter>
						<Button
							className="w-full"
							variant="outline"
							onClick={() => navigate("/")}
						>
							<ArrowLeft className="w-4 h-4 mr-2" />
							Go Back Home
						</Button>
					</CardFooter>
				</Card>
			</Card>
		</div>
	);
}
