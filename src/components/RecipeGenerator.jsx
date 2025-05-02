import axios from "axios";
import { useState, useTransition } from "react";
import { useNavigate } from "react-router";
import Spinner from "./Spinner";

const RecipeGenerator = ({ vegetableName }) => {
	const [recipe, setRecipe] = useState(null);
	const [error, setError] = useState(null);
	const [isPending, startTransition] = useTransition();
	const navigate = useNavigate();

	const handleClick = () => {
		startTransition(async () => {
			setError(null);
			try {
				const response = await axios.post(
					`${import.meta.env.VITE_RAILS_API}/recipe_generations`,
					{ vegetable: vegetableName },
					{ withCredentials: true },
				);
				setRecipe(response.data);
			} catch (error) {
				console.log(error);
				setError("レシピの生成にはログインが必要です。");
			}
		});
	};

	const handleClickShoppingList = async () => {
		try {
			await axios.post(
				`${import.meta.env.VITE_RAILS_API}/shopping_lists`,
				{
					...recipe,
				},
				{ withCredentials: true },
			);
		} catch (error) {
			console.log(error);
		}
		navigate("/shoppinglist");
	};

	return (
		<div className="text-center mt-8 ">
			<button className="btn" onClick={handleClick} disabled={isPending}>
				{isPending ? <Spinner /> : "レシピ生成"}{" "}
			</button>
			{error && <p className="text-red-500">{error}</p>}
			{recipe && (
				<div className="border rounded-2xl shadow-md p-6 my-8">
					<div className="flex justify-between items-start mb-4">
						<div>
							<h2 className="text-start text-xl font-semibold">
								{recipe.name}
							</h2>
							<p className="text-gray-500 mt-1">{recipe.instructions}</p>
						</div>
						<div className="flex gap-2">
							<div className="flex items-center border rounded-full px-2 py-1 text-sm text-gray-600">
								調理時間: {recipe.cooking_time}
							</div>
							<div className="flex items-center border rounded-full px-2 py-1 text-sm text-gray-600">
								難易度: {recipe.difficulty}
							</div>
						</div>
					</div>

					<div>
						<h3 className="font-semibold text-lg flex items-center mb-2">
							材料
							{
								<span className="text-sm font-normal ml-2">
									({recipe.servings}人分)
								</span>
							}
						</h3>
						<div className="rounded-md border p-4">
							<ul className="grid grid-cols-3 gap-2">
								{recipe.ingredients.map((ingredient, index) => (
									<li key={index} className="flex items-center">
										<span className="w-4 h-4 rounded-full bg-green-100 text-xs flex items-center justify-center mr-2">
											・
										</span>
										{ingredient.name} {ingredient.amount} {ingredient.unit}
									</li>
								))}
							</ul>
						</div>
					</div>

					<hr className="border-t border-gray-200 my-6" />

					<div>
						<h3 className="font-semibold text-lg flex items-center mb-4">
							調理手順
						</h3>
						<ol className="space-y-4">
							{recipe.step.map((st, index) => (
								<li key={index} className="flex items-start">
									<span className="w-6 h-6 rounded-full bg-green-100 text-sm flex items-center justify-center mr-3">
										{st.step_number}
									</span>
									<p className="text-balance">{st.description}</p>
								</li>
							))}
						</ol>
					</div>

					<div className="flex justify-end gap-3 mt-6">
						<button className="border rounded-md px-4 py-2 text-gray-700 hover:bg-gray-100">
							レシピを保存
						</button>
						<button
							onClick={handleClickShoppingList}
							className="bg-green-600 text-white rounded-md px-4 py-2 flex items-center hover:bg-green-700"
						>
							買い物リストに追加
						</button>
					</div>
				</div>
			)}
		</div>
	);
};

export default RecipeGenerator;
