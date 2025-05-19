import axios from "axios";
import { ShoppingCart, Trash2, Plus } from "lucide-react";
import { useState } from "react";
import { useLoaderData, useNavigate } from "react-router";

const ShoppingListDetail = () => {
	const { shoppingList } = useLoaderData();
	const { attributes } = shoppingList;
	const { shopping_items } = attributes;
	const [items, setItems] = useState(shopping_items);
	const check = items.filter((item) => item.checked === true);
	const navigate = useNavigate();
	const [selectedCategory, setSelectedCategory] = useState(null);
	let filteredItems = items;
	console.log(items);



	if (selectedCategory) {
		filteredItems = filteredItems.filter((item) => item.category === selectedCategory)
	}

	const filteredGroupedItems = filteredItems.reduce((acc, item) => {
		if (!acc[item.category]) {
			acc[item.category] = []
		}
		acc[item.category].push(item)
		return acc
	}, {})

	Object.keys(filteredGroupedItems).forEach((category) => {
		filteredGroupedItems[category].sort((a, b) => a.checked - b.checked)
	})

	const groupedItems = items.reduce((acc, item) => {
		if (!acc[item.category]) {
			acc[item.category] = [];
		}
		acc[item.category].push(item);
		return acc;
	}, {});

	const preferredOrder = [
		"野菜",
		"肉類",
		"魚介類",
		"卵・乳製品",
		"豆・豆製品",
		"穀類・パン ",
		"調味料",
		"加工食品",
		"その他",
	];

	const categories = Object.keys(groupedItems).sort((a, b) => {
		return preferredOrder.indexOf(a) - preferredOrder.indexOf(b);
	});


	const handleClick = (id) => {
		setItems((prev) =>
			prev.map((item) => {
				return item.id === id ? { ...item, checked: !item.checked } : item;
			}),
		);
	};

	const handleSave = async (shoppingList, items) => {
		try {
			await axios.patch(
				`${import.meta.env.VITE_RAILS_API}/shopping_lists/${shoppingList.id}`,
				{
					items,
				},
				{ withCredentials: true },
			);
			navigate("/shoppinglist");
		} catch (error) {
			console.log(error);
		}
	};

	return (
		<div className="container max-w-screen-md mx-auto px-4 py-8">
			<div className="mb-6">
				<button
					onClick={() => navigate("/shoppinglist")}
					className="btn btn-outline btn-sm"
				>
					戻る
				</button>
			</div>

			<div className="px-4 pb-2">
				<div className="flex flex-col space-y-2">
					<div className="flex space-x-2">
						<button className={`badge ${selectedCategory === null && 'badge-neutral'}`} onClick={() => setSelectedCategory(null)}>すべてのカテゴリ</button>
						{categories.map((category) => (
							<button key={category} className={`badge ${selectedCategory === category && 'badge-neutral'}`} onClick={() => setSelectedCategory(category)}>{category}</button>
						))}
					</div>
				</div>
			</div>


			<div className="flex flex-col gap-6">
				<div className="shadow-md rounded-xl p-4">
					<div className="flex justify-between items-center mb-2">
						<h2 className="flex items-center text-2xl ">
							<ShoppingCart className="mr-2 h-5 w-5" />
							<span>{attributes.name}</span>
						</h2>
						<p
							className={`transition-opacity duration-500 ease-in ${items.length === check.length ? "opacity-100" : "opacity-0"}`}
						>
							すべての買い物が完了しました！
						</p>
						<span
							className={`badge ${check.length === items.length ? "badge-success" : "badge-outline badge-primary"}`}
						>
							{check.length}/{shoppingList.attributes.shopping_items.length}{" "}
							完了
						</span>
					</div>

					<p className="text-sm text-neutral-500">
						作成日： {shoppingList.attributes.created_at_jst}
					</p>

					<div className="mt-6">
						<div className="w-full bg-gray-200 rounded-full h-3 overflow-hidden">
							<div
								className="bg-primary h-full transition-all duration-500 ease-in-out"
								style={{ width: `${(check.length / items.length) * 100}%` }}
							/>
						</div>
					</div>

					<div className="mt-6">
						{Object.entries(filteredGroupedItems).map(([category, categoryItems]) => (
							<div key={category}>
								<div className="flex items-center my-2">
									<h3 className="text-sm text-neutral-500">{category}</h3>
									<div className="flex-1 ml-2 h-0.5 bg-base-300" />
								</div>
								<ul className="space-y-2">
									{categoryItems.map((item) => (
										<li key={item.id}>
											<div className="flex items-center justify-between space-x-4 py-4 px-4 rounded-lg border border-base-300">
												<div className="flex items-center space-x-4">
													<input
														type="checkbox"
														className="checkbox"
														checked={item.checked}
														onChange={() => handleClick(item.id)}
													/>
													<div className="flex flex-col">
														<label htmlFor="">{item.name}</label>
														<span className="text-neutral-500 text-sm">
															レシピ: {item.fromRecipe}
														</span>
													</div>
												</div>
												<div className="flex items-center space-x-4">
													<span>{item.display_amount}</span>
													<Trash2 className="hover:text-error" size={15} />
												</div>
											</div>
										</li>
									))}
								</ul>
							</div>
						))}
					</div>
					<div className="mt-6 flex justify-end">
						<button
							onClick={() => handleSave(shoppingList, items)}
							className="btn"
						>
							リストの内容を保存する
						</button>
					</div>

					<div className="sticky bottom-4 flex justify-center">
						<button className="btn btn-primary">
							<Plus size={15} />
							アイテムを追加
						</button>
					</div>
				</div>
			</div>
		</div>
	);
};

export default ShoppingListDetail;
