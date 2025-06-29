import {
	Clock,
	CookingPot,
	Leaf,
	ShoppingCart,
	Trash2,
	User,
} from "lucide-react";
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
	toast,
	image,
	category,
}) => {
	const handleClickDelete = async (e) => {
		e.stopPropagation();
		e.preventDefault();
		try {
			await api.delete(`/recipes/${id}`);
			setRecipes((prevRecipes) =>
				prevRecipes.filter((recipe) => recipe.id !== id),
			);
			toast.success("レシピを削除しました");
		} catch (error) {
			console.error(error);
			toast.error("レシピの削除に失敗しました");
		}
	};

	const navigate = useNavigate();

	return (
		<div onClick={() => navigate(`/recipe-lists/${id}`)}>
			<div className="cursor-pointer w-90 card shadow-sm transition-transform duration-200 ease-in-out transform hover:-translate-y-1 hover:shadow-lg">
				<figure>
					<img src={image} alt="料理画像" className="aspect-square w-full" />
				</figure>
				<div className="card-body">
					<h2 className="card-title line-clamp-1">{title}</h2>
					<div className="flex gap-1 flex-nowrap">
						<span className="badge badge-accent line-clamp-1">{category}</span>
						<span className="badge badge-accent flex items-center line-clamp-1">
							<Clock size={15} />
							{cookingTime}分
						</span>
						<span className="badge badge-accent flex items-center line-clamp-1">
							<User size={15} />
							{servings}人分
						</span>
					</div>

					<p className="text-neutral-500 line-clamp-2">{instructions}</p>
					<div className="card-actions items-center justify-end">
						<button
							onClick={handleClickDelete}
							className="btn btn-error flex items-center gap-1"
						>
							<Trash2 size={20} />
							<span>削除する</span>
						</button>
					</div>
				</div>
			</div>
		</div>
	);
};

export default RecipeCard;
