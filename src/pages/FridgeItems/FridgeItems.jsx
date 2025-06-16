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
import FridgeItemForm from "../../components/FridgeItemForm";
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
			toast.success("材料を追加しました");
		} catch (err) {
			console.error(err);
			toast.error("材料の追加に失敗しました");
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
			toast.success("材料情報を編集しました");
		} catch (err) {
			console.error(err);
			toast.error("材料情報の編集に失敗しました");
		}
	};

	const handleDelete = async (id) => {
		try {
			const response = await api.delete(`/fridge_items/${id}`);
			setItems(response.data.data);
			toast.success("材料を削除しました");
		} catch (err) {
			console.error(err);
			toast.error("材料の削除に失敗しました");
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
			<main className="container mx-auto py-6">
				<div>
					<h1 className="text-2xl font-bold">冷蔵庫</h1>
					<p className="mt-4 text-neutral-500">
						冷蔵庫に登録された材料を確認ができます。また、材料からレシピの提案も可能です
					</p>
				</div>

				<div className="flex space-x-4 mt-4">
					<input
						type="text"
						className="input w-full"
						placeholder="材料を検索..."
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
						材料を追加
					</button>
				</div>

				<div role="tablist" className="tabs tabs-box mt-4">
					<a
						role="tab"
						className={`tab flex-1 space-x-1 ${selectedCategory === null && "tab-active"}`}
						onClick={() => setSelectedCategory(null)}
					>
						<Layers className="h-5" />
						<span>すべて</span>
					</a>
					{categories.map(({ name, icon: Icon }) => (
						<a
							key={name}
							role="tab"
							className={`tab flex-1 space-x-1 ${selectedCategory === name && "tab-active"}`}
							onClick={() => setSelectedCategory(name)}
						>
							<Icon className="h-5" /> <span>{name}</span>
						</a>
					))}
				</div>

				<div className="grid grid-cols-5 gap-4 mt-6">
					<div
						className={`border border-base-300 p-4 rounded-lg cursor-pointer transition transform hover:scale-105  hover:bg-base-200 hover:shadow-lg ${foodSelectedStatus === null && 'bg-base-200'}`}
						onClick={() => setFoodSelectedStatus(null)}
					>
						<p className="text-2xl">{items.length}</p>
						<span className="text-neutral-500">総材料数</span>
					</div>
					<div
						className={`border border-base-300 p-4 rounded-lg cursor-pointer transition transform hover:scale-105  hover:bg-error hover:shadow-lg ${foodSelectedStatus === 'expired' && 'bg-error'}`}
						onClick={() => setFoodSelectedStatus("expired")}
					>
						<p className="text-2xl text-error-content">{foodStatusCount.expired}</p>
						<span className="text-neutral-500">期限切れ</span>
					</div>
					<div
						className={`border border-base-300 p-4 rounded-lg cursor-pointer transition transform hover:scale-105  hover:bg-accent hover:shadow-lg ${foodSelectedStatus === 'urgent' && 'bg-accent'}`}
						onClick={() => setFoodSelectedStatus("urgent")}
					>
						<p className="text-2xl text-accent-content">{foodStatusCount.urgent}</p>
						<span className="text-neutral-500">期限間近</span>
					</div>
					<div
						className={`border border-base-300 p-4 rounded-lg cursor-pointer transition transform hover:scale-105  hover:bg-warning hover:shadow-lg ${foodSelectedStatus === 'warning' && 'bg-warning'}`}
						onClick={() => setFoodSelectedStatus("warning")}
					>
						<p className="text-2xl text-warning-content">{foodStatusCount.warning}</p>
						<span className="text-neutral-500">注意</span>
					</div>
					<div
						className={`border border-base-300 p-4 rounded-lg cursor-pointer transition transform hover:scale-105  hover:bg-info hover:shadow-lg ${foodSelectedStatus === 'safe' && 'bg-info'}`}
						onClick={() => setFoodSelectedStatus("safe")}
					>
						<p className="text-2xl text-info-content">{foodStatusCount.safe}</p>
						<span className="text-neutral-500">安全</span>
					</div>
				</div>

				<div>
					<div className="flex justify-between mt-6 border border-base-300 p-4 rounded-lg items-center">
						<div className="flex space-x-2">
							<p className="font-bold">AIレシピ提案</p>
							<div className="flex items-center space-x-2">
								{selectedItem.length > 0 && (
									<span className="text-sm text-neutral-500">
										選択中のアイテム
									</span>
								)}
								{selectedItem.map((item) => (
									<span key={item} className="badge">
										{item}
									</span>
								))}
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
						<div className="p-6 my-8 border border-base-300 rounded-lg">
							<div className="flex flex-col justify-between items-start space-y-2 mb-4">
								<div>
									<h2 className="text-start text-xl font-semibold">
										{recipe.name}
									</h2>
									<p className="text-neutral-500 mt-1">{recipe.instructions}</p>
								</div>
								<div className="flex gap-2">
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
										目的: {recipe.purpose}
									</div>
								</div>
							</div>

							<div>
								<h3 className="font-semibold text-lg flex items-center mb-2">
									材料
									{
										<span className="text-sm font-normal ml-2">
											({recipe.servings}人分)
										</span>
									}
								</h3>
								<div className="rounded-md p-4">
									<ul className="grid grid-cols-3 gap-2">
										{recipe.ingredients?.map((ingredient, index) => (
											<li key={index} className="flex items-center gap-2">
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
											<p className="text-balance">{st?.description}</p>
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
								<th>材料名</th>
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
