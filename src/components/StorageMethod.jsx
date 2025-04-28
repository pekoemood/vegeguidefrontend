const StorageMethod = ({ storage }) => {
	return (
		<>
			<div className="mt-4">
				<div className="bg-white rounded-lg shadow p-6">
					<h2 className="text-xl font-semibold text-emerald-700 mb-4 flex items-center">
						最適な保存方法
					</h2>
					<div className="space-y-6">{storage}</div>
				</div>
			</div>
		</>
	);
};

export default StorageMethod;
