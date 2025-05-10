const StorageMethod = ({ storage }) => {
	return (
		<>
			<div className="mt-4">
				<div className="rounded-lg shadow p-6">
					<h2 className="text-xl font-semibold text-primary mb-4 flex items-center">
						最適な保存方法
					</h2>
					<div className="space-y-6">{storage}</div>
				</div>
			</div>
		</>
	);
};

export default StorageMethod;
