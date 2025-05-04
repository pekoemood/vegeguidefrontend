import axios from "axios";
import { SquarePen, Trash2 } from "lucide-react";
import { Link } from "react-router";

const ShoppingCard = ({ id, title, time, items, setLists }) => {
	const check = items.filter((item) => item.checked);

	const handleDestroy = async (id) => {
		try {
			await axios.delete(
				`${import.meta.env.VITE_RAILS_API}/shopping_lists/${id}`,
				{
					withCredentials: true,
				},
			);
			setLists((prevList) => prevList.filter((list) => list.id !== id));
		} catch (error) {
			console.log(error);
		}
	};

	return (
		<div className="card w-90 shadow-lg">
			<div className="card-body">
				<h2 className="card-title truncate">{title}</h2>
				<p className="text-sm text-neutral-500">作成日: {time}</p>
				<div className="flex justify-between items-center  text-sm">
					<span>合計アイテム: {items.length}</span>
					<span
						className={`badge ${check.length === items.length ? "badge-success" : "badge-primary badge-outline"}`}
					>
						{check.length}/{items.length} 完了
					</span>
				</div>

				<progress
					className="progress progress-primary "
					value={check.length}
					max={items.length}
				></progress>

				<div className="card-actions justify-end mt-2">
					<Link
						to={`/shoppinglist/${id}`}
						className="btn btn-square btn-outline"
					>
						<SquarePen size={20} />
					</Link>
					<button
						onClick={() => handleDestroy(id)}
						className="btn btn-square btn-outline"
					>
						<Trash2 size={20} />
					</button>
				</div>
			</div>
		</div>
	);
};

export default ShoppingCard;
