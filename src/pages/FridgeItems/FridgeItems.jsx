import {
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
	ArrowDownUp
} from "lucide-react";
import { useState } from "react";
import { useLoaderData } from "react-router";
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
	safe: 0
}

const FridgeItems = () => {
	const { data } = useLoaderData();
	const [items, setItems] = useState(data.data);
	const [name, setName] = useState("");
	const { Modal, openModal, closeModal } = useModal();
	const [editingItemId, setEditingItemId] = useState(null);
	const editItem = items.filter((item) => item.id === editingItemId);
	const [sortKey, setSortKey] = useState(null);
	const [sortOrder, setSortOrder] = useState(null);
	const [selectedCategory, setSelectedCategory] = useState(null);
	const [foodSelectedStatus, setFoodSelectedStatus] = useState(null);

	const foodStatusCount = items.reduce((acc, item) => {
		const status = item.attributes.expire_status;
			acc[status] += 1;
			return acc
	}, {...initialStatus})

	const foodStatus = (status) => {
		switch (status) {
			case 'expired':
				return <span className="text-red-500">期限切れ</span>
				
			case 'urgent':
				return <span className="text-error">期限間近</span>
			
			case 'warning':
				return <span className="text-warning">注意</span>
			
			case 'safe':
				return <span className="text-info">安全</span>
		}
	}

	let filterItems = items;
	filterItems = filterItems.filter((item) =>
		item.attributes.name.includes(name),
	);

	if (selectedCategory) {
		filterItems = filterItems.filter(
			(item) => item.attributes.category === selectedCategory
		);
	}

	if (foodSelectedStatus) {
		filterItems = filterItems.filter(
			(item) => item.attributes.expire_status === foodSelectedStatus
		);
	}

	const sortedItems = [...filterItems].sort((a, b) => {
		if (!sortKey) return 0;

		let aValue = a.attributes[sortKey]
		let bValue = b.attributes[sortKey]

		if (sortKey === 'expire_date' || sortKey === 'created_at') {
			aValue = new Date(aValue);
			bValue = new Date(bValue);
		}

		if (aValue < bValue) return sortOrder === "asc" ? -1 : 1;
		if (aValue > bValue) return sortOrder === "asc" ? 1 : -1;
		return 0;
	})

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
						expire_date: date,
					},
				],
			});
			setItems(response.data.data);
			closeModal();
		} catch (err) {
			console.error(err);
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
		} catch (err) {
			console.error(err);
		}
	};

	const handleDelete = async (id) => {
		try {
			const response = await api.delete(`/fridge_items/${id}`);
			setItems(response.data.data);
		} catch (err) {
			console.error(err);
		}
	};

	



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
						食材を追加
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
					<div className="border border-base-300 p-4 rounded-lg" onClick={() => setFoodSelectedStatus(null)}>
						<p className="text-2xl">{items.length}</p>
						<span className="text-neutral-500">総材料数</span>
					</div>
					<div className="border border-base-300 p-4 rounded-lg" onClick={() => setFoodSelectedStatus('expired')}>
						<p className="text-2xl text-red-500">{foodStatusCount.expired}</p>
						<span className="text-neutral-500">期限切れ</span>
					</div>
					<div className="border border-base-300 p-4 rounded-lg" onClick={() => setFoodSelectedStatus('urgent')}>
						<p className="text-2xl text-error">{foodStatusCount.urgent}</p>
						<span className="text-neutral-500">期限間近</span>
					</div>
					<div className="border border-base-300 p-4 rounded-lg" onClick={() => setFoodSelectedStatus('warning')}>
						<p className="text-2xl text-warning">{foodStatusCount.warning}</p>
						<span className="text-neutral-500">注意</span>
					</div>
					<div className="border border-base-300 p-4 rounded-lg" onClick={() => setFoodSelectedStatus('safe')}>
						<p className="text-2xl text-info">{foodStatusCount.safe}</p>
						<span className="text-neutral-500">安全</span>
					</div>
				</div>

				<div className="overflow-x-auto rounded-box border border-base-content/5 bg-base-100 mt-6">
					<table className="table">
						<thead>
							<tr>
								<th></th>
								<th>材料名</th>
								<th onClick={() => { 
									if (sortKey === 'category') {
										setSortOrder(sortOrder === 'asc' ? 'desc' : 'asc');
									} else {
										setSortKey('category');
										setSortOrder('asc');
									}
								}}>
									<div className="flex items-center space-x-2"><span>カテゴリー</span><ArrowDownUp size={15}/></div></th>
								<th>数量</th>
								<th onClick={() => {
									if (sortKey === 'expire_date') {
										setSortOrder(sortOrder === 'asc' ? 'desc' : 'asc');
									} else {
										setSortKey('expire_date');
										setSortOrder('asc');
									}
								}}>
									<div className="flex items-center space-x-2"><span>賞味期限</span><ArrowDownUp size={15}/></div></th>
								<th><div className="flex items-center space-x-2"><span>状態</span><ArrowDownUp size={15}/></div></th>
								<th><div className="flex items-center space-x-2"><span>追加日</span><ArrowDownUp size={15}/></div></th>
								<th>操作</th>
							</tr>
						</thead>
						<tbody>
							{sortedItems.map((item) => (
								<tr key={item.id}>
									<th>{changeIcon(item.attributes.category)}</th>
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
											className="hover:text-info"
											onClick={() => {
												setEditingItemId(item.id);
												openModal();
											}}
										/>
										<Trash2
											size={20}
											className="hover:text-error"
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
