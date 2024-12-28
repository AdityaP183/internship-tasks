export default function InfoBanner({ bannerImage }) {
	return (
		<div className="relative">
			<div
				className="h-[250px] sm:h-[400px] bg-cover bg-center overflow-hidden"
				style={{
					backgroundImage: `url(${bannerImage})`,
				}}
			></div>
			<div className="absolute top-0 bottom-0 left-0 right-0 bg-gradient-to-b from-black/10 to-black/90"></div>
		</div>
	);
}
