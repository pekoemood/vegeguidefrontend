import axios from "axios";

export const shoppingListDetailLoader = async ({ params }) => {
	try {
		const response = await axios.get(
			`${import.meta.env.VITE_RAILS_API}/shopping_lists/${params.id}`,
			{
				withCredentials: true,
			},
		);
		return { shoppingList: response.data.data };
	} catch (error) {
		console.error(`材料データの取得に失敗しました${error}`);
	}
};
