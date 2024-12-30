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

export default DescriptionBox;
