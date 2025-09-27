import { Check, Plus } from "lucide-react";
import { useState } from "react";
import type { AddShoppingListParams, ShoppingList } from "../types/apiResponse";

const AddLItemFromRecipe = ({
	closeModal,
	shoppingLists,
	recipeName,
	handleAddShoppingList,
}: {
	closeModal: () => void;
	shoppingLists: ShoppingList[];
	recipeName: string;
	handleAddShoppingList: (params: AddShoppingListParams) => Promise<void>;
}) => {
	const [isCreateMode, setIsCreateMode] = useState<boolean>(false);
	const [name, setName] = useState<string>("");
	console.log("ショッピングリストデータ", shoppingLists);
	return (
		<>
			<div className="bg-base-100 p-6 rounded-lg min-w-sm md:min-w-md lg:min-w-lg shadow-lg">
				{isCreateMode ? (
					<>
						<h2 className="text-lg font-bold mb-1">新しい買い物リスト</h2>
						<p className="text-sm text-neutral-500 mb-4">
							買い物リストの名前を入力してください
						</p>

						<div className="mb-4">
							<div>
								<input
									type="text"
									className="input w-full"
									placeholder="買い物リスト名"
									value={name}
									onChange={(e) => setName(e.target.value)}
								/>
							</div>
						</div>

						<div className="flex justify-end gap-2 mt-4">
							<button className="btn" onClick={closeModal}>
								キャンセル
							</button>
							<button
								className="btn"
								onClick={() => handleAddShoppingList({ name })}
							>
								作成して追加
							</button>
						</div>
					</>
				) : (
					<>
						<h2 className="text-lg font-bold mb-1">買い物リストを選択</h2>
						<p className="text-sm text-neutral-500 mb-4">
							{recipeName}の食材を全て追加する買い物リストを選択してください
						</p>

						<div className="flex flex-col space-y-2">
							{shoppingLists.map((list) => (
								<button
									key={list.id}
									className="btn btn-outline justify-between h-15 border-base-300"
									onClick={() =>
										handleAddShoppingList({ shoppingListId: list.id })
									}
									disabled={list.already_added}
								>
									<div className="text-left flex flex-start items-center space-x-2">
										{list.already_added ? (
											<Check size={15} />
										) : (
											<Plus size={15} />
										)}
										<div>
											<div>{list.name}</div>
											<div className="text-neutral-500">
												{list.checked_count}/{list.items_count}完了
											</div>
										</div>
									</div>
									<div className="text-neutral-500">
										最終更新：{list.updated}
									</div>
								</button>
							))}
							<button
								className="btn btn-dash btn-primary h-15"
								onClick={() => setIsCreateMode((prev) => !prev)}
							>
								<Plus size={15} />
								新しいリストを作成
							</button>
						</div>

						<div className="flex justify-end gap-2 mt-4">
							<button className="btn" onClick={closeModal}>
								キャンセル
							</button>
						</div>
					</>
				)}
			</div>
		</>
	);
};

export default AddLItemFromRecipe;
