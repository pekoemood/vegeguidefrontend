import { VegetableSummary } from "../../types/vegetable";
import { api } from "../../utils/axios";

const recipeGeneratorLoader = async (): Promise<VegetableSummary[]> => {
	try {
		const response = await api.get<VegetableSummary[]>("/vegetables/summary");
		return response.data;
	} catch (error) {
		console.error(error);
		throw error;
	}
};

export default recipeGeneratorLoader;
