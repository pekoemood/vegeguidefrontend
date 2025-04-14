import { useLoaderData } from "react-router";
import Card from "../../components/Card";

const VegeList = () => {
	const { vegetables } = useLoaderData();
	console.log(vegetables);
	return (
		<>
			<div className="mt-8 grid grid-cols-4 gap-4">
				{vegetables.data.map((list) => (
					<Card key={list.attributes.id} name={list.attributes.name} />
				))}
			</div>
		</>
	);
};

export default VegeList;
