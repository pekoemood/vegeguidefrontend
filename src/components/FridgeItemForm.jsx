import AddFridgeItemForm from "./AddFridgeItemForm";
import EditFridgeItemForm from "./EditFridgeItemForm";

const FridgeItemForm = ({
	closeModal,
	categories,
	id,
	item,
	handleEdit,
	handleAdd,
}) => {
	return (
		<>
			{id ? (
				<EditFridgeItemForm
					closeModal={closeModal}
					categories={categories}
					id={id}
					item={item}
					handleEdit={handleEdit}
				/>
			) : (
				<AddFridgeItemForm
					closeModal={closeModal}
					categories={categories}
					handleAdd={handleAdd}
				/>
			)}
		</>
	);
};

export default FridgeItemForm;
