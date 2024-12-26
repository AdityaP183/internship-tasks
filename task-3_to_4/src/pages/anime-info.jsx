import InfoBox from "@/components/app/info-box";
import LazyLoadingImage from "@/components/app/lazy-loading-image";
import { Button } from "@/components/ui/button";
import {
	Select,
	SelectContent,
	SelectItem,
	SelectTrigger,
	SelectValue,
} from "@/components/ui/select";
import useIsMobile from "@/hooks/use-Ismobile";
import { animeInfo } from "@/lib/app-data";
import { formatDate } from "@/lib/utils";
import { Heart } from "lucide-react";
import { useState } from "react";

const DescriptionBox = ({ text, fullDescription, setFullDescription }) => {
	return (
		<div className="relative w-full p-1">
			<h4 className="block text-lg font-semibold sm:hidden">
				Description:{" "}
			</h4>
			<p
				className={`text-justify tracking-tight ${
					fullDescription
						? "h-auto"
						: "h-[200px] overflow-hidden text-muted-foreground"
				} `}
				dangerouslySetInnerHTML={{
					__html: text,
				}}
			/>
			<div
				className={`toggle-desc absolute left-0 right-0 w-full ${
					fullDescription
						? "-bottom-4"
						: "bg-secondary/40 sm:bg-background/90 -bottom-2"
				} cursor-pointer`}
				onClick={() => setFullDescription(!fullDescription)}
			>
				<h5 className="text-center text-muted-foreground">
					{fullDescription ? "read less" : "read more"}
				</h5>
			</div>
		</div>
	);
};

export default function AnimeInfo() {
	const [isLiked, setIsLiked] = useState(false);
	const [fullDescription, setFullDescription] = useState(false);
	const data = animeInfo.data.Media;
	const isMobile = useIsMobile();

	return (
		<div className="relative w-full mx-auto">
			{/* Banner */}
			<div className="relative">
				<div
					className="h-[250px] sm:h-[400px] bg-cover bg-center overflow-hidden"
					style={{ backgroundImage: `url(${data.bannerImage})` }}
				></div>
				<div className="absolute top-0 bottom-0 left-0 right-0 bg-gradient-to-b from-black/10 to-black/50 sm:to-black/90"></div>
			</div>

			{/* Content */}
			<div className="w-full sm:w-[70%] mx-auto -translate-y-[150px] sm:-translate-y-[100px]">
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
							<Select>
								<SelectTrigger className="w-full">
									<SelectValue placeholder="Add" />
								</SelectTrigger>
								<SelectContent>
									<SelectItem value="light">Light</SelectItem>
									<SelectItem value="dark">Dark</SelectItem>
									<SelectItem value="system">
										System
									</SelectItem>
								</SelectContent>
							</Select>

							<Button
								variant="secondary"
								onClick={() => setIsLiked(!isLiked)}
							>
								<Heart
									className={`[&>svg]:size-6 font-extrabold cursor-pointer ${
										isLiked
											? "fill-primary text-primary"
											: "text-text-50"
									}`}
								/>
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
				<div className="grid grid-cols-2 gap-2 p-1 mx-1 rounded-lg sm:mt-12 sm:grid-cols-4 bg-secondary">
					<InfoBox title={"Format"} value={data.format} />
					<InfoBox title={"Status"} value={data.status} />
					<InfoBox
						title={"Aired On"}
						value={
							data.endDate.year
								? formatDate(data.startDate) +
								  " - " +
								  formatDate(data.endDate)
								: formatDate(data.startDate) + " - "
						}
					/>
					<InfoBox title={"Episodes"} value={data.episodes ?? 0} />
					<InfoBox
						title={"Season"}
						value={data.season + " " + data.seasonYear}
					/>
					<InfoBox
						title={"Duration"}
						value={data.duration + " min per episode"}
					/>
					<InfoBox title={"Source"} value={data.source} />
					<InfoBox
						title={"Mean Score"}
						value={data.meanScore + "%"}
					/>
				</div>
				<div className="mx-1 my-3 rounded-lg bg-secondary/80">
					{isMobile && (
						<DescriptionBox
							text={data.description}
							fullDescription={fullDescription}
							setFullDescription={setFullDescription}
						/>
					)}
				</div>
			</div>
		</div>
	);
}
