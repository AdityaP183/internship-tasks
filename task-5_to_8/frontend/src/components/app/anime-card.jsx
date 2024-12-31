import { Link, useNavigate } from "react-router-dom";
import LazyLoadingImage from "./lazy-loading-image";
import { Trash } from "lucide-react";

export default function AnimeCard({
	data,
	isWatchlist = false,
	handleRemoveFromWatchlist,
}) {
	const navigate = useNavigate();
	return (
		<div className="flex flex-col w-full cursor-pointer">
			<div
				className="overflow-hidden rounded-lg h-[265px] relative"
				onClick={() => {
					if (!isWatchlist) {
						navigate(`/anime/${data.id}`);
					}
				}}
			>
				<LazyLoadingImage
					imgUrl={data.coverImage.large}
					altTitle={data.title.userPreferred}
				/>
				{isWatchlist && (
					<div
						className="absolute flex items-center justify-center w-8 h-8 rounded-full bottom-1 right-1 bg-destructive"
						onClick={handleRemoveFromWatchlist}
					>
						<Trash className="w-4 h-4 text-white" />
					</div>
				)}
			</div>
			<Link to={`/anime/${data.id}`}>
				<h2 className="py-1 text-xs font-medium sm:text-sm">
					{data.title.userPreferred}
				</h2>
			</Link>
		</div>
	);
}
