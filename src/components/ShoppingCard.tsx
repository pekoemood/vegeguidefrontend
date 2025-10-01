import axios from "axios";
import { SquarePen, Trash2 } from "lucide-react";
import toast from "react-hot-toast";
import { Link } from "react-router";
import type { ShoppingCardProps } from "../types/apiResponse";
import { api } from "../utils/axios";

const ShoppingCard = ({
	id,
	title,
	time,
	items,
	setLists,
}: ShoppingCardProps) => {
	const check = items.filter((item) => item.checked);

	const handleDestroy = async (
		e: React.MouseEvent<HTMLButtonElement>,
		id: number,
	) => {
		e.stopPropagation();
		e.preventDefault();
		try {
			await api.delete<{ status: string; message: string }>(
				`/shopping_lists/${id}`,
			);
			setLists((prevList) => prevList.filter((list) => list.id !== id));
			toast.success("買い物リストを削除しました");
		} catch (error) {
			console.log(error);
			toast.error("買い物リストの削除に失敗しました");
		}
	};

	return (
		<Link to={`/shoppinglist/${id}`}>
			<div className="card w-90 shadow-sm transition transform hover:-translate-y-1 hover:shadow-lg">
				<div className="card-body space-y-2">
					<h2 className="card-title line-clamp-1">{title}</h2>
					<p className="text-sm text-neutral-500">作成日: {time}</p>
					<div className="flex justify-between text-sm">
						<span>合計アイテム: {items.length}</span>
						<span
							className={`badge ${check.length === items.length ? "badge-success" : "badge-primary badge-outline"}`}
						>
							{check.length}/{items.length} 完了
						</span>
					</div>

					<progress
						className="progress progress-primary w-full"
						value={check.length}
						max={items.length}
					/>

					<div className="flex justify-end">
						<button
							type="button"
							onClick={(e) => handleDestroy(e, id)}
							className="mt-2 btn btn-outline btn-error flex items-center gap-2"
						>
							<Trash2 />
							<span>削除する</span>
						</button>
					</div>
				</div>
			</div>
		</Link>
	);
};

export default ShoppingCard;
