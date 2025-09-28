import type { FoodStatusProps } from "../types/apiResponse";

const FoodStatus = ({
	foodSelectedStatus,
	setFoodSelectedStatus,
	status,
	items,
}: FoodStatusProps) => {
	const initialStatus = {
		expired: 0,
		urgent: 0,
		warning: 0,
		safe: 0,
	};

	const foodStatusCount = items.reduce(
		(acc, item) => {
			const status = item.attributes.expire_status;
			acc[status] += 1;
			return acc;
		},
		{ ...initialStatus },
	);

	const statusMap = {
		expired: { color: "bg-error", label: "期限切れ" },
		urgent: { color: "bg-accent", label: "期限間近" },
		warning: { color: "bg-warning", label: "注意" },
		safe: { color: "bg-info", label: "安全" },
		default: { color: "bg-base-200", label: "総食材数" },
	};

	const { color, label } = statusMap[status] ?? statusMap.default;

	return (
		<button
			type="button"
			className={`flex flex-col  items-center min-w-0 flex-1 border border-base-300 p-4 rounded-lg cursor-pointer transition transform hover:scale-105  hover:${color} hover:shadow-lg ${foodSelectedStatus === status && color}`}
			onClick={() => setFoodSelectedStatus(status)}
		>
			<p className="text-2xl">{foodStatusCount[status] ?? items.length}</p>
			<span className="text-neutral-500 whitespace-nowrap text-xs">
				{label}
			</span>
		</button>
	);
};

export default FoodStatus;
