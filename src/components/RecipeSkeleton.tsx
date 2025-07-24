const RecipeSkeleton = () => {
	return (
		<>
			<section className="container mx-auto px-2 py-4 flex flex-col lg:flex-row items-center gap-6 max-w-sm lg:max-w-full">
				<div className="lg:flex-1 skeleton w-full h-80 lg:h-140"></div>
				<div className="lg:flex-1 flex flex-col space-y-8">
					<div className="skeleton h-10 w-1/3"></div>
					<div className="flex flex-col gap-2">
						<div className="skeleton h-6 max-w-xs"></div>
						<div className="skeleton h-6 max-w-xs"></div>
					</div>
					<div className="flex gap-2">
						<div className="skeleton h-6 w-20"></div>
						<div className="skeleton h-6 w-20"></div>
						<div className="skeleton h-6 w-20"></div>
					</div>
					<div className="skeleton h-8 w-1/4"></div>
					<div className="flex flex-wrap">
						<ul className="flex flex-wrap gap-2">
							<li className="flex items-center gap-2">
								<span className="block skeleton w-6 h-6"></span>
								<span className="block skeleton h-6 w-30"></span>
							</li>
							<li className="flex items-center gap-2">
								<span className="block skeleton w-6 h-6"></span>
								<span className="block skeleton h-6 w-30"></span>
							</li>
							<li className="flex items-center gap-2">
								<span className="block skeleton w-6 h-6"></span>
								<span className="block skeleton h-6 w-30"></span>
							</li>
							<li className="flex items-center gap-2">
								<span className="block skeleton w-6 h-6"></span>
								<span className="block skeleton h-6 w-30"></span>
							</li>
						</ul>
					</div>
					<div className="h-1 w-full skeleton"></div>
					<div className="skeleton h-8 w-1/3"></div>
					<ul className="flex flex-col gap-4">
						<li className="flex items-center gap-2">
							<span className="block skeleton w-6 h-6"></span>
							<span className="block skeleton h-6 w-full"></span>
						</li>
						<li className="flex items-center gap-2">
							<span className="block skeleton w-6 h-6"></span>
							<span className="block skeleton h-6 w-full"></span>
						</li>
						<li className="flex items-center gap-2">
							<span className="block skeleton w-6 h-6"></span>
							<span className="block skeleton h-6 w-full"></span>
						</li>
						<li className="flex items-center gap-2">
							<span className="block skeleton w-6 h-6"></span>
							<span className="block skeleton h-6 w-full"></span>
						</li>
						<li className="flex items-center gap-2">
							<span className="block skeleton w-6 h-6"></span>
							<span className="block skeleton h-6 w-full"></span>
						</li>
					</ul>
					<div className="flex justify-end">
						<div className="skeleton h-10 w-30"></div>
					</div>
				</div>
			</section>
		</>
	);
};

export default RecipeSkeleton;
