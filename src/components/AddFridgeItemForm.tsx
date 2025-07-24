import { ja } from "date-fns/locale";
import { useState } from "react";
import { DayPicker } from "react-day-picker";
import type { FridgeAddItem } from "../types/apiResponse";

const AddFridgeItemForm = ({
	closeModal,
	categories,
	handleAdd,
}: {
	closeModal: () => void;
	categories: { name: string; icon: string }[];
	handleAdd: (props: FridgeAddItem) => void;
}) => {
	const [name, setName] = useState<string>("");
	const [amount, setAmount] = useState<string>("");
	const [category, setCategory] = useState<string>("");
	const [date, setDate] = useState<Date | null>(null);
	const itemCategories = categories.filter((ct) => ct.name !== "全て");

	const handleDateChange = (selectedDate: Date) => {
		setDate(selectedDate);
	};

	return (
		<>
			<div className="bg-base-100 p-6 rounded-lg min-w-sm md:min-w-md lg:min-w-lg shadow-lg">
				<h2 className="text-lg font-bold mb-1">食材を追加</h2>
				<p className="text-sm text-neutral-500 mb-4">
					食材の情報を入力してください
				</p>

				<div className="flex flex-col space-y-6 mb-4">
					<div>
						<input
							type="text"
							className="input w-full"
							placeholder="食材名"
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
							<option value="" disabled>
								カテゴリを選択してください
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
							style={{ [`anchorName` as string]: "--rdp" }}
						>
							{date ? date.toLocaleDateString() : "賞味期限を選択してください"}
						</button>
						<div
							popover="auto"
							id="rdp-popover"
							className="dropdown"
							style={{ [`positionAnchor` as string]: "--rdp" }}
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
						<button
							className="btn"
							onClick={() => handleAdd({ name, category, amount, date })}
						>
							追加
						</button>
					</div>
				</div>
			</div>
		</>
	);
};

export default AddFridgeItemForm;
