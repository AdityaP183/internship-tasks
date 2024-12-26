import { Link } from "react-router-dom";
import LazyLoadingImage from "./lazy-loading-image";

export default function AnimeCard({ data }) {
	return (
		<div className="flex flex-col w-full cursor-pointer">
			<Link to={`/anime/${data.id}`}>
				<div className="overflow-hidden rounded-lg h-[265px]">
					<LazyLoadingImage
						imgUrl={data.coverImage.large}
						altTitle={data.title}
					/>
				</div>
			</Link>
			<Link to={`/anime/${data.id}`}>
				<h2 className="py-1 text-xs font-medium sm:text-sm">
					{data.title.userPreferred}
				</h2>
			</Link>
		</div>
	);
}
