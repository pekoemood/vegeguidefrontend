import { AxiosError } from "axios";
import { ShoppingListsResponse } from "../../types/apiResponse";
import { api } from "../../utils/axios";

const shoppingListLoader = async () => {
	try {
		const response = await api.get<ShoppingListsResponse>(`/shopping_lists`);
		return response.data.data;
	} catch (error) {
		if (error instanceof AxiosError) {
			throw new Response('買い物リスト一覧の取得に失敗しました', {
				status: error.response.status ?? 500,
			})
		}
		throw new Response("予期せぬエラーが発生しました", {
			status: 500,
		});
	}
};

export default shoppingListLoader;
