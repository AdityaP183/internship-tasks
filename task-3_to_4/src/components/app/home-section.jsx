import React from "react";
import AnimeCard from "./anime-card";

const HomeSection = ({ data, sectionTitle }) => {
	return (
		<div className="py-4">
			<div className="flex items-center mb-3">
				<h1 className="text-xl font-bold sm:text-2xl">
					{sectionTitle}
				</h1>
			</div>

			<div className="grid grid-cols-2 grid-rows-1 gap-4 md:gap-8 lg:gap-16 md:grid-cols-4 lg:grid-cols-6">
				{data.length > 0 ? (
					data.map((i) => <AnimeCard key={i.id} data={i} />)
				) : (
					<div className="col-span-2 md:col-span-4 lg:col-span-6">
						No data
					</div>
				)}
			</div>
		</div>
	);
};

export default React.memo(HomeSection);
