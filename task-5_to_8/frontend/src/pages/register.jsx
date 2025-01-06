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
import {
	Select,
	SelectContent,
	SelectItem,
	SelectTrigger,
	SelectValue,
} from "@/components/ui/select";
import useAuth from "@/context/use-auth";
import useIsMobile from "@/hooks/use-Ismobile";
import { passwordValidation } from "@/lib/utils";
import { ArrowLeft, Eye, EyeClosed } from "lucide-react";
import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import { Link, useNavigate } from "react-router-dom";

export default function Register() {
	const isMobile = useIsMobile();
	const navigate = useNavigate();
	const [formValues, setFormValues] = useState({
		firstName: "",
		lastName: "",
		email: "",
		password: "",
		gender: "",
	});
	const [showPassword, setShowPassword] = useState(false);
	const [passwordStrength, setPasswordStrength] = useState([]);
	const { currentUser, loading, error, register } = useAuth();

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

	async function handleRegister(e) {
		e.preventDefault();
		console.log(formValues);
		if (
			!formValues.firstName ||
			!formValues.lastName ||
			!formValues.email ||
			!formValues.password
		) {
			toast.error("All fields are required");
			return;
		}

		await register(formValues);
		toast.success("Registration successful");
	}

	useEffect(() => {
		if (!loading) {
			if (currentUser) {
				navigate("/login");
				toast.success("Registration successful");
			} else if (error) {
				toast.error(error.message);
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
			<Card className="flex h-fit sm:h-[700px] w-[90%] sm:w-1/2 mx-auto rounded-lg overflow-hidden items-center">
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
								<Label htmlFor="firstName">First Name</Label>
								<Input
									id="firstName"
									type="text"
									value={formValues.firstName}
									onChange={handleFormChange}
								/>
							</div>
							<div className="space-y-2">
								<Label htmlFor="lastName">Last Name</Label>
								<Input
									id="lastName"
									type="text"
									value={formValues.lastName}
									onChange={handleFormChange}
								/>
							</div>
							<div className="space-y-2">
								<Label htmlFor="email">Email</Label>
								<Input
									id="email"
									type="email"
									value={formValues.email}
									onChange={handleFormChange}
								/>
							</div>
							<div className="space-y-2">
								<Label htmlFor="gender">Gender</Label>
								<Select
									onValueChange={(value) => {
										setFormValues({
											...formValues,
											gender: value,
										});
									}}
									defaultValue={formValues.gender}
								>
									<SelectTrigger>
										<SelectValue placeholder="Select your gender" />
									</SelectTrigger>
									<SelectContent>
										<SelectItem value="male">
											Male
										</SelectItem>
										<SelectItem value="female">
											Female
										</SelectItem>
									</SelectContent>
								</Select>
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
								disabled={loading}
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
