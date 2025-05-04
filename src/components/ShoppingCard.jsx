import axios from "axios";
import { Link } from "react-router";
import { Trash2, SquarePen } from 'lucide-react';

const ShoppingCard = ({ id, title, time, items, setLists }) => {

	const check = items.filter((item) => item.checked)

	const handleDestroy = async (id) => {
		try {
			await axios.delete(`${import.meta.env.VITE_RAILS_API}/shopping_lists/${id}`, {
				withCredentials: true
			});
			setLists((prevList) => prevList.filter((list) => list.id !== id))
		} catch (error) {
			console.log(error);
		}
	}

	return (
			// <div className="bg-white shadow-lg rounded-2xl">
			// 	<Link to={`/shoppinglist/${id}`}>
			// 		<div className="px-4 py-6 flex flex-col space-y-3">
			// 			<div>
			// 				<div className="text-xl text-green-700">{title}</div>
			// 			</div>
			// 			<p className="text-sm">{time}</p>
			// 			<div className="flex justify-between text-sm text-gray-600">
			// 				<p>進捗状況</p>
			// 				<p>{check.length}/{items.length} アイテム</p>
			// 			</div>
			// 			<progress
			// 				className="progress progress-primary "
			// 				value={check.length}
			// 				max={items.length}
			// 			></progress>
			// 			<p className="text-sm text-gray-600 truncate overflow-hidden w-full whitespace-nowrap space-x-4">
			// 				{items.length}アイテム：
			// 				{items.map((item, index) => (
			// 					<span key={index}>
			// 						{item.name}
			// 					</span>
			// 				))}
			// 			</p>
			// 		</div>
			// 	</Link>

			// 	<div className="flex justify-end px-4 py-4 bg-green-100">
			// 		<button onClick={() => handleDestroy(id)} className="btn btn-error">削除</button>
			// 	</div>
			// </div>
		<div className="card bg-base-100 w-90 shadow-sm">
			<div className="card-body">
				<h2 className="card-title text-primary h-10">{title}</h2>
				<p className="text-sm text-gray-400">作成日: {time}</p>
				<div className="flex justify-between items-center  text-sm">
					<span>合計アイテム: {items.length}</span>
					<span className="text-left badge badge-outline badge-primary">{check.length}/{items.length} 完了</span>
				</div>

				<progress
					className="progress progress-primary "
					value={check.length}
					max={items.length}
				></progress>

				<div className="card-actions justify-end mt-2">
					<Link to={`/shoppinglist/${id}`} className="btn btn-square"><SquarePen size={20} /></Link>
					<button onClick={() => handleDestroy(id)} className="btn btn-square"><Trash2 size={20} /></button>
				</div>
			</div>
		</div>
	);
};

export default ShoppingCard;
