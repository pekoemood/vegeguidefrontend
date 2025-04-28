import Input from "./Input";
import Label from "./Label";

const FormField = ({ id, label, className, ...props }) => {
	return (
		<div className="space-y-2">
			<Label htmlFor={id}>{label}</Label>
			<Input id={id} className={className} {...props} />
		</div>
	);
};

export default FormField;
