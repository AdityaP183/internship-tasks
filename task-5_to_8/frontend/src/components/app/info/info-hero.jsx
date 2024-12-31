import LazyLoadingImage from "../lazy-loading-image";
import {
	Select,
	SelectContent,
	SelectItem,
	SelectTrigger,
	SelectValue,
} from "@/components/ui/select";
import { Button } from "@/components/ui/button";
import { ListCheck, Plus } from "lucide-react";
import { useEffect, useState } from "react";
import DescriptionBox from "./info-description";
import useIsMobile from "@/hooks/use-isMobile";
import { addToWatchlist } from "@/api/watchlist";
import toast from "react-hot-toast";

export default function InfoHero({ data, watchlists }) {
	const [selectedWatchlist, setSelectedWatchlist] = useState("");
	const [alreadyInWatchlist, setAlreadyInWatchlist] = useState(false);
	const [fullDescription, setFullDescription] = useState(false);
	const isMobile = useIsMobile();

	// Check if the anime is already in a watchlist
	useEffect(() => {
		const existingWatchlist = watchlists.find((watchlist) =>
			watchlist.animes.includes(data.id)
		);
		if (existingWatchlist) {
			setSelectedWatchlist(existingWatchlist.title);
			setAlreadyInWatchlist(true);
		} else {
			setSelectedWatchlist("");
			setAlreadyInWatchlist(false);
		}
	}, [data.id, watchlists]);

	const listOptions = watchlists.map((watchlist) => watchlist.title);

	const handleAddToWatchlist = async () => {
		if (alreadyInWatchlist) {
			return;
		}

		try {
			const selectedWatchlistId = watchlists.find(
				(watchlist) =>
					watchlist.title.toLowerCase() === selectedWatchlist
			)._id;
			const response = await addToWatchlist(selectedWatchlistId, {
				id: data.id,
			});
			toast.success(response.message);
			setAlreadyInWatchlist(true);
		} catch (error) {
			toast.error(error.message);
			console.log(error);
		}
	};

	return (
		<div className="flex flex-col items-center w-full gap-4 sm:flex-row sm:items-start">
			<div className="w-[180px] md:w-[300px]">
				<div className="w-full overflow-hidden rounded-lg shadow-2xl">
					<LazyLoadingImage
						imgUrl={data.coverImage.extraLarge}
						altTitle={data.title.english}
						className={"rounded-lg"}
					/>
				</div>
				<div className="relative flex items-center justify-between w-full gap-3">
					<Select
						defaultValue={selectedWatchlist}
						onValueChange={setSelectedWatchlist}
						disabled={alreadyInWatchlist}
					>
						<SelectTrigger className="w-full">
							<SelectValue
								placeholder={
									alreadyInWatchlist
										? selectedWatchlist
										: "Add to watchlist"
								}
							/>
						</SelectTrigger>
						<SelectContent>
							{listOptions && listOptions.length > 0 ? (
								listOptions.map((option) => (
									<SelectItem
										key={option}
										value={option.toLowerCase()}
									>
										{option}
									</SelectItem>
								))
							) : (
								<div className="text-sm text-center text-muted-foreground">
									No watchlists
								</div>
							)}
						</SelectContent>
					</Select>

					<Button
						variant="secondary"
						disabled={
							selectedWatchlist === "" || alreadyInWatchlist
						}
						onClick={handleAddToWatchlist}
					>
						{alreadyInWatchlist ? (
							<ListCheck className="[&>svg]:size-6 font-extrabold cursor-pointer" />
						) : (
							<Plus className="[&>svg]:size-6 font-extrabold cursor-pointer" />
						)}
					</Button>
				</div>
			</div>
			<div className="mt-2 md:mt-[80px] w-full p-2">
				<h4 className="text-2xl font-bold sm:text-3xl">
					{data.title.english}
				</h4>
				<div className="flex flex-wrap gap-2 my-3">
					{data.genres.map((genre) => (
						<div
							key={genre}
							className="inline-block px-2 py-1 text-xs rounded-full bg-primary text-primary-foreground"
						>
							{genre}
						</div>
					))}
				</div>
				{!isMobile && (
					<DescriptionBox
						text={data.description}
						fullDescription={fullDescription}
						setFullDescription={setFullDescription}
					/>
				)}
			</div>
		</div>
	);
}
