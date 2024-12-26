import HomeSection from "@/components/app/home-section";
import { animeData } from "@/lib/app-data";
import { useEffect, useState } from "react";

export default function Home() {
	const [loading, setLoading] = useState(true);

	useEffect(() => {
		setTimeout(() => {
			setLoading(false);
		}, 2000);
	}, []);

	return (
		<div className="container mx-auto">
			{/* Trending Anime */}
			<HomeSection
				data={animeData.data.trending.media}
				sectionTitle="Trending Anime"
				viewAllLink="/trending"
				isContentLoading={loading}
			/>

			{/* Upcoming Anime */}
			<HomeSection
				data={animeData.data.season.media}
				sectionTitle="Popular This Season"
				viewAllLink="/popular/current"
				isContentLoading={loading}
			/>

			{/* Upcoming Anime */}
			<HomeSection
				data={animeData.data.nextSeason.media}
				sectionTitle="Upcoming Anime"
				viewAllLink="/upcoming"
				isContentLoading={loading}
			/>

			{/* All Time Popular */}
			<HomeSection
				data={animeData.data.popular.media}
				sectionTitle="All Time Popular"
				viewAllLink="/all-time-popular"
				isContentLoading={loading}
			/>
		</div>
	);
}
