const NutritionInfo = ({ nutritions }) => {
	console.log(nutritions);
	return (
		<div className="rounded-2xl shadow-md p-6 bg-white mt-4">
			<h2 className="text-xl font-semibold text-emerald-700 mb-4 flex items-center">
				栄養成分情報
			</h2>
			<div className="overflow-x-auto">
				<table className="min-w-full table-auto">
					<thead className="bg-gray-50 border-b border-gray-200">
						<tr>
							<th className="text-left px-4 py-2 w-[200px] text-gray-600 font-medium">
								栄養素
							</th>
							<th className="text-left px-4 py-2 text-gray-600 font-medium">
								含有量
							</th>
						</tr>
					</thead>
					<tbody>
						{nutritions.map((nutrition, index) => (
							<tr
								kye={index}
								className="border-b border-gray-200 hover:bg-gray-50"
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
