import { api } from "../../utils/axios";

export const fridgeItemsLoader = async () => {
	try {
		const response = await api.get(`fridge_items`);
		return { data: response.data };
	} catch (err) {
		console.error(err);
	}
};
