import { Clock, CookingPot, Leaf, ShoppingCart, Trash2 } from "lucide-react";
import { Link } from "react-router";

const RecipeCard = ({
	id,
	title,
	instructions,
	cookingTime,
	servings,
	difficulty,
	steps,
	ingredients,
}) => {
	return (
		<Link to={`/recipe-lists/${id}`}>
			<div className="card bg-base-100 w-90 shadow-sm transition-transform duration-200 ease-in-out transform hover:-translate-y-1 hover:shadow-lg p-4">
				<div className="card-body">
					<div className="flex justify-between items-center gap-2">
						<h2 className="flex-auto card-title line-clamp-1">{title}</h2>
						<span className="flex-none badge badge-secondary">
							{difficulty}
						</span>
					</div>

					<p className="text-neutral-500 line-clamp-2">{instructions}</p>
					<div className="flex flex-col space-y-3">
						<div className="flex items-center space-x-2">
							<Clock />
							<span>{cookingTime}分</span>
						</div>
						<div className="flex items-center space-x-2">
							<CookingPot />
							<span className="line-clamp-1">
								{ingredients.map((item) => item.name).join(" ")}
							</span>
						</div>
					</div>

					<div className="mt-2 flex justify-end space-x-2">
						<button className="btn btn-primary">
							<ShoppingCart />
							買い物リストに追加する
						</button>
						<button className="btn btn-error">
							<Trash2 />
						</button>
					</div>
				</div>
			</div>
		</Link>
	);
};

export default RecipeCard;
