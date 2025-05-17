import { api } from "../../utils/axios";

const recipeGeneratorLoader = async () => {
	try {
		const response = await api.get("/vegetables/summary");
		return { data: response.data };
	} catch (error) {
		console.error(error);
	}
};

export default recipeGeneratorLoader;
