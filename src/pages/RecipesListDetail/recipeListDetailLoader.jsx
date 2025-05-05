import { api } from "../../utils/axios";

export const recipeListDetailLoader = async ({ params }) => {
	try {
		const response = await api.get(`/recipes/${params.id}`);
		return { data: response.data.data };
	} catch (error) {
		console.error("詳細レシピの取得に失敗しました", error);
		return { data: [] };
	}
};
