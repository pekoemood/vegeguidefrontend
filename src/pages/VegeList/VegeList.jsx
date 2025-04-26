import { useLoaderData } from "react-router";
import Card from "../../components/Card";

const VegeList = () => {
	const { vegetables } = useLoaderData();
	const { data } = vegetables;
	console.log(data);

	return (
		<>
			<div className="mt-4 grid grid-cols-4 gap-4">
				{data.map((vegetable) => (
					<Card
						key={vegetable.id}
						id={vegetable.id}
						name={vegetable.attributes.name}
						description={vegetable.attributes.description}
						// prices={vegetable.attributes.prices}
						image={vegetable.attributes.image_url}
					/>
				))}
			</div>
		</>
	);
};

export default VegeList;
