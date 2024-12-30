import { listOptions } from "@/lib/utils";
import LazyLoadingImage from "../lazy-loading-image";
import {
	Select,
	SelectContent,
	SelectItem,
	SelectTrigger,
	SelectValue,
} from "@/components/ui/select";
import { Button } from "@/components/ui/button";
import { Heart } from "lucide-react";
import { useState } from "react";
import DescriptionBox from "./info-description";
import useIsMobile from "@/hooks/use-isMobile";

export default function InfoHero({ data }) {
	const [isLiked, setIsLiked] = useState(false);
	const [fullDescription, setFullDescription] = useState(false);
	const isMobile = useIsMobile();

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
					<Select>
						<SelectTrigger className="w-full">
							<SelectValue placeholder="Add" />
						</SelectTrigger>
						<SelectContent>
							{listOptions.map((option) => (
								<SelectItem
									key={option}
									value={option.toLowerCase()}
								>
									{option}
								</SelectItem>
							))}
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
	);
}
