import { api } from "../../utils/axios";

export const recipeGeneratorLoader = async () => {
	try {
		const response = await api.get("/vegetables/summary");
		return { data: response.data };
	} catch (error) {
		console.error(error);
	}
};
