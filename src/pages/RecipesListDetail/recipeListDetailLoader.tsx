import { LoaderFunctionArgs } from "react-router";
import { api } from "../../utils/axios";
import { Recipes } from "../../types/apiResponse";

export const recipeListDetailLoader = async ({ params }: LoaderFunctionArgs): Promise<Recipes> => {
	try {
		const response = await api.get<{data: Recipes}>(`/recipes/${params.id}`);
		return response.data.data;
	} catch (error) {
		console.error("詳細レシピの取得に失敗しました", error);
		throw error;
	}
};
