import axios from "axios";

export const vegeDetailLoader = async ({ params }) => {
	try {
		const response = await axios.get(
			`${import.meta.env.VITE_RAILS_API}/vegetables/${params.id}`,
			{ withCredentials: true },
		);
		return { vegetable: response.data };
	} catch (error) {
		throw new Response("特定野菜の取得に失敗しました", {
			status: error.response?.status || 500,
		});
	}
};
