import Input from "./Input";
import Label from "./Label";

const FormField = ({ id, label, className, error, ...props }) => {
	return (
		<div className="space-y-2">
			<Label htmlFor={id}>{label}</Label>
			<Input id={id} className={className} {...props} />
			{error && <p className="text-sm text-red-500">{error.message}</p>}
		</div>
	);
};

export default FormField;
