import type { AxiosError } from "axios";
import type { LoaderFunctionArgs } from "react-router";
import type { VegetablesResponse } from "../../types/vegetable";
import { api } from "../../utils/axios";

export const vegeDetailLoader = async ({
	params,
}: LoaderFunctionArgs): Promise<VegetablesResponse> => {
	try {
		const response = await api.get<VegetablesResponse>(
			`/vegetables/${params.id}`,
		);
		return response.data;
	} catch (error) {
		const axiosError = error as AxiosError;
		throw new Response("特定野菜の取得に失敗しました", {
			status: axiosError.response?.status || 500,
		});
	}
};
