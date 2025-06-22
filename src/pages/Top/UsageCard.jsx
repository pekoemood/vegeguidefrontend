const UsageCard = ({ image, title, description, number }) => {
	return (
		<div className="rounded-xl p-6 text-center space-y-4 bg-primary/10 hover:shadow-md transition relative">
			<div className="h-48 flex items-center justify-center">
				<span className="flex justify-center items-center rounded-full bg-primary w-8 h-8 absolute -left-3 -top-3 text-white">
					{number}
				</span>
				<img src={image} alt="Image from Gyazo" />
			</div>
			<h3 className="text-primary-content text-xl font-semibold">{title}</h3>
			<p className="text-primary-content text-neutral-500">{description}</p>
		</div>
	);
};

export default UsageCard;
