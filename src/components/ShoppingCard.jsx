import { Link } from "react-router";

const ShoppingCard = ({ id, title, time, items }) => {
	return (
		<Link to={`/shoppinglist/${id}`}>
			<div className="bg-white shadow-md rounded-2xl">
				<div className="px-4 py-6 flex flex-col space-y-3">
					<div>
						<div className="text-xl text-green-700">{title}</div>
					</div>
					<p className="text-sm text-gray-400">{time}</p>
					<div className="flex justify-between text-sm text-gray-600">
						<p>進捗状況</p>
						<p>1/3アイテム</p>
					</div>
					<progress
						className="progress progress-primary "
						value="70"
						max="100"
					></progress>
					<p className="text-sm text-gray-600 truncate overflow-hidden w-full whitespace-nowrap space-x-4">
						{items.length}アイテム：
						{items.map((item) => (
							<span kye={item.name} className="">
								{item.name}
							</span>
						))}
					</p>
				</div>
				<div className="flex justify-end space-x-12 px-4 py-4">
					<button className="text-sm text-green-600">編集</button>
					<button className="text-sm text-red-600">削除</button>
				</div>
			</div>
		</Link>
	);
};

export default ShoppingCard;
