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
		<div className="p-6 mt-4 rounded-2xl shadow-lg space-y-6">
			<h2 className="text-xl font-semibold text-primary ">{vegetableName}を使ったレシピ</h2>
			<div className="text-center">
				<button
					className="btn btn-neutral"
					onClick={handleClick}
					disabled={isPending}
				>
					{isPending ? <Spinner /> : "レシピ生成"}{" "}
				</button>
				{error && <p className="text-error mt-2">{error}</p>}
				{recipe && (
					<div className="p-6 my-8">
						<div className="flex justify-between items-start mb-4">
							<div>
								<h2 className="text-start text-xl font-semibold">
									{recipe.name}
								</h2>
								<p className="text-neutral-500 mt-1">{recipe.instructions}</p>
							</div>
							<div className="flex gap-2">
								<div className="flex items-center badge badge-secondary">
									調理時間: {recipe.cooking_time}
								</div>
								<div className="flex items-center badge badge-secondary">
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
							<div className="rounded-md p-4">
								<ul className="grid grid-cols-3 gap-2">
									{recipe.ingredients.map((ingredient, index) => (
										<li key={index} className="flex items-center gap-2">
											<span className="badge badge-neutral badge-xs"></span>
											{ingredient.name} {ingredient.amount} {ingredient.unit}
										</li>
									))}
								</ul>
							</div>
						</div>

						<hr className="border-t border-base-300 my-6" />

						<div className="flex flex-col">
							<h3 className="font-semibold text-lg flex items-center mb-4">
								調理手順
							</h3>
							<ul className="steps steps-vertical">
								{recipe.step.map((st, index) => (
									<li key={index} className="step flex">
										<p className="text-balance">{st.description}</p>
									</li>
								))}
							</ul>
						</div>

						<div className="flex justify-end gap-3 mt-6">
							{/* <button className="btn">レシピを保存</button> */}
							<button
								onClick={handleClickShoppingList}
								className="btn btn-primary"
							>
								買い物リストに追加
							</button>
						</div>
					</div>
				)}
			</div>
		</div>
	);
};

export default RecipeGenerator;
