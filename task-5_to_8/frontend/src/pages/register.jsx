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
import { passwordValidation } from "@/lib/utils";
import { ArrowLeft, Eye, EyeClosed } from "lucide-react";
import { useState } from "react";
import toast from "react-hot-toast";
import { Link, useNavigate } from "react-router-dom";

export default function Register() {
	const isMobile = useIsMobile();
	const navigate = useNavigate();

	const [formValues, setFormValues] = useState({
		fullName: "",
		email: "",
		password: "",
	});
	const [showPassword, setShowPassword] = useState(false);
	const [passwordStrength, setPasswordStrength] = useState([]);

	const handleFormChange = (e) => {
		const { id, value } = e.target;
		setFormValues({ ...formValues, [id]: value });

		if (id === "password") {
			setPasswordStrength(passwordValidation(value));
		}
	};

	const passwordStrengthText = passwordStrength.includes("length")
		? "Password must be at least 6 characters long."
		: passwordStrength.includes("lowercase")
		? "Password must contains lowercase"
		: passwordStrength.includes("uppercase")
		? "Password must contains uppercase"
		: passwordStrength.includes("digit")
		? "Password must contains digit"
		: passwordStrength.includes("symbol")
		? "Password must contains symbol"
		: null;

	const passwordStrengthPercent =
		formValues.password.length === 0
			? 0
			: ((5 - passwordStrength.length) / 5) * 100;
	const passwordStrengthColor =
		passwordStrengthPercent > 50
			? "bg-green-500"
			: passwordStrengthPercent > 25
			? "bg-yellow-500"
			: "bg-red-500";

	function handleRegister(e) {
		e.preventDefault();
		console.log(formValues);
		if (!formValues.fullName || !formValues.email || !formValues.password) {
			toast.error("All fields are required");
			return;
		}

		toast.success("Registration successful");
	}

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
								<Label htmlFor="fullName">Full Name</Label>
								<Input
									id="fullName"
									type="fullName"
									onChange={handleFormChange}
								/>
							</div>
							<div className="space-y-2">
								<Label htmlFor="email">Email</Label>
								<Input
									id="email"
									type="email"
									onChange={handleFormChange}
								/>
							</div>
							<div className="space-y-2">
								<div className="flex items-center justify-between">
									<Label htmlFor="password">Password</Label>

									<div
										onClick={() =>
											setShowPassword(!showPassword)
										}
									>
										{showPassword ? <EyeClosed /> : <Eye />}
									</div>
								</div>
								<Input
									id="password"
									type={showPassword ? "text" : "password"}
									onChange={handleFormChange}
								/>
								<div className="w-full">
									<div className="relative h-2 overflow-hidden bg-gray-700 rounded-md">
										<div
											className={`absolute top-0 left-0 h-full ${passwordStrengthColor}`}
											style={{
												width: `${passwordStrengthPercent}%`,
											}}
										></div>
									</div>
									<p className="text-center text-muted-foreground">
										{passwordStrengthText &&
											passwordStrengthText}
									</p>
								</div>
							</div>
							<Button
								className="w-full mt-5"
								onClick={handleRegister}
							>
								Register
							</Button>
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
