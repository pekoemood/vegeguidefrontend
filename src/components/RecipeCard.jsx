import { Clock, CookingPot, Leaf, ShoppingCart, Trash2 } from "lucide-react";
import { Link, useNavigate } from "react-router";
import { api } from "../utils/axios";

const RecipeCard = ({
	id,
	title,
	instructions,
	cookingTime,
	servings,
	purpose,
	steps,
	ingredients,
	setRecipes,
}) => {
	const handleClickDelete = async (e) => {
		e.stopPropagation();
		e.preventDefault();
		try {
			await api.delete(`/recipes/${id}`);
			setRecipes((prevRecipes) =>
				prevRecipes.filter((recipe) => recipe.id !== id),
			);
		} catch (error) {
			console.error(error);
		}
	};

	const navigate = useNavigate();

	return (
		<div onClick={() => navigate(`/recipe-lists/${id}`)}>
			<div className="cursor-pointer card max-w-md shadow-sm transition-transform duration-200 ease-in-out transform hover:-translate-y-1 hover:shadow-lg">
				<div className="card-body">
					<div className="flex justify-between items-center gap-2">
						<h2 className="flex-auto card-title line-clamp-1">{title}</h2>
						<span className="flex-none badge badge-secondary">
							{purpose}
						</span>
					</div>

					<p className="text-neutral-500 line-clamp-2">{instructions}</p>

					<div className="flex flex-col gap-2 justify-center">
						<div className="flex items-center gap-2">
							<Clock className="w-5 h-5" />
							<span>{cookingTime}分</span>
						</div>
						<div className="flex items-center gap-2">
							<CookingPot className="w-5 h-5" />
							<span>
								{ingredients.length >= 2 ? (
									<>
										{ingredients[0].name}, {ingredients[1].name}
										{ingredients.length > 2 && (
											<> その他: {ingredients.length - 2}個</>
										)}
									</>
								) : (
									ingredients.map((ingredient) => ingredient.name).json(", ")
								)}
							</span>
						</div>
					</div>

					<div className="mt-2 flex justify-end gap-2">
						<button
							onClick={(e) => handleClickDelete(e)}
							className="btn btn-outline btn-error flex items-center"
						>
							<Trash2 />
							<span>削除する</span>
						</button>
					</div>
				</div>
			</div>
		</div>
	);
};

export default RecipeCard;
