import { Button } from "@/components/ui/button";
import { ArrowLeft } from "lucide-react";
import { Link } from "react-router-dom";

export default function NotFound() {
	return (
		<div className="flex items-center justify-center h-[80vh] sm:h-screen">
			<div className="w-full rounded-lg sm:w-1/2 h-fit">
				<img src="/404-error.svg" alt="" className="w-1/3 mx-auto" />
				<div className="flex flex-col items-center">
					<h1 className="mt-2 text-2xl font-bold">Page Not Found</h1>
					<p className="my-3 text-lg text-center text-muted-foreground">
						The page you are looking for does not exist.
					</p>
					<Button asChild>
						<Link to="/">
							<ArrowLeft className="w-4 h-4 mr-2" /> Go Home
						</Link>
					</Button>
				</div>
			</div>
		</div>
	);
}
