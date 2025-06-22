import {
	ArrowDownUp,
	Bean,
	Beef,
	Box,
	Carrot,
	Egg,
	Fish,
	Layers,
	Package,
	Soup,
	SquarePen,
	Trash2,
	Wheat,
} from "lucide-react";
import { useState, useTransition } from "react";
import toast from "react-hot-toast";
import { useLoaderData, useNavigate } from "react-router";
import FoodStatus from "../../components/FoodStatus";
import FridgeItemForm from "../../components/FridgeItemForm";
import Meta from "../../components/Meta";
import useModal from "../../hooks/useModal";
import { api } from "../../utils/axios";

const categories = [
	{ name: "野菜", icon: Carrot },
	{ name: "肉類", icon: Beef },
	{ name: "魚介類", icon: Fish },
	{ name: "卵・乳製品", icon: Egg },
	{ name: "豆・豆製品", icon: Bean },
	{ name: "穀類・パン", icon: Wheat },
	{ name: "調味料", icon: Soup },
	{ name: "加工食品", icon: Package },
	{ name: "その他", icon: Box },
];

const initialStatus = {
	expired: 0,
	urgent: 0,
	warning: 0,
	safe: 0,
};

const FridgeItems = () => {
	const navigation = useNavigate();
	const { data } = useLoaderData();
	const [items, setItems] = useState(data.data);
	const [name, setName] = useState("");
	const [selectedItem, setSelectedItem] = useState([]);
	const [recipe, setRecipe] = useState(null);
	const [isPending, startTransition] = useTransition();
	const { Modal, openModal, closeModal } = useModal();
	const [editingItemId, setEditingItemId] = useState(null);
	const editItem = items.filter((item) => item.id === editingItemId);
	const [sortKey, setSortKey] = useState(null);
	const [sortOrder, setSortOrder] = useState(null);
	const [selectedCategory, setSelectedCategory] = useState(null);
	const [foodSelectedStatus, setFoodSelectedStatus] = useState(null);

	const foodStatusCount = items.reduce(
		(acc, item) => {
			const status = item.attributes.expire_status;
			acc[status] += 1;
			return acc;
		},
		{ ...initialStatus },
	);

	const foodStatus = (status) => {
		switch (status) {
			case "expired":
				return <span className="text-red-500">期限切れ</span>;

			case "urgent":
				return <span className="text-error">期限間近</span>;

			case "warning":
				return <span className="text-warning">注意</span>;

			case "safe":
				return <span className="text-info">安全</span>;

			case "unset":
				return <span>不明</span>;
		}
	};

	let filterItems = items;
	filterItems = filterItems.filter((item) =>
		item.attributes.name.includes(name),
	);

	if (selectedCategory) {
		filterItems = filterItems.filter(
			(item) => item.attributes.category === selectedCategory,
		);
	}

	if (foodSelectedStatus) {
		filterItems = filterItems.filter(
			(item) => item.attributes.expire_status === foodSelectedStatus,
		);
	}

	const sortedItems = [...filterItems].sort((a, b) => {
		if (!sortKey) return 0;

		let aValue = a.attributes[sortKey];
		let bValue = b.attributes[sortKey];

		if (sortKey === "expire_date" || sortKey === "created_at") {
			aValue = new Date(aValue);
			bValue = new Date(bValue);
		}

		if (aValue < bValue) return sortOrder === "asc" ? -1 : 1;
		if (aValue > bValue) return sortOrder === "asc" ? 1 : -1;
		return 0;
	});

	const handleSort = (key) => {
		if (sortKey === key) {
			setSortOrder(sortOrder === "asc" ? "desc" : "asc");
		} else {
			setSortKey(key);
			setSortOrder("asc");
		}
	};

	console.log(items);

	const categoryIconMap = Object.fromEntries(
		categories.map(({ name, icon }) => [name, icon]),
	);

	const changeIcon = (category) => {
		const Icon = categoryIconMap[category];
		return <Icon />;
	};

	const handleAdd = async (name, category, amount, date) => {
		try {
			const response = await api.post(`/fridge_items`, {
				fridge: [
					{
						name: name,
						category: category,
						display_amount: amount,
						expire_date: date ? date.toLocaleDateString() : null,
					},
				],
			});
			setItems(response.data.data);
			closeModal();
			toast.success("食材を追加しました");
		} catch (err) {
			console.error(err);
			toast.error("食材の追加に失敗しました");
		}
	};

	const handleEdit = async (id, name, category, amount, date) => {
		try {
			const response = await api.patch(`/fridge_items/${id}`, {
				fridge: {
					name: name,
					category: category,
					display_amount: amount,
					expire_date: date,
				},
			});
			setItems(response.data.data);
			closeModal();
			toast.success("食材情報を編集しました");
		} catch (err) {
			console.error(err);
			toast.error("食材情報の編集に失敗しました");
		}
	};

	const handleDelete = async (id) => {
		try {
			const response = await api.delete(`/fridge_items/${id}`);
			setItems(response.data.data);
			toast.success("食材を削除しました");
		} catch (err) {
			console.error(err);
			toast.error("食材の削除に失敗しました");
		}
	};

	const handleChecked = (item) => {
		setSelectedItem((prev) => {
			if (prev.includes(item.attributes.name)) {
				return prev.filter((_item) => _item !== item.attributes.name);
			} else {
				return [...prev, item.attributes.name];
			}
		});
	};

	const handleSuggestRecipe = () => {
		startTransition(async () => {
			try {
				const response = await api.post(`/recipe_generations`, {
					selectedVegetables: selectedItem,
				});
				setRecipe(response.data[0]);
			} catch (err) {
				console.error(err);
			}
		});
	};

	const handleSaveRecipe = async () => {
		try {
			const response = await api.post(`/recipes`, {
				...recipe,
			});
			navigation("/recipe-lists");
			toast.success("レシピを保存しました");
		} catch (err) {
			console.error(err);
			toast.error("レシピの保存に失敗しました");
		}
	};

	console.log("レシピ", recipe);

	return (
		<>
			<Meta
				title="冷蔵庫"
				description="冷蔵庫の食材をスマートに管理。不足・賞味期限も通知で安心。食材をムダなく使えます。"
			/>
			<main className="container mx-auto py-6">
				<div>
					<h1 className="text-2xl font-bold">冷蔵庫</h1>
					<p className="mt-4 text-neutral-500">
						冷蔵庫に登録された食材を確認ができます。また、食材からレシピの提案も可能です
					</p>
				</div>

				<div className="flex space-x-4 mt-4">
					<input
						type="text"
						className="input w-full"
						placeholder="食材を検索..."
						value={name}
						onChange={(e) => setName(e.target.value)}
					/>
					<button
						className="btn"
						onClick={() => {
							setEditingItemId(null);
							openModal();
						}}
					>
						食材を追加
					</button>
				</div>

				<div
					role="tablist"
					className="tabs tabs-box mt-4 overflow-x-auto flex-nowrap"
				>
					<a
						role="tab"
						className={`tab flex-1 ${selectedCategory === null && "tab-active"}`}
						onClick={() => setSelectedCategory(null)}
					>
						<div className="flex flex-col items-center">
							<Layers className="h-5" />
							<span className="text-xs lg:text-base whitespace-nowrap">
								すべて
							</span>
						</div>
					</a>
					{categories.map(({ name, icon: Icon }) => (
						<a
							key={name}
							role="tab"
							className={`tab flex-1 ${selectedCategory === name && "tab-active"}`}
							onClick={() => setSelectedCategory(name)}
						>
							<div className="flex flex-col items-center">
								<Icon className="h-5" />{" "}
								<span className="text-xs lg:text-base whitespace-nowrap">
									{name}
								</span>
							</div>
						</a>
					))}
				</div>

				<div className="flex gap-4 mt-6">
					<FoodStatus
						foodSelectedStatus={foodSelectedStatus}
						setFoodSelectedStatus={setFoodSelectedStatus}
						status={null}
						items={items}
					/>

					<FoodStatus
						foodSelectedStatus={foodSelectedStatus}
						setFoodSelectedStatus={setFoodSelectedStatus}
						status={"expired"}
						items={items}
					/>

					<FoodStatus
						foodSelectedStatus={foodSelectedStatus}
						setFoodSelectedStatus={setFoodSelectedStatus}
						status={"urgent"}
						items={items}
					/>

					<FoodStatus
						foodSelectedStatus={foodSelectedStatus}
						setFoodSelectedStatus={setFoodSelectedStatus}
						status={"warning"}
						items={items}
					/>

					<FoodStatus
						foodSelectedStatus={foodSelectedStatus}
						setFoodSelectedStatus={setFoodSelectedStatus}
						status={"safe"}
						items={items}
					/>
				</div>

				<div>
					<div className="flex flex-col gap-2 md:flex-row md:justify-between mt-6 border border-base-300 p-4 rounded-lg md:items-center">
						<div className="flex flex-col gap-2">
							<p className="font-bold">AIレシピ提案</p>
							<div className="flex flex-col gap-2">
								{selectedItem.length > 0 && (
									<span className="text-sm text-neutral-500">
										選択中のアイテム
									</span>
								)}
								<div className="flex gap-2 flex-wrap">
																{selectedItem.map((item) => (
									<span key={item} className="badge">
										{item}
									</span>
								))}
								</div>

							</div>
						</div>

						<button
							className="btn"
							onClick={handleSuggestRecipe}
							disabled={isPending || selectedItem.length === 0}
						>
							{isPending ? (
								<span className="loading loading-spinner"></span>
							) : (
								"レシピを提案"
							)}
						</button>
					</div>

					{recipe && (
						<div className="p-2 md:p-6">
							<div className="flex flex-col justify-between items-start space-y-2 mb-4">
								<div>
									<h2 className="text-start text-xl font-semibold">
										{recipe.name}
									</h2>
									<p className="text-xs md:text-base text-neutral-500 mt-1">
										{recipe.instructions}
									</p>
								</div>
								<div className="flex flex-wrap gap-2">
									<div className="flex items-center badge badge-secondary">
										料理カテゴリ: {recipe.recipe_category}
									</div>
									<div className="flex items-center badge badge-secondary">
										カロリー: {recipe.calorie}kcal
									</div>
									<div className="flex items-center badge badge-secondary">
										調理時間: {recipe.cooking_time}分
									</div>
									<div className="flex items-center badge badge-secondary">
										目的・シーン: {recipe.purpose}
									</div>
								</div>
							</div>

							<div>
								<h3 className="font-semibold text-lg flex items-center mb-2">
									食材
									{
										<span className="text-sm font-normal ml-2">
											({recipe.servings}人分)
										</span>
									}
								</h3>
								<div className="rounded-md p-4">
									<ul className="flex flex-wrap gap-2">
										{recipe.ingredients?.map((ingredient, index) => (
											<li
												key={index}
												className="flex items-center gap-1 text-xs md:text-base"
											>
												<span className="badge badge-neutral badge-xs"></span>
												{ingredient.name} {ingredient?.display_amount}
											</li>
										))}
									</ul>
								</div>
							</div>

							<hr className="border-t border-base-300 my-6" />

							<div className="flex flex-col">
								<h3 className="font-semibold text-lg flex items-center mb-4">
									調理手順
								</h3>
								<ul className="steps steps-vertical">
									{(recipe?.step ?? []).map((st, index) => (
										<li key={index} className="step flex">
											<p className="text-left text-xs md:text-base">
												{st?.description}
											</p>
										</li>
									))}
								</ul>
							</div>

							<div className="flex justify-end gap-3 mt-6">
								<button className="btn" onClick={handleSaveRecipe}>
									レシピを保存
								</button>
								<button
									className="btn"
									onClick={() => {
										setRecipe(null);
										setSelectedItem([]);
									}}
								>
									閉じる
								</button>
							</div>
						</div>
					)}
				</div>

				<div className="overflow-x-auto rounded-box border border-base-content/5 bg-base-100 mt-6">
					<table className="table">
						<thead>
							<tr>
								<th>選択</th>
								<th>アイコン</th>
								<th>食材名</th>
								<th
									onClick={() => handleSort("category")}
									className="cursor-pointer"
								>
									<div className="flex items-center space-x-2">
										<span>カテゴリー</span>
										<ArrowDownUp size={15} />
									</div>
								</th>
								<th>数量</th>
								<th
									onClick={() => handleSort("expire_date")}
									className="cursor-pointer"
								>
									<div className="flex items-center space-x-2">
										<span>賞味期限</span>
										<ArrowDownUp size={15} />
									</div>
								</th>
								<th
									onClick={() => handleSort("expire_status")}
									className="cursor-pointer"
								>
									<div className="flex items-center space-x-2">
										<span>状態</span>
										<ArrowDownUp size={15} />
									</div>
								</th>
								<th
									onClick={() => handleSort("created_day")}
									className="cursor-pointer"
								>
									<div className="flex items-center space-x-2">
										<span>追加日</span>
										<ArrowDownUp size={15} />
									</div>
								</th>
								<th>操作</th>
							</tr>
						</thead>
						<tbody>
							{sortedItems.map((item) => (
								<tr key={item.id}>
									<td>
										<input
											type="checkbox"
											className="checkbox"
											checked={selectedItem.includes(item.attributes.name)}
											onChange={() => handleChecked(item)}
										/>
									</td>
									<td>{changeIcon(item.attributes.category)}</td>
									<td>{item.attributes.name}</td>
									<td>
										<span className="badge">{item.attributes.category}</span>
									</td>
									<td>{item.attributes?.display_amount}</td>
									<td>{item.attributes.expire_date}</td>
									<td>{foodStatus(item.attributes.expire_status)}</td>
									<td>{item.attributes.created_day}</td>
									<td className="flex items-center space-x-4">
										<SquarePen
											size={20}
											className="hover:text-info cursor-pointer"
											onClick={() => {
												setEditingItemId(item.id);
												openModal();
											}}
										/>
										<Trash2
											size={20}
											className="hover:text-error cursor-pointer"
											onClick={() => handleDelete(item.id)}
										/>
									</td>
								</tr>
							))}
						</tbody>
					</table>
				</div>
				<Modal>
					<FridgeItemForm
						closeModal={closeModal}
						categories={categories}
						id={editingItemId}
						item={editItem[0]?.attributes || null}
						handleEdit={handleEdit}
						handleAdd={handleAdd}
					/>
				</Modal>
			</main>
		</>
	);
};

export default FridgeItems;
