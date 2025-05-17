import { api } from "../../utils/axios";

export const vegeListLoader = async ({ request }) => {
	const url = new URL(request.url);
	const page = url.searchParams.get("page") || "1";
	const keyword = url.searchParams.get("keyword") || "";
	const season = url.searchParams.get("season" || "");
	const discounted = url.searchParams.get("discounted" || "");
	try {
		const response = await api.get(`/vegetables`, {
			params: {
				page: page,
				keyword: keyword,
				season: season,
				discounted: discounted,
			},
		});
		return { data: response.data };
	} catch (error) {
		throw new Response("野菜一覧の取得に失敗しました", {
			status: error.response?.status || 500,
		});
	}
};
