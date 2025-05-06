import { useLoaderData, useSearchParams } from "react-router";
import Card from "../../components/Card";
import PaginationButtons from "../../components/PageinationButtons";

const VegeList = () => {
	const { data } = useLoaderData();
	const { data: vegetables, meta } = data;
	const { total_pages, current_page } = meta;

	return (
		<>
			<div className="mt-4 grid grid-cols-4 gap-4">
				{vegetables.map((vegetable) => (
					<Card
						key={vegetable.id}
						id={vegetable.id}
						name={vegetable.attributes.name}
						description={vegetable.attributes.description}
						prices={vegetable.attributes.prices}
						image={vegetable.attributes.image_url}
					/>
				))}
			</div>
			<PaginationButtons totalPages={total_pages} currentPage={current_page}/>
		</>
	);
};

export default VegeList;
