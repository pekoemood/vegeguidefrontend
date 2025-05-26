import { useState } from "react";
import { Link, useLoaderData } from "react-router";
import AddListForm from "../../components/AddListForm";
import ShoppingCard from "../../components/ShoppingCard";
import useModal from "../../hooks/useModal";
import { api } from "../../utils/axios";

const ShoppingList = () => {
	const { shoppingLists } = useLoaderData();
	const [lists, setLists] = useState(shoppingLists);
	const { Modal, openModal, closeModal } = useModal();
	console.log(lists);

	const handleAddList = async (name) => {
		try {
			const response = await api.post(`/shopping_lists`, { name });
			console.log(response);
			setLists((prev) => [...prev, response.data.data]);
		} catch (err) {
			console.error(err);
		}
	};

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
					<button className="btn btn-outline" onClick={openModal}>
						新しいリストの作成
					</button>
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
			<Modal>
				<AddListForm closeModal={closeModal} handleAddList={handleAddList} />
			</Modal>
		</>
	);
};

export default ShoppingList;
