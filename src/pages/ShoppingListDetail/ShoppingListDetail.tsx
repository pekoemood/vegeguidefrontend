import { Plus, Refrigerator, ShoppingCart, Trash2 } from "lucide-react";
import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import { useLoaderData, useNavigate } from "react-router";
import AddItemForm from "../../components/AddItemForm";
import Meta from "../../components/Meta";
import useModal from "../../hooks/useModal";
import type {
	ShoppingItem,
	ShoppingListAddItem,
	ShoppingListEntry,
} from "../../types/apiResponse";
import { api } from "../../utils/axios";

const ShoppingListDetail = () => {
	const shoppingList = useLoaderData<ShoppingListEntry>();
	const [items, setItems] = useState(shoppingList.attributes.shopping_items);
	const navigate = useNavigate();
	const check = items.filter((item) => item.checked === true);
	const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
	const { Modal, openModal, closeModal } = useModal();
	const [changedItems, setChangedItems] = useState(new Set<number>());
	const [loadingItems, setLoadingItems] = useState<number[]>([]);
	let filteredItems = items;
	if (selectedCategory) {
		filteredItems = filteredItems.filter(
			(item) => item.category === selectedCategory,
		);
	}

	const filteredGroupedItems = filteredItems.reduce((acc, item) => {
		if (!acc[item.category]) {
			acc[item.category] = [];
		}
		acc[item.category].push(item);
		return acc;
	}, {});

	Object.keys(filteredGroupedItems).forEach((category) => {
		filteredGroupedItems[category].sort((a, b) => a.checked - b.checked);
	});

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

	const handleClick = (item: ShoppingItem) => {
		setItems((prev) =>
			prev.map((preItem) => {
				return preItem.id === item.id
					? { ...preItem, checked: !item.checked }
					: preItem;
			}),
		);
		setChangedItems((prev) => new Set(prev).add(item.item_id));
		setLoadingItems((prev) => [...prev, item.id]);
	};

	useEffect(() => {
		const timer = setTimeout(async () => {
			if (changedItems.size === 0) return;

			try {
				const updates = [...changedItems].map((id) => {
					const item = items.find((i) => i.item_id === id);
					return { id: item.item_id, checked: item.checked };
				});
				await api.patch(
					`/shopping_lists/${shoppingList.id}/shopping_list_items/batch_update`,
					{ updates },
				);

				setChangedItems(new Set());
				setLoadingItems([]);
				toast.success("保存が完了しました");
			} catch (error) {
				console.error(error);
				setLoadingItems([]);
				toast.error("保存に失敗しました");
			}
		}, 3000);

		return () => clearTimeout(timer);
	}, [changedItems]);

	const handleAddItem = async ({
		name,
		display_amount,
		category,
	}: ShoppingListAddItem): Promise<void> => {
		try {
			const response = await api.post<{ item: ShoppingItem }>(
				`/shopping_lists/${shoppingList.id}/shopping_list_items`,
				{
					name,
					display_amount,
					category,
				},
			);
			setItems((prev) => [...prev, { ...response.data.item }]);
			toast.success("食材を追加しました");
		} catch (error) {
			console.error(error);
			toast.error("食材の追加に失敗しました");
		}
	};

	const handleDeleteItem = async (id: number) => {
		try {
			await api.delete(`/shopping_list_items/${id}`);
			setItems((prev) => prev.filter((item) => item.item_id !== id));
			toast.success("食材を削除しました");
		} catch (error) {
			console.error(error);
			toast.error("食材の削除に失敗しました");
		}
	};

	const handleAddFridge = async (item: ShoppingItem | ShoppingItem[]) => {
		const items = Array.isArray(item) ? item : [item];
		try {
			await api.post("/fridge_items", {
				fridge: items.map((item) => ({
					name: item.name,
					category: item.category,
					display_amount: item.display_amount,
					amount: item.amount,
					unit: item.unit,
				})),
			});
			toast.success("冷蔵庫に追加しました");
		} catch (err) {
			console.error(err);
			toast.error("冷蔵庫の追加に失敗しました");
		}
	};

	return (
		<>
			<Meta
				title="買い物リスト詳細"
				description="必要な食材をまとめて管理。買い忘れを防げて、効率的な買い物ができます！"
			/>
			<div className="container max-w-screen-md mx-auto px-4 py-8">
				<div className="mb-6 flex flex-col md:flex-row gap-2 md:justify-between">
					<button
						type="button"
						onClick={() => navigate("/shoppinglist")}
						className="btn btn-outline"
					>
						戻る
					</button>
					<div className="flex flex-col md:flex-row gap-2">
						<button type="button" className="btn btn-outline" onClick={openModal}>
							食材を追加する
						</button>
						<button
							type="button"
							className="btn btn-outline"
							onClick={() => handleAddFridge(items)}
						>
							全ての食材を冷蔵庫に追加する
						</button>
					</div>
				</div>

				<div className="px-4 pb-2">
					<div className="flex flex-col space-y-2">
						<div className="flex flex-wrap gap-2">
							<button
								type="button"
								className={`text-xs  md:text-base badge ${selectedCategory === null && "badge-neutral"}`}
								onClick={() => setSelectedCategory(null)}
							>
								すべてのカテゴリ
							</button>
							{categories.map((category) => (
								<button
									key={category}
									type="button"
									className={`text-xs md:text-base badge ${selectedCategory === category && "badge-neutral"}`}
									onClick={() => setSelectedCategory(category)}
								>
									{category}
								</button>
							))}
						</div>
					</div>
				</div>

				<div className="flex flex-col gap-6">
					<div className="shadow-md rounded-xl p-4">
						<div className="flex justify-between items-center mb-2">
							<h2 className="flex items-center text-2xl ">
								<ShoppingCart className="mr-2 h-5 w-5" />
								<span>{shoppingList.attributes.name}</span>
							</h2>
							<span
								className={`badge ${check.length === items.length ? "badge-success" : "badge-outline badge-primary"}`}
							>
								{check.length}/{items.length} 完了
							</span>
						</div>

						<p className="text-sm text-neutral-500">
							作成日： {shoppingList.attributes.created_at_jst}
						</p>

						<div className="mt-4">
							<p
								className={`text-secondary transition-opacity duration-500 ease-in ${items.length === check.length ? "opacity-100" : "opacity-0"}`}
							>
								すべての買い物が完了しました！
							</p>
							<div className="w-full bg-gray-200 rounded-full h-3 overflow-hidden">
								<div
									className="bg-primary h-full transition-all duration-500 ease-in-out"
									style={{ width: `${(check.length / items.length) * 100}%` }}
								/>
							</div>
						</div>

						<div className="mt-6">
							{Object.entries(filteredGroupedItems).map(
								([category, categoryItems]) => (
									<div key={category}>
										<div className="flex items-center my-2">
											<h3 className="text-sm text-neutral-500">{category}</h3>
											<div className="flex-1 ml-2 h-0.5 bg-base-300" />
										</div>
										<ul className="space-y-2">
											{categoryItems.map((item) => (
												<li key={item.id}>
													<div className="flex flex-col md:flex-row md:items-center justify-between space-x-4 py-4 px-4 rounded-lg border border-base-300">
														<div className="flex items-center space-x-4">
															<input
																type="checkbox"
																className="checkbox"
																checked={!!item.checked}
																onChange={() => handleClick(item)}
																disabled={loadingItems.includes(item.id)}
															/>
															<div className="flex flex-col">
																<label htmlFor="">{item.name}</label>
																{item.fromRecipe && (
																	<span className="text-neutral-500 text-sm">
																		レシピ: {item.fromRecipe}
																	</span>
																)}
															</div>
															{loadingItems.includes(item.id) && (
																<span className="loading loading-spinner loading-xs ml-2" />
															)}
														</div>
														<div className="flex justify-end md:justify-start items-center space-x-4">
															<span>{item.display_amount}</span>
															<Refrigerator
																className="hover:text-info"
																size={15}
																onClick={() => handleAddFridge(item)}
															/>
															<Trash2
																className="hover:text-error"
																size={15}
																onClick={() => handleDeleteItem(item.item_id)}
															/>
														</div>
													</div>
												</li>
											))}
										</ul>
									</div>
								),
							)}
						</div>
					</div>
				</div>

				<Modal>
					<AddItemForm
						categories={preferredOrder}
						closeModal={closeModal}
						handleAddItem={handleAddItem}
					/>
				</Modal>
			</div>
		</>
	);
};

export default ShoppingListDetail;
