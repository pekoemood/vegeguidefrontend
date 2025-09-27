import type { RecipeImage, RecipeResponse } from "../types/apiResponse";

const GenerateRecipeArea = ({
	recipe,
	recipeImage,
	isSaving,
	isPending,
	handleClickSave,
}: {
	recipe: RecipeResponse | null;
	recipeImage: RecipeImage | null;
	isSaving: boolean;
	isPending: boolean;
	handleClickSave: () => void;
}) => {
	return (
		<>
			{recipe && (
				<div className="container mx-auto px-4 flex flex-col lg:flex-row lg:items-center">
					<div className="w-full lg:w-1/2 h-64 md:h-80 lg:h-140 mb-4 lg:mb-0">
						{recipeImage ? (
							<img
								src={recipeImage.image_url}
								alt="料理画像"
								className="rounded-lg w-full h-full object-cover"
							/>
						) : (
							<div className="skeleton h-full w-full rounded-lg bg-base-200" />
						)}
					</div>
					<div className="p-2 md:p-6 lg:w-1/2">
						<div className="flex flex-col justify-between items-start space-y-2 mb-4">
							<div>
								<h2 className="text-start text-xl font-semibold">
									{recipe.name}
								</h2>
								<p className="text-xs md:text-base text-neutral-500 mt-1">
									{recipe.instructions}
								</p>
							</div>
							<div className="flex flex-wrap gap-2">
								<div className="flex items-center badge badge-secondary">
									料理カテゴリ: {recipe.recipe_category}
								</div>
								<div className="flex items-center badge badge-secondary">
									カロリー: {recipe.calorie}kcal
								</div>
								<div className="flex items-center badge badge-secondary">
									調理時間: {recipe.cooking_time}分
								</div>
								<div className="flex items-center badge badge-secondary">
									目的・シーン: {recipe.purpose}
								</div>
							</div>
						</div>

						<div>
							<h3 className="font-semibold text-lg flex items-center mb-2">
								食材
								{
									<span className="text-sm font-normal ml-2">
										({recipe.servings}人分)
									</span>
								}
							</h3>
							<div className="rounded-md p-4">
								<ul className="flex flex-wrap gap-2">
									{recipe.ingredients?.map((ingredient, index) => (
										<li
											key={index}
											className="flex items-center gap-1 text-xs md:text-base"
										>
											<span className="badge badge-neutral badge-xs" />
											{ingredient.name} {ingredient?.display_amount}
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
								{(recipe?.step ?? []).map((st, index) => (
									<li key={index} className="step flex">
										<p className="text-left text-xs md:text-base">
											{st?.description}
										</p>
									</li>
								))}
							</ul>
						</div>

						<div className="flex justify-end gap-3 mt-6">
							<button
								onClick={handleClickSave}
								className="btn relative"
								disabled={isPending}
							>
								<span className={isSaving ? "invisible" : ""}>
									レシピを保存
								</span>
								{isSaving && (
									<span className="absolute left-1/2 -translate-x-1/2 loading loading-spinner loading-md" />
								)}
							</button>
						</div>
					</div>
				</div>
			)}
		</>
	);
};

export default GenerateRecipeArea;
