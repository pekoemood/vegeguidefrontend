import {
	ChefHat,
	Clock,
	CookingPot,
	Leaf,
	ShoppingCart,
	User,
} from "lucide-react";
import { useState } from "react";
import { useLoaderData, useNavigate } from "react-router";
import Ingredients from "../../components/Ingredients";
import RecipeSteps from "../../components/RecipeSteps";
import { api } from "../../utils/axios";

const RecipeListDetail = () => {
	const { data } = useLoaderData();
	const navigate = useNavigate();
	const [activeTab, setActiveTab] = useState("tab1");
	console.log(data);

	const handleAddShoppingList = async () => {
		try {
			await api.post(`/shopping_lists/from_recipe`, {
				recipe_id: data.id,
			});
			alert("買い物リストを作成しました");
		} catch (error) {
			console.log(error);
		}
	};

	return (
		<main className="container max-w-screen-lg mx-auto px-8 py-6">
			<div className="mb-6">
				<button
					onClick={() => navigate("/recipe-lists")}
					className="btn btn-outline btn-sm"
				>
					戻る
				</button>
			</div>

			<h1 className="text-2xl font-bold">{data.attributes.name}</h1>
			<p className="mt-4 text-neutral-500">{data.attributes.instructions}</p>
			<div className="mt-4 flex space-x-2 items-center">
				<div className="flex items-center badge badge-secondary">
					<Clock size={20} />
					<span>調理時間 : {data.attributes.cooking_time}分</span>
				</div>
				<div className="flex items-center badge badge-secondary">
					<ChefHat size={20} />
					<span>難易度 : {data.attributes.difficulty}</span>
				</div>
				<div className="flex items-center badge badge-secondary">
					<User size={20} />
					<span className="">材料 : {data.attributes.servings}人分</span>
				</div>
			</div>

			<div className="mt-10">
				<button onClick={handleAddShoppingList} className="btn btn-primary">
					<ShoppingCart />
					買い物リストに追加
				</button>
			</div>

			<div className="w-full mt-10">
				<div role="tablist" className="tabs tabs-box flex justify-between">
					<a
						role="tab"
						className={`tab flex-1 ${activeTab === "tab1" ? "tab-active" : ""}`}
						onClick={() => setActiveTab("tab1")}
					>
						材料
					</a>
					<a
						role="tab"
						className={`tab flex-1 ${activeTab === "tab2" ? "tab-active" : ""}`}
						onClick={() => setActiveTab("tab2")}
					>
						作り方
					</a>
				</div>

				<div>
					{activeTab === "tab1" && (
						<Ingredients
							servings={data.attributes.servings}
							ingredients={data.attributes.ingredients}
						/>
					)}
					{activeTab === "tab2" && (
						<RecipeSteps steps={data.attributes.recipe_steps} />
					)}
				</div>
			</div>
		</main>
	);
};

export default RecipeListDetail;
