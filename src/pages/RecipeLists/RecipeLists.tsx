import { useState } from "react";
import toast from "react-hot-toast";
import { useLoaderData } from "react-router";
import Meta from "../../components/Meta";
import RecipeCard from "../../components/RecipeCard";
import type { Recipes } from "../../types/apiResponse";

const RecipeLists = () => {
	const data = useLoaderData<Recipes[]>();
	const [recipes, setRecipes] = useState<Recipes[]>(data);
	console.log(recipes);

	return (
		<>
			<Meta
				title="レシピ一覧"
				description="簡単＆おいしい野菜レシピを食事別に一覧表示。手順や所要時間も明確にご紹介。"
			/>
			<main className="container mx-auto px-2 py-8">
				<div>
					<h1 className="text-2xl font-bold">登録レシピ一覧</h1>
					<p className="mt-4 text-neutral-500">
						登録されたレシピの参照と削除ができます
					</p>
				</div>

				<div className="mt-4 flex flex-col justify-center items-center md:grid md:grid-cols-2 xl:grid-cols-3 2xl:grid-cols-4 gap-4 animate-fade-up">
					{recipes.map((recipe, index) => (
						<div
							key={recipe.id}
							className="animate-fade-up"
							style={{
								animationDelay: `${index * 0.1}s`,
								animationFillMode: "both",
							}}
						>
							<RecipeCard
								id={recipe.id}
								title={recipe.attributes.name}
								instructions={recipe.attributes.instructions}
								cookingTime={recipe.attributes.cooking_time}
								servings={recipe.attributes.servings}
								purpose={recipe.attributes.purpose}
								ingredients={recipe.attributes.ingredients}
								steps={recipe.attributes.recipe_steps}
								setRecipes={setRecipes}
								image={recipe.attributes.image_url}
								category={recipe.attributes.recipe_category}
							/>
						</div>
					))}
				</div>
			</main>
		</>
	);
};

export default RecipeLists;
