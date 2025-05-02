import axios from "axios";

const shoppingListLoader = async () => {
	try {
		const response = await axios.get(
			`${import.meta.env.VITE_RAILS_API}/shopping_lists`,
			{
				withCredentials: true,
			},
		);
		return { shoppingLists: response.data.data };
	} catch (error) {
		throw new Response("買い物リスト一覧の取得に失敗しました", {
			status: error.response?.status || 500,
		});
	}
};

export default shoppingListLoader;
