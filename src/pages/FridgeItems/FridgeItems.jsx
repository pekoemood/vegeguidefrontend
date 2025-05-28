import {
	Bean,
	Beef,
	Box,
	Carrot,
	CircleAlert,
	Drumstick,
	Egg,
	Fish,
	Layers,
	Package,
	Soup,
	SquarePen,
	Trash2,
	Wheat,
} from "lucide-react";
import { useState } from "react";
import { useLoaderData } from "react-router";
import EditFridgeItemForm from "../../components/EditFridgeItemForm";
import useModal from "../../hooks/useModal";
import { api } from "../../utils/axios";

const categories = [
	{ name: "全て", icon: Layers },
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

const FridgeItems = () => {
	const { data } = useLoaderData();
	const [items, setItems] = useState(data.data);
	const { Modal, openModal, closeModal } = useModal();
  const [editingItemId, setEditingItemId] = useState(null);
  const editItem = items.filter((item) => item.id === editingItemId)
	console.log(items);

	const categoryIconMap = Object.fromEntries(
		categories.map(({ name, icon }) => [name, icon]),
	);

	const changeIcon = (category) => {
		const Icon = categoryIconMap[category];
		return <Icon />;
	};

  const handleEdit = async (id, name, category, amount, date) => {
    try {
      const response = await api.patch(`/fridge_items/${id}`, {
      fridge: {
        name: name,
        category: category,
        display_amount: amount,
        expire_date: date
      }
    });
    setItems(response.data.data);
    closeModal();
    } catch (err) {
      console.error(err);
    }
  }

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
					/>
					<button className="btn">食材を追加</button>
				</div>

				<div role="tablist" className="tabs tabs-box mt-4">
					{categories.map(({ name, icon: Icon }) => (
						<a key={name} role="tab" className="tab flex-1 space-x-1">
							<Icon className="w- h-5" /> <span>{name}</span>
						</a>
					))}
				</div>

				<div className="grid grid-cols-4 gap-4 mt-6">
					<div className="border border-base-300 p-4 rounded-lg">
						<p className="text-2xl">6</p>
						<span className="text-neutral-500">総材料数</span>
					</div>
					<div className="border border-base-300 p-4 rounded-lg">
						<p className="text-2xl text-accent">6</p>
						<span className="text-neutral-500">期限間近</span>
					</div>
					<div className="border border-base-300 p-4 rounded-lg">
						<p className="text-2xl text-error">6</p>
						<span className="text-neutral-500">要注意</span>
					</div>
					<div className="border border-base-300 p-4 rounded-lg">
						<p className="text-2xl text-info">6</p>
						<span className="text-neutral-500">安全</span>
					</div>
				</div>

				<div className="overflow-x-auto rounded-box border border-base-content/5 bg-base-100 mt-6">
					<table className="table">
						<thead>
							<tr>
								<th></th>
								<th>材料名</th>
								<th>カテゴリー</th>
								<th>数量</th>
								<th>賞味期限</th>
								<th>状態</th>
								<th>追加日</th>
								<th>操作</th>
							</tr>
						</thead>
						<tbody>
							{items.map((item) => (
								<tr key={item.id}>
									<th>{changeIcon(item.attributes.category)}</th>
									<td>{item.attributes.name}</td>
									<td>
										<span className="badge">{item.attributes.category}</span>
									</td>
									<td>{item.attributes?.display_amount}</td>
									<td>{item.attributes.expire_date}</td>
									<td>危険</td>
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
					<EditFridgeItemForm closeModal={closeModal} categories={categories} id={editingItemId} item={editItem[0]?.attributes} handleEdit={handleEdit}/>
				</Modal>
			</main>
		</>
	);
};

export default FridgeItems;
