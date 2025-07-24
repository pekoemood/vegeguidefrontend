import { type ButtonHTMLAttributes, FC, type ReactNode } from "react";

type ButtonProps = {
	children: ReactNode;
	className?: string;
} & ButtonHTMLAttributes<HTMLButtonElement>;

const Button = ({ children, className = "", ...props }: ButtonProps) => {
	return (
		<button
			{...props}
			className={`w-full bg-green-600 hover:bg-green-700 text-white text-sm py-2 px-4 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500 ${className}`}
		>
			{children}
		</button>
	);
};

export default Button;
