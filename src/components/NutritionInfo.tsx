interface NutritionProp {
	name: string;
	amount: string;
	unit: string;
};

interface NutritionProps {
	nutritions: NutritionProp[];
};

import { ChartBarIncreasing } from 'lucide-react';

const NutritionInfo = ({ nutritions }: NutritionProps) => {
	return (
		<div className="rounded-2xl shadow-md p-6 mt-4">
			<h2 className="text-xl font-semibold text-primary mb-4 flex items-center gap-2">
				<ChartBarIncreasing className="w-5 h-5 text-primary" />
				栄養成分情報
			</h2>
			<div className="overflow-x-auto">
				<table className="min-w-full table-auto">
					<thead className="border-b border-gray-200">
						<tr>
							<th className="text-left px-4 py-2 w-[200px] font-medium text-neutral-500">
								栄養素
							</th>
							<th className="text-left px-4 py-2 text-neutral-500 font-medium">
								含有量
							</th>
						</tr>
					</thead>
					<tbody>
						{nutritions.map((nutrition) => (
							<tr
								key={nutrition.name}
								className="border-b border-base-300 hover:bg-neutral-100"
							>
								<td className="px-4 py-2 font-medium">{nutrition.name}</td>
								<td className="px-4 py-2 font-medium">
									{nutrition.amount}
									{nutrition.unit}/100g
								</td>
							</tr>
						))}
					</tbody>
				</table>
			</div>
		</div>
	);
};

export default NutritionInfo;
