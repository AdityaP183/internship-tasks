import { Button } from "../ui/button";
import { Skeleton } from "../ui/skeleton";
import AnimeCard from "./anime-card";

const HomeSection = ({ data, sectionTitle, viewAllLink, isContentLoading }) => {
	return (
		<div className="py-4">
			<div className="flex items-center justify-between mb-3">
				<h1 className="text-xl font-bold sm:text-2xl">
					{sectionTitle}
				</h1>
				<div>
					<Button variant="link" asChild>
						<a href={viewAllLink}>View All</a>
					</Button>
				</div>
			</div>
			{isContentLoading ? (
				<Skeleton className="h-[400px] sm:h-[200px]" />
			) : (
				<div className="grid grid-cols-2 grid-rows-1 gap-4 md:gap-8 lg:gap-16 md:grid-cols-4 lg:grid-cols-6">
					{data.map((i) => (
						<AnimeCard key={i.id} data={i} />
					))}
				</div>
			)}
		</div>
	);
};

export default HomeSection;
