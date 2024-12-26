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
import useIsMobile from "@/hooks/use-Ismobile";
import { ArrowLeft } from "lucide-react";
import { Link, useNavigate } from "react-router-dom";

export default function Register() {
	const isMobile = useIsMobile();
	const navigate = useNavigate();

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
					/>
				)}
				<Card className="flex-1 h-full border-none">
					<CardHeader>
						<CardTitle className="text-4xl font-bold">
							Register
						</CardTitle>
						<CardDescription className="text-lg">
							Already a user?{" "}
							<Link
								to="/login"
								className="font-semibold underline text-primary"
							>
								Login
							</Link>{" "}
							now
						</CardDescription>
					</CardHeader>
					<CardContent>
						<form action="" className="flex flex-col gap-4">
							<div className="space-y-2">
								<Label htmlFor="email">Full Name</Label>
								<Input id="fullName" type="fullName" />
							</div>
							<div className="space-y-2">
								<Label htmlFor="email">Email</Label>
								<Input id="email" type="email" />
							</div>
							<div className="space-y-2">
								<Label htmlFor="password">Password</Label>
								<Input id="password" type="password" />
								<div>Password Strength</div>
							</div>
							<Button className="w-full mt-5">Register</Button>
						</form>
					</CardContent>
					<CardFooter>
						<Button
							className="w-full mt-5"
							variant="outline"
							onClick={() => navigate("/")}
						>
							<ArrowLeft className="w-4 h-4 mr-2" /> Go Back Home
						</Button>
					</CardFooter>
				</Card>
			</Card>
		</div>
	);
}
