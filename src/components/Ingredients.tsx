import { RecipeResponse } from "../types/apiResponse";

const Ingredients = ({ servings, ingredients }: Pick<RecipeResponse, 'servings' | 'ingredients'>) => {
	return (
		<section className="w-full mt-6">
			<h2 className="text-xl">食材（{servings}人前）</h2>
			<ul className="mt-6 mx-auto space-y-4">
				{ingredients.map((ingredient) => (
					<li
						key={ingredient.name}
						className="flex justify-between items-center py-2 border-b border-neutral-400"
					>
						<span className="text-xl">{ingredient.name} </span>
						<span className="text-neutral-500 text-lg">
							{ingredient.display_amount}
						</span>
					</li>
				))}
			</ul>
		</section>
	);
};

export default Ingredients;
