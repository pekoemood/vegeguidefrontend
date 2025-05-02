import { useState } from "react";
import { Link, useLoaderData } from "react-router";
import ShoppingCard from "../../components/ShoppingCard";

const ShoppingList = () => {
	const { shoppingLists } = useLoaderData();
	const [lists, setLists] = useState(shoppingLists);
	console.log(lists);

	const toggleItemChecked = (listId, itemName) => {
		const updatedLists = lists.map((list) => {
			if (list.id !== listId) return list;

			const updatedItems = list.attributes.shopping_items.map((item) => {
				if (item.name !== itemName) return item;
				return { ...item, checked: !item.checked };
			});

			return {
				...list,
				attributes: {
					...list.attributes,
					shopping_items: updatedItems,
				},
			};
		});

		setLists(updatedLists);
	};

	return (
		<>
			<main className="container mx-auto px-4 py-8">
				<div className="flex items-center mb-6">
					<h1 className="text-2xl font-bold text-green-700">買い物リスト</h1>
				</div>

				<div className="flex justify-between items-center mb-6">
					<p className="text-gray-600">
						複数の買い物リストを作成・管理できます
					</p>
					<button className="btn text-white bg-green-600 hover:bg-green-700">
						新しいリスト
					</button>
				</div>

				<div className="grid grid-cols-3 gap-3">
					{lists.map((list) => (
						<ShoppingCard
							key={list.id}
							id={list.id}
							title={list.attributes.name}
							time={list.attributes.created_at_jst}
							items={list.attributes.shopping_items}
						/>
					))}
				</div>
			</main>
		</>
	);
};

export default ShoppingList;
