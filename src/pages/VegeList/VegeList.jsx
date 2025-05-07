import { useLoaderData, useSearchParams } from "react-router";
import Card from "../../components/Card";
import PaginationButtons from "../../components/PageinationButtons";

const VegeList = () => {
	const { data } = useLoaderData();
	const { data: vegetables, meta } = data;
	const { total_pages, current_page } = meta;
	console.log(vegetables);

	return (
		<>
			<div className="m-8 grid grid-cols-4 gap-8">
				{vegetables.map((vegetable) => (
					<Card
						key={vegetable.id}
						id={vegetable.id}
						name={vegetable.attributes.name}
						description={vegetable.attributes.description}
						prices={vegetable.attributes.prices}
						image={vegetable.attributes.image_url}
						season={vegetable.attributes.seasons[0]?.in_season}
					/>
				))}
			</div>
			<PaginationButtons totalPages={total_pages} currentPage={current_page} />
		</>
	);
};

export default VegeList;
