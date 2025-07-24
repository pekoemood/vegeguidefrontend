import type { LoaderFunctionArgs } from "react-router";
import type { Recipes } from "../../types/apiResponse";
import { api } from "../../utils/axios";

export const recipeListDetailLoader = async ({
	params,
}: LoaderFunctionArgs): Promise<Recipes> => {
	try {
		const response = await api.get<{ data: Recipes }>(`/recipes/${params.id}`);
		return response.data.data;
	} catch (error) {
		console.error("詳細レシピの取得に失敗しました", error);
		throw error;
	}
};
