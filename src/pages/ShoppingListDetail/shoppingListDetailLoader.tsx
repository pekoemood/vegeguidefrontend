import axios from "axios";
import type { LoaderFunctionArgs } from "react-router";
import {
	type ShoppingListEntry,
	ShoppingListResponse,
} from "../../types/apiResponse";
import { api } from "../../utils/axios";

export const shoppingListDetailLoader = async ({
	params,
}: LoaderFunctionArgs): Promise<ShoppingListEntry> => {
	try {
		const response = await api.get<{ data: ShoppingListEntry }>(
			`/shopping_lists/${params.id}`,
		);
		return response.data.data;
	} catch (error) {
		console.error(`食材データの取得に失敗しました${error}`);
		throw error;
	}
};
