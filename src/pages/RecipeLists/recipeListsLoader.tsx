import type { RecipeResponse } from "../../types/apiResponse";
import { api } from "../../utils/axios";

export const recipeListsLoader = async (): Promise<RecipeResponse> => {
	try {
		const response = await api.get<{ data: RecipeResponse }>("/recipes");
		return response.data.data;
	} catch (error) {
		console.error("レシピの取得に失敗しました", error);
		throw error;
	}
};
