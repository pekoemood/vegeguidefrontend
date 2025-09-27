const RecipeSkeleton = () => {
	return (
		<>
			<section className="container mx-auto px-2 py-4 flex flex-col lg:flex-row items-center gap-6 max-w-sm lg:max-w-full">
				<div className="lg:flex-1 skeleton w-full h-80 lg:h-140" />
				<div className="lg:flex-1 flex flex-col space-y-8">
					<div className="skeleton h-10 w-1/3" />
					<div className="flex flex-col gap-2">
						<div className="skeleton h-6 max-w-xs" />
						<div className="skeleton h-6 max-w-xs" />
					</div>
					<div className="flex gap-2">
						<div className="skeleton h-6 w-20" />
						<div className="skeleton h-6 w-20" />
						<div className="skeleton h-6 w-20" />
					</div>
					<div className="skeleton h-8 w-1/4" />
					<div className="flex flex-wrap">
						<ul className="flex flex-wrap gap-2">
							<li className="flex items-center gap-2">
								<span className="block skeleton w-6 h-6" />
								<span className="block skeleton h-6 w-30" />
							</li>
							<li className="flex items-center gap-2">
								<span className="block skeleton w-6 h-6" />
								<span className="block skeleton h-6 w-30" />
							</li>
							<li className="flex items-center gap-2">
								<span className="block skeleton w-6 h-6" />
								<span className="block skeleton h-6 w-30" />
							</li>
							<li className="flex items-center gap-2">
								<span className="block skeleton w-6 h-6" />
								<span className="block skeleton h-6 w-30" />
							</li>
						</ul>
					</div>
					<div className="h-1 w-full skeleton" />
					<div className="skeleton h-8 w-1/3" />
					<ul className="flex flex-col gap-4">
						<li className="flex items-center gap-2">
							<span className="block skeleton w-6 h-6" />
							<span className="block skeleton h-6 w-full" />
						</li>
						<li className="flex items-center gap-2">
							<span className="block skeleton w-6 h-6" />
							<span className="block skeleton h-6 w-full" />
						</li>
						<li className="flex items-center gap-2">
							<span className="block skeleton w-6 h-6" />
							<span className="block skeleton h-6 w-full" />
						</li>
						<li className="flex items-center gap-2">
							<span className="block skeleton w-6 h-6" />
							<span className="block skeleton h-6 w-full" />
						</li>
						<li className="flex items-center gap-2">
							<span className="block skeleton w-6 h-6" />
							<span className="block skeleton h-6 w-full" />
						</li>
					</ul>
					<div className="flex justify-end">
						<div className="skeleton h-10 w-30" />
					</div>
				</div>
			</section>
		</>
	);
};

export default RecipeSkeleton;
