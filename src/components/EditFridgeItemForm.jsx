import { ja } from "date-fns/locale";
import { useState } from "react";
import { DayPicker } from "react-day-picker";

const EditFridgeItemForm = ({ closeModal, categories, id, item, handleEdit }) => {
	const [name, setName] = useState(item.name);
	const [amount, setAmount] = useState(item.display_amount);
	const [category, setCategory] = useState(item.category);
	const [date, setDate] = useState(item.expire_date ? new Date(item.expire_date) : null);
	const itemCategories = categories.filter((ct) => ct.name !== "全て");
  
  const handleDateChange = (selectedDate) => {
    setDate(selectedDate);
  }
  console.log(item);

	return (
		<>
			<div className="bg-base-100 p-6 rounded-lg min-w-lg shadow-lg">
				<h2 className="text-lg font-bold mb-1">材料を編集</h2>
				<p className="text-sm text-neutral-500 mb-4">
					材料の情報を入力してください
				</p>

				<div className="flex flex-col space-y-6 mb-4">
					<div>
						<input
							type="text"
							className="input w-full"
							placeholder="材料名"
							value={name}
							onChange={(e) => setName(e.target.value)}
						/>
					</div>

					<div>
						<select
							name=""
							id=""
							className="select w-full"
							value={category}
							onChange={(e) => setCategory(e.target.value)}
						>
							<option value="" className="text-neutral-500">
								カテゴリーを選択
							</option>
							{itemCategories.map(({ name }) => (
								<option key={name} value={name}>
									{name}
								</option>
							))}
						</select>
					</div>

					<div>
						<input
							type="text"
							className="input w-full"
							placeholder="数量"
							value={amount}
							onChange={(e) => setAmount(e.target.value)}
						/>
					</div>

					<div>
						<button
							popoverTarget="rdp-popover"
							className="input input-border w-full"
							style={{ anchorName: "--rdp" }}
						>
							{date ? date.toLocaleDateString() : "賞味期限を選択してください"}
						</button>
						<div
							popover="auto"
							id="rdp-popover"
							className="dropdown"
							style={{ positionAnchor: "--rdp" }}
						>
							<DayPicker
								className="react-day-picker"
								mode="single"
								selected={date}
								onSelect={handleDateChange}
                locale={ja}
							/>
						</div>
					</div>

					<div className="flex justify-end gap-4">
						<button className="btn" onClick={closeModal}>
							キャンセル
						</button>
						<button className="btn" onClick={() => handleEdit(id, name, category, amount, date)}>編集</button>
					</div>
				</div>
			</div>
		</>
	);
};

export default EditFridgeItemForm;
