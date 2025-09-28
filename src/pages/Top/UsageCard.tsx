interface UsageCardProps {
	image: string;
	title: string;
	description: string;
	number: string;
}

const UsageCard = ({ image, title, description, number }: UsageCardProps) => {
	return (
		<div className="max-w-lg rounded-xl p-6 text-center space-y-4 bg-primary/10 hover:shadow-md transition relative">
			<div className="lg:h-48 flex items-center justify-center">
				<span className="flex justify-center items-center rounded-full bg-primary w-8 h-8 absolute -left-3 -top-3 text-white">
					{number}
				</span>
				<img
					src={image}
					alt={`${title}の説明画面`}
					className="object-contain h-full w-full"
				/>
			</div>
			<h3 className="text-md text-primary-content lg:text-xl font-semibold">
				{title}
			</h3>
			<p className="text-sm xl:text-base text-neutral-500">{description}</p>
		</div>
	);
};

export default UsageCard;
