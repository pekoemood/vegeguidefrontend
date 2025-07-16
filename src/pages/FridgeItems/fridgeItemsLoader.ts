import { FridgeItems, FridgeItemsResponse } from "../../types/apiResponse";
import { api } from "../../utils/axios";

export const fridgeItemsLoader = async (): Promise<FridgeItemsResponse> => {
	try {
		const response = await api.get<FridgeItemsResponse>(`fridge_items`);
		return response.data
	} catch (err) {
		console.error(err);
	}
};
