import type { LabelHTMLAttributes, ReactNode } from "react";

type LabelProps = {
	className?: string;
	htmlFor: string;
	children: ReactNode;
} & Omit<LabelHTMLAttributes<HTMLLabelElement>, "className" | "htmlFor" | "children">;

const Label = ({ className = "", htmlFor, children, ...props }: LabelProps) => {
	return (
		<label
			{...props}
			htmlFor={htmlFor}
			className={`text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70 ${className}`}
		>
			{children}
		</label>
	);
};

export default Label;
