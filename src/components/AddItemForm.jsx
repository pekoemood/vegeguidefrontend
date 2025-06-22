import { useState } from "react";

const AddItemForm = ({ categories, closeModal, handleAddItem }) => {
	const [name, setName] = useState("");
	const [amount, setAmount] = useState("");
	const [category, setCategory] = useState("");
	const [checked, setChecked] = useState(false);

	return (
		<>
			<div className="bg-base-100 p-6 rounded-lg min-w-sm md:min-w-md lg:min-w-lg shadow-lg">
				<h2 className="text-lg font-bold mb-1">新しいアイテムを追加</h2>
				<p className="text-sm text-neutral-500 mb-4">
					買い物リストに追加するアイテムの情報を入力してください
				</p>

				<div className="grid grid-cols-3 gap-4 mb-4">
					<div className="col-span-2">
						<input
							type="text"
							className="input w-full"
							placeholder="アイテム名"
							value={name}
							onChange={(e) => setName(e.target.value)}
						/>
					</div>
					<div className="col-span-1">
						<input
							type="text"
							className="input"
							placeholder="数量"
							value={amount}
							onChange={(e) => setAmount(e.target.value)}
						/>
					</div>
				</div>

				<div className="mb-4">
					<select
						name=""
						id=""
						className="select"
						value={category}
						onChange={(e) => setCategory(e.target.value)}
					>
						<option value="" className="text-neutral-500">
							カテゴリーを選択
						</option>
						{categories.map((cate) => (
							<option key={cate} value={cate}>
								{cate}
							</option>
						))}
					</select>
				</div>

				<div className="flex justify-center gap-2 mt-4">
					<button className="btn" onClick={closeModal}>
						キャンセル
					</button>
					<button
						className="btn"
						onClick={() => handleAddItem(name, amount, category)}
					>
						追加
					</button>
				</div>
			</div>
		</>
	);
};

export default AddItemForm;
