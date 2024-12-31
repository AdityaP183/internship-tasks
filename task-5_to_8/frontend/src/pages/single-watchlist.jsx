import {
	getWatchlist,
	removeFromWatchlist,
	updateWatchlist,
} from "@/api/watchlist";
import AnimeCard from "@/components/app/anime-card";
import { Button } from "@/components/ui/button";
import { Skeleton } from "@/components/ui/skeleton";
import {
	Dialog,
	DialogContent,
	DialogDescription,
	DialogFooter,
	DialogHeader,
	DialogTitle,
} from "@/components/ui/dialog";
import useFetch from "@/hooks/use-fetch";
import { watchlistQueryBuilder } from "@/lib/utils";
import { Pencil } from "lucide-react";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import toast from "react-hot-toast";

export default function SingleWatchlist() {
	const { id } = useParams();
	const [watchlist, setWatchlist] = useState(null);
	const [isEditing, setIsEditing] = useState(false);
	const [title, setTitle] = useState("");
	const { data, isLoading, error, fetchData } = useFetch();

	useEffect(() => {
		if (watchlist && watchlist.animes.length > 0) {
			const variables = watchlist.animes;
			const query = watchlistQueryBuilder(variables);
			fetchData({ query });
		}
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [watchlist]);

	if (!isLoading && error) {
		console.log(error);
	}

	useEffect(() => {
		const fetchWatchlists = async () => {
			const data = await getWatchlist(id);
			setWatchlist(data);
		};

		fetchWatchlists();
	}, [id]);

	const handleWatchlistUpdate = async () => {
		if (title.length === 0) {
			setIsEditing(false);
			return;
		}

		try {
			const data = await updateWatchlist(id, { title });

			toast.success(data.message);
			setWatchlist({ ...watchlist, title });
		} catch (error) {
			toast.error(error.message);
			console.log(error);
		} finally {
			setIsEditing(false);
		}
	};

	const handleRemoveFromWatchlist = async (id, animeId) => {
		try {
			const data = await removeFromWatchlist(id, { id: animeId });
			setWatchlist({
				...watchlist,
				animes: watchlist.animes.filter((a) => a !== animeId),
			});
			toast.success(data.message);
		} catch (error) {
			toast.error(error.message);
			console.log(error);
		}
	};

	return (
		<div className="container mx-auto">
			{!watchlist ? (
				<Skeleton className="h-[105px] m-2" />
			) : (
				<div className="my-4 space-y-4">
					<h1 className="text-3xl font-bold">{watchlist.title}</h1>
					<Button
						size="sm"
						variant="secondary"
						onClick={() => setIsEditing(true)}
					>
						<Pencil /> Edit
					</Button>
				</div>
			)}

			<hr />

			<div>
				{isLoading ? (
					<Skeleton className="h-[100px] sm:h-[300px]" />
				) : !isLoading && error ? (
					<p>{error.message}</p>
				) : (
					<div className="py-4">
						{watchlist && watchlist.animes.length > 0 ? (
							<div className="grid grid-cols-2 grid-rows-1 gap-4 md:gap-8 lg:gap-16 md:grid-cols-4 lg:grid-cols-6">
								{data && data.data
									? Object.values(data.data).map((anime) => (
											<AnimeCard
												key={anime.id}
												data={anime}
												isWatchlist
												handleRemoveFromWatchlist={() =>
													handleRemoveFromWatchlist(
														watchlist._id,
														anime.id
													)
												}
											/>
									  ))
									: null}
							</div>
						) : (
							<div className="col-span-2 md:col-span-4 lg:col-span-6">
								No anime in watchlist
							</div>
						)}
					</div>
				)}
			</div>

			{watchlist && (
				<Dialog open={isEditing} onOpenChange={setIsEditing}>
					<DialogContent>
						<DialogHeader>
							<DialogTitle>Enter new title</DialogTitle>
							<DialogDescription>
								Make sure to save the changes
							</DialogDescription>
						</DialogHeader>
						<div className="my-6 space-y-4">
							<Label htmlFor="title">Title</Label>
							<Input
								id="title"
								value={title}
								onChange={(e) => setTitle(e.target.value)}
							/>
						</div>
						<DialogFooter>
							<Button
								variant="secondary"
								onClick={() => setIsEditing(false)}
							>
								Cancel
							</Button>
							<Button onClick={handleWatchlistUpdate}>
								Save
							</Button>
						</DialogFooter>
					</DialogContent>
				</Dialog>
			)}
		</div>
	);
}
