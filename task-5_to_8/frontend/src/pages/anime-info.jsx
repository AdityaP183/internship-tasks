import DescriptionBox from "@/components/app/info/info-description";
import InfoBanner from "@/components/app/info/info-banner";
import InfoBox from "@/components/app/info/info-box";
import useFetch from "@/hooks/use-fetch";
import useIsMobile from "@/hooks/use-Ismobile";
import { animeQueries } from "@/lib/app-data";
import { formatDate } from "@/lib/utils";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import InfoHero from "@/components/app/info/info-hero";
import MainLoader from "@/components/app/main-loader";
import { getAllWatchlists } from "@/api/watchlist";

export default function AnimeInfo() {
	const { id } = useParams();
	const isMobile = useIsMobile();
	const [watchlists, setWatchlists] = useState([]);
	const [fullDescription, setFullDescription] = useState(false);
	const variables = {
		id: parseInt(id),
		isAdult: false,
		type: "ANIME",
	};

	const {
		data: animeInfo,
		isLoading: loading,
		error,
		fetchData,
	} = useFetch();

	useEffect(() => {
		fetchData({
			query: animeQueries.animeDetails,
			variables,
		});
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, []);

	useEffect(() => {
		const fetchWatchlists = async () => {
			const data = await getAllWatchlists();
			setWatchlists(data);
		};

		fetchWatchlists();
	}, []);

	if (loading) {
		return <MainLoader />;
	}

	if (!loading && error) {
		return (
			<h4 className="text-xl text-center text-red-500 flex items-center justify-center h-[80vh] px-1">
				{error?.message ||
					"Something went wrong while fetching data from anilist"}
			</h4>
		);
	}

	return (
		<div className="relative w-full mx-auto">
			{/* Banner */}
			{!loading && !error && animeInfo && (
				<InfoBanner bannerImage={animeInfo.data.Media.bannerImage} />
			)}

			{/* Content */}
			{!loading && !error && animeInfo && (
				<div className="w-full sm:w-[70%] mx-auto -translate-y-[150px] sm:-translate-y-[100px] px-2">
					<InfoHero
						data={animeInfo.data.Media}
						watchlists={watchlists}
					/>
					<div className="grid grid-cols-2 gap-2 p-1 mx-1 rounded-lg sm:mt-12 sm:grid-cols-4 bg-secondary">
						<InfoBox
							title={"Format"}
							value={animeInfo.data.Media.format}
						/>
						<InfoBox
							title={"Status"}
							value={animeInfo.data.Media.status}
						/>
						<InfoBox
							title={"Aired On"}
							value={
								animeInfo.data.Media.endDate.year
									? formatDate(
											animeInfo.data.Media.startDate
									  ) +
									  " - " +
									  formatDate(animeInfo.data.Media.endDate)
									: formatDate(
											animeInfo.data.Media.startDate
									  ) +
									  " - " +
									  "Present"
							}
						/>
						<InfoBox
							title={"Episodes"}
							value={animeInfo.data.Media.episodes ?? "Unknown"}
						/>
						<InfoBox
							title={"Season"}
							value={
								animeInfo.data.Media.season +
								" " +
								animeInfo.data.Media.seasonYear
							}
						/>
						<InfoBox
							title={"Duration"}
							value={
								animeInfo.data.Media.duration +
								" min per episode"
							}
						/>
						<InfoBox
							title={"Source"}
							value={animeInfo.data.Media.source}
						/>
						<InfoBox
							title={"Mean Score"}
							value={animeInfo.data.Media.meanScore + "%"}
						/>
					</div>
					<div className="mx-1 my-3 rounded-lg bg-secondary/80">
						{isMobile && (
							<DescriptionBox
								text={animeInfo.data.Media.description}
								fullDescription={fullDescription}
								setFullDescription={setFullDescription}
							/>
						)}
					</div>
				</div>
			)}
		</div>
	);
}
