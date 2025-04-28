import axios from "axios";

export const vegeListLoader = async () => {
	try {
		const response = await axios.get(
			`${import.meta.env.VITE_RAILS_API}/vegetables`,
			{ withCredentials: true }
		);
		return { vegetables: response.data };
	} catch (error) {
		throw new Response("野菜一覧の取得に失敗しました", {
			status: error.response?.status || 500,
		});
	}
};
