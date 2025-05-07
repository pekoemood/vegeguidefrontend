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
		<div className="card bg-base-100 w-90 shadow-sm transition-transform duration-200 ease-in-out transform hover:-translate-y-1 hover:shadow-lg p-4">
			<div className="card-body space-y-3">
				<Link to={`/recipe-lists/${id}`} className="block space-y-3">
					<div className="flex justify-between items-center gap-2">
						<h2 className="flex-auto card-title line-clamp-1">{title}</h2>
						<span className="flex-none badge badge-secondary">
							{difficulty}
						</span>
					</div>

					<p className="text-neutral-500 line-clamp-2">
						{instructions}
					</p>

					<div className="flex flex-col gap-2 text-neutral-700">
						<div className="flex items-center gap-2">
							<Clock />
							<span>{cookingTime}分</span>
						</div>
						<div className="flex items-center gap-2">
							<CookingPot />
							<span className="line-clamp-1">
								{ingredients.map((item) => item.name).join(" ")}
							</span>
						</div>
					</div>
				</Link>

				<div className="border-t border-base-300 pt-3 flex justify-around gap-2">
					<button className="btn btn-primary flex items-center gap-2">
						<ShoppingCart />
						<span>買い物に追加</span>
					</button>
					<button className="btn btn-outline flex items-center gap-2">
						<Trash2 />
						<span>削除する</span>
					</button>
				</div>
			</div>
		</div>
	);
};

export default RecipeCard;
