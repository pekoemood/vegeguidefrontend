import { api } from "../../utils/axios";

export const recipeListsLoader = async () => {
	try {
		const response = await api.get("/recipes");
		return { data: response.data.data };
	} catch (error) {
		console.error("レシピの取得に失敗しました", error);
		return { data: [] };
	}
};
