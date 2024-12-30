import HomeSection from "@/components/app/home-section";
import MainLoader from "@/components/app/main-loader";
import useAuth from "@/context/use-auth";
import useFetch from "@/hooks/use-fetch";
import { animeQueries } from "@/lib/app-data";
import { animeVariables } from "@/lib/utils";
import { useEffect } from "react";

export default function Home() {
	// const {
	// 	data: animeData,
	// 	isLoading: loading,
	// 	error,
	// 	fetchData,
	// } = useFetch();

	// useEffect(() => {
	// 	fetchData({
	// 		query: animeQueries.homePage,
	// 		variables: animeVariables(),
	// 	});
	// 	// eslint-disable-next-line react-hooks/exhaustive-deps
	// }, []);
	const [animeData, error, loading] = [null, null, false];
	const { currentUser } = useAuth();

	console.log(currentUser);

	return (
		<div className="container px-2 mx-auto">
			{!loading && error && (
				<h4 className="text-xl text-center text-red-500">
					{error?.message ||
						"Something went wrong while fetching data from anilist"}
				</h4>
			)}

			{loading && <MainLoader />}

			{!loading && !error && animeData && animeData.data && (
				<>
					{/* Trending Anime */}
					<HomeSection
						data={animeData.data.trending?.media || []}
						sectionTitle="Trending Anime"
					/>

					{/* Upcoming Anime */}
					<HomeSection
						data={animeData.data.season?.media || []}
						sectionTitle="Popular This Season"
					/>

					{/* Upcoming Anime */}
					<HomeSection
						data={animeData.data.nextSeason?.media || []}
						sectionTitle="Upcoming Anime"
					/>

					{/* All Time Popular */}
					<HomeSection
						data={animeData.data.popular?.media || []}
						sectionTitle="All Time Popular"
					/>
				</>
			)}
		</div>
	);
}
