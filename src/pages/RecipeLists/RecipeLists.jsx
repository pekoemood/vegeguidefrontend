import { useState } from "react";
import toast, { Toaster } from "react-hot-toast";
import { useLoaderData } from "react-router";
import RecipeCard from "../../components/RecipeCard";
import Meta from "../../components/Meta";

const RecipeLists = () => {
	const { data } = useLoaderData();
	const [recipes, setRecipes] = useState(data);
	console.log(recipes);

	return (
		<>
			<Meta title="レシピ一覧" description="簡単＆おいしい野菜レシピを食事別に一覧表示。手順や所要時間も明確にご紹介。"/>
			<main className="container mx-auto py-6">
				<div>
					<h1 className="text-2xl font-bold">登録レシピ一覧</h1>
					<p className="mt-4 text-neutral-500">
						登録されたレシピの参照と削除ができます
					</p>
				</div>

				<div className="mt-4 grid grid-cols-4 gap-3">
					{recipes.map((recipe) => (
						<RecipeCard
							key={recipe.id}
							id={recipe.id}
							title={recipe.attributes.name}
							instructions={recipe.attributes.instructions}
							cookingTime={recipe.attributes.cooking_time}
							servings={recipe.attributes.servings}
							purpose={recipe.attributes.purpose}
							ingredients={recipe.attributes.ingredients}
							steps={recipe.attributes.recipe_steps}
							setRecipes={setRecipes}
							toast={toast}
						/>
					))}
				</div>
			</main>
		</>
	);
};

export default RecipeLists;
