import { getAllWatchlists } from "@/api/watchlist";
import { Button } from "@/components/ui/button";
import { Card, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";
import useAuth from "@/context/use-auth";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

export default function Watchlist() {
	const navigate = useNavigate();
	const { currentUser, loading, error } = useAuth();
	const [watchlists, setWatchlists] = useState([]);

	useEffect(() => {
		const fetchWatchlists = async () => {
			const data = await getAllWatchlists();
			setWatchlists(data);
		};

		fetchWatchlists();
	}, []);

	return (
		<div className="container mx-auto">
			<h1 className="my-4 text-2xl font-bold">All Your Watchlists</h1>
			<div>
				{loading ? (
					<Skeleton className="h-[100px] sm:h-[300px]" />
				) : error ? (
					<p>{error.message}</p>
				) : currentUser ? (
					<div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3">
						{watchlists.map((watchlist) => (
							<Card key={watchlist._id}>
								<CardHeader>
									<CardTitle>{watchlist.title}</CardTitle>
								</CardHeader>
								<CardFooter className="flex items-center justify-between">
									<span>
										Total Animes: {watchlist?.animes.length}
									</span>
									<Button
										onClick={() =>
											navigate(
												`/watchlist/${watchlist._id}`
											)
										}
									>
										View
									</Button>
								</CardFooter>
							</Card>
						))}
					</div>
				) : (
					<p>Not logged in</p>
				)}
			</div>
		</div>
	);
}
