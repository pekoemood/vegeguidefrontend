import { useState } from "react";

const AddListForm = ({ closeModal, handleAddList }) => {
	const [name, setName] = useState("");

	return (
		<>
			<div className="bg-base-100 p-6 rounded-lg w-xl max-w-xl shadow-lg">
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
					<button className="btn" onClick={() => handleAddList(name)}>
						追加
					</button>
				</div>
			</div>
		</>
	);
};

export default AddListForm;
