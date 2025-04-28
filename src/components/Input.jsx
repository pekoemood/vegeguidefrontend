const Input = ({ className, id, placeholder, ...props }) => {
	return (
		<input
			type="text"
			id={id}
			placeholder={placeholder}
			{...props}
			className={`flex h-10 w-full rounded-md border border-gray-300 bg-white px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-green-500 focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 ${className}`}
		/>
	);
};

export default Input;
