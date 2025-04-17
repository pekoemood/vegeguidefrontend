import { useLoaderData } from "react-router";
import Card from "../../components/Card";

const VegeList = () => {
	const { vegetables } = useLoaderData();
	const { data, included } = vegetables;
	console.log(data, included);

	return (
		<>
			<div className="mt-4 grid grid-cols-4 gap-4">
				{data.map((vegetable) => {
					// 各野菜とリレーションのあるPriceテーブルのIDを取得
					const priceRefs = vegetable.relationships.prices.data;

					const relatedPrices = priceRefs
						.map((ref) => {
							return included.find(
								(item) => item.type === "price" && item.id === ref.id,
							);
						})
						.filter(Boolean);

					return (
						<Card
							key={vegetable.id}
							name={vegetable.attributes.name}
							prices={relatedPrices}
							image={vegetable.attributes.image_url}
						/>
					);
				})}
			</div>
		</>
	);
};

export default VegeList;
