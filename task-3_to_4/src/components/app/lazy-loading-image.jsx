import { cn } from "@/lib/utils";
import { LazyLoadImage } from "react-lazy-load-image-component";
import "react-lazy-load-image-component/src/effects/blur.css";

const LazyLoadingImage = ({ imgUrl, altTitle, className }) => {
	return (
		<LazyLoadImage
			width={"100%"}
			height={"100%"}
			src={imgUrl}
			effect="blur"
			alt={altTitle}
			className={cn(
				"w-full h-full object-cover object-center",
				className
			)}
		/>
	);
};

export default LazyLoadingImage;
