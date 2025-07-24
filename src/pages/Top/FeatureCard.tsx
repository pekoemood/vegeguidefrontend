interface FeatureCardProps {
	title: string;
	description: string;
	Icon: React.ComponentType<{ className?: string }>;
}

const FeatureCard = ({ title, description, Icon }: FeatureCardProps) => {
	return (
		<div className="bg-primary/10 rounded-xl p-6 text-center space-y-4 hover:shadow-md transition">
			<div className="bg-primary/10 w-16 h-16 rounded-full flex items-center justify-center mx-auto">
				<Icon className="text-primary" />
			</div>
			<h3 className="text-xl font-semibold">{title}</h3>
			<p>{description}</p>
		</div>
	);
};

export default FeatureCard;
