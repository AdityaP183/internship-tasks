import {
	createWatchlist,
	deleteWatchlist,
	getAllWatchlists,
} from "@/api/watchlist";
import { Button } from "@/components/ui/button";
import { Card, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import {
	Dialog,
	DialogContent,
	DialogDescription,
	DialogFooter,
	DialogHeader,
	DialogTitle,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Skeleton } from "@/components/ui/skeleton";
import useAuth from "@/context/use-auth";
import { Eye, Trash2 } from "lucide-react";
import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";

export default function Watchlist() {
	const navigate = useNavigate();
	const [watchlists, setWatchlists] = useState([]);
	const [isAddingWatchlist, setIsAddingWatchlist] = useState(false);
	const [title, setTitle] = useState("");
	const { currentUser, loading, error } = useAuth();

	useEffect(() => {
		const fetchWatchlists = async () => {
			try {
				const data = await getAllWatchlists();
				setWatchlists(data);
			} catch (error) {
				toast.error("Failed to fetch watchlists");
				console.error(error);
			}
		};

		fetchWatchlists();
	}, []);

	const handleWatchlistCreate = async () => {
		if (!title.trim()) {
			toast.error("Title cannot be empty");
			return;
		}
		try {
			const data = await createWatchlist({ title });
			toast.success(data.message);
			setWatchlists([...watchlists, data.data]);
			setIsAddingWatchlist(false);
			setTitle("");
		} catch (error) {
			toast.error(error.message);
			console.log(error);
		}
	};

	const handleWatchlistDelete = async (id) => {
		try {
			const data = await deleteWatchlist(id);
			toast.success(data.message);
			setWatchlists(
				watchlists.filter((watchlist) => watchlist._id !== id)
			);
			setIsAddingWatchlist(false);
		} catch (error) {
			toast.error(error.message);
			console.log(error);
		}
	};

	return (
		<div className="container mx-auto">
			<div className="flex items-center justify-between my-4">
				<h1 className="text-2xl font-bold">All Your Watchlists</h1>
				<Button onClick={() => setIsAddingWatchlist(true)}>New</Button>
			</div>

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
										Total Animes:{" "}
										{watchlist?.animes?.length || 0}
									</span>

									<div className="flex items-center gap-2">
										<Button
											size="icon"
											variant="destructive"
											onClick={() =>
												handleWatchlistDelete(
													watchlist._id
												)
											}
										>
											<Trash2 />
										</Button>
										<Button
											size="icon"
											onClick={() =>
												navigate(
													`/watchlist/${watchlist._id}`
												)
											}
										>
											<Eye />
										</Button>
									</div>
								</CardFooter>
							</Card>
						))}
					</div>
				) : (
					<p>Not logged in</p>
				)}
			</div>

			<Dialog
				open={isAddingWatchlist}
				onOpenChange={setIsAddingWatchlist}
			>
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
							onClick={() => setIsAddingWatchlist(false)}
						>
							Cancel
						</Button>
						<Button onClick={handleWatchlistCreate}>Save</Button>
					</DialogFooter>
				</DialogContent>
			</Dialog>
		</div>
	);
}
