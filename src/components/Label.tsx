import { LabelHTMLAttributes } from "react";

type LabelProps = {
	className?: string;
} & LabelHTMLAttributes<HTMLLabelElement>;

const Label = ({ className = "", ...props }: LabelProps) => {
	return (
		<label
			{...props}
			className={`text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70 ${className}`}
		/>
	);
};

export default Label;
