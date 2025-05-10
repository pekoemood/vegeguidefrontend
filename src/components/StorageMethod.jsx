const StorageMethod = ({ storage }) => {
	return (
		<>
			<div className="rounded-2xl shadow-md p-6 mt-4">
				<h2 className="text-xl font-semibold text-primary mb-4 flex items-center">
					最適な保存方法
				</h2>
				<div className="space-y-6">{storage}</div>
			</div>
		</>
	);
};

export default StorageMethod;
