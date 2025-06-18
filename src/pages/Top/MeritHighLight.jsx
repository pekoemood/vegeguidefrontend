import { CircleCheckBigIcon } from "lucide-react";

const MeritHighLight = ({ title, merits, image, order }) => {
	return (
		<div className="flex items-center gap-8">
			<div className={`flex-1 ${order[0]}`}>
				<h3 className="text-2xl font-bold mb-4">{title}</h3>
				<ul className="space-y-3">
					{merits.map((merit, index) => (
						<li key={index} className="flex items-start gap-2">
							<CircleCheckBigIcon className="h-5 w-5 text-primary shrink-0 mt-0.5" />
							<span>{merit}</span>
						</li>
					))}
				</ul>
			</div>
			<div className={`flex-1 ${order[1]}`}>
				<div className="p-4 rounded-xl shadow-lg flex justify-center">
					{image}
				</div>
			</div>
		</div>
	);
};

export default MeritHighLight;
