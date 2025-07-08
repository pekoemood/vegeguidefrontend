import { api } from "../../utils/axios";
import type { LoaderFunctionArgs } from "react-router";
import type { AxiosError } from "axios";
import type { Vegetable, VegetablesLoaderData } from "../../types/vegetable";


export const vegeListLoader = async ({ request }: LoaderFunctionArgs): Promise<VegetablesLoaderData> => {
	const url = new URL(request.url);
	const page = url.searchParams.get("page") || "1";
	const keyword = url.searchParams.get("keyword") || "";
	const season = url.searchParams.get("season") || "";
	const discounted = url.searchParams.get("discounted") || "";
	try {
		const response = await api.get<VegetablesLoaderData>(`/vegetables`, {
			params: {
				page: page,
				keyword: keyword,
				season: season,
				discounted: discounted,
			},
		});
		return response.data;
	} catch (error) {
		const axiosError = error as AxiosError;
		throw new Response("野菜一覧の取得に失敗しました", {
			status: axiosError.response?.status || 500,
		});
	}
};
