import { CircleCheckBigIcon } from "lucide-react";

const Recommend = ({ text }) => {
	return (
		<div className="flex items-center gap-2 sm:gap-3 sm:pl-10">
			<div className="flex items-center bg-primary/10 p-2 rounded-full">
				<CircleCheckBigIcon className="h-4 sm:h-5 w-4 sm:w-5 text-primary" />
			</div>
			<p className="text-xs sm:text-base leading-tight">{text}</p>
		</div>
	);
};

export default Recommend;
