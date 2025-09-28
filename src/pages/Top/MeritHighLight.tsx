import { CircleCheckBigIcon } from "lucide-react";

interface MeritHightLightProps {
	title: string;
	merits: string[];
	image: React.ReactNode;
	order: string[];
}

const MeritHighLight = ({
	title,
	merits,
	image,
	order,
}: MeritHightLightProps) => {
	return (
		<div className="flex flex-col md:flex-row items-center gap-4 md:gap-8">
			<div className={`flex-1 ${order[0]}`}>
				<h3 className="text-md md:text-lg lg:text-2xl text-center md:text-left font-bold mb-4">
					{title}
				</h3>
				<ul className="space-y-3">
					{merits.map((merit, index) => (
						<li
							key={`merit-${merit.slice(0, 10)}-${index}`}
							className="flex items-start gap-2"
						>
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
