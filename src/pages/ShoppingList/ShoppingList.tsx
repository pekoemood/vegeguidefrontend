import { useState } from "react";
import toast from "react-hot-toast";
import { Link, useLoaderData } from "react-router";
import AddListForm from "../../components/AddListForm";
import Meta from "../../components/Meta";
import ShoppingCard from "../../components/ShoppingCard";
import useModal from "../../hooks/useModal";
import {
	ShoppingListEntry,
	type ShoppingListResponse,
	type ShoppingListsLoader,
} from "../../types/apiResponse";
import { api } from "../../utils/axios";

const ShoppingList = () => {
	const shoppingLists = useLoaderData<ShoppingListsLoader>();
	const [lists, setLists] = useState(shoppingLists);
	const { Modal, openModal, closeModal } = useModal();

	const handleAddList = async (name: string) => {
		try {
			const response = await api.post<ShoppingListResponse>(`/shopping_lists`, {
				name,
			});
			console.log(response);
			setLists((prev) => [...prev, response.data.data]);
			toast.success("買い物リストを作成しました");
		} catch (err) {
			console.error(err);
			toast.error("買い物リストの作成に失敗しました");
		}
	};

	return (
		<>
			<Meta
				title="買い物リスト"
				description="必要な食材をまとめて管理。買い忘れを防げて、効率的な買い物ができます！"
			/>
			<main className="container mx-auto px-4 py-8 animate-fade-up">
				<div>
					<h1 className="text-2xl font-bold">買い物リスト</h1>
					<p className="text-neutral-500 my-4">
						複数の買い物リストを作成・管理できます
					</p>
				</div>

				<div className="mt-4 flex">
					<button
						className="btn btn-outline w-full sm:w-fit"
						onClick={openModal}
					>
						新しいリストの作成
					</button>
				</div>

				<div className="flex flex-col items-center  md:grid md:grid-cols-2 xl:grid-cols-3 2xl:grid-cols-4  gap-4 mt-4">
					{lists.map((list, index) => (
						<div
							key={list.id}
							className="animate-fade-up"
							style={{
								animationDelay: `${index * 0.1}s`,
								animationFillMode: "both",
							}}
						>
							<ShoppingCard
								id={list.id}
								title={list.attributes.name}
								time={list.attributes.created_at_jst}
								items={list.attributes.shopping_items}
								setLists={setLists}
							/>
						</div>
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
