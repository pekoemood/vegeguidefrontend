import { useState } from "react";
import { Link, useLoaderData } from "react-router";
import ShoppingCard from "../../components/ShoppingCard";

const ShoppingList = () => {
	const { shoppingLists } = useLoaderData();
	const [lists, setLists] = useState(shoppingLists);
	console.log(lists);

	return (
		<>
			<main className="container mx-auto px-4 py-8">
				<div className="flex items-center mb-6">
					<h1 className="text-2xl font-bold">買い物リスト</h1>
				</div>

				<div className="flex justify-between items-center mb-6">
					<p className="text-neutral-500">
						複数の買い物リストを作成・管理できます
					</p>
					{/* <button className="btn btn-outline">新しいリスト</button> */}
				</div>

				<div className="grid grid-cols-4 gap-4">
					{lists.map((list) => (
						<ShoppingCard
							key={list.id}
							id={list.id}
							title={list.attributes.name}
							time={list.attributes.created_at_jst}
							items={list.attributes.shopping_items}
							setLists={setLists}
						/>
					))}
				</div>
			</main>
		</>
	);
};

export default ShoppingList;
