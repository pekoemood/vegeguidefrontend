interface VegetableCardProps {
	id: number;
	name: string;
	img: string;
	onClick: () => void;
	selected: boolean;
}

const VegetableCard = ({ name, img, onClick, selected }: VegetableCardProps) => {
	const handleKeyDown = (e: React.KeyboardEvent) => {
		if (e.key === 'Enter' || e.key === ' ') {
			e.preventDefault();
			onClick();
		}
	};

	return (
		<div
			onClick={onClick}
			onKeyDown={handleKeyDown}
			tabIndex={0}
			role="button"
			aria-pressed={selected}
			aria-label={`${name}を${selected ? '選択解除' : '選択'}する`}
			className={`
				card w-32 flex-shrink-0 cursor-pointer transition-all duration-200 relative
				${
					selected
						? "bg-primary text-primary-content shadow-lg ring-2 ring-primary transform scale-105"
						: "bg-base-100 hover:shadow-md hover:scale-105 hover:bg-base-200"
				}
			`}
		>
			{selected && (
				<div className="absolute top-2 right-2 z-10">
					<div className="bg-primary-content text-primary rounded-full w-5 h-5 flex items-center justify-center">
						<svg className="w-3 h-3" fill="currentColor" viewBox="0 0 20 20" aria-hidden="true">
							<title>選択済み</title>
							<path
								fillRule="evenodd"
								d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
								clipRule="evenodd"
							/>
						</svg>
					</div>
				</div>
			)}
			<figure className="px-6 pt-6">
				<img
					src={img}
					alt={`${name}の画像`}
					className="rounded-xl h-16 w-16 object-cover"
				/>
			</figure>
			<div className="card-body items-center text-center p-3">
				<h2
					className={`text-sm font-medium ${selected ? "text-primary-content" : "text-base-content"}`}
				>
					{name}
				</h2>
			</div>
		</div>
	);
};

export default VegetableCard;
