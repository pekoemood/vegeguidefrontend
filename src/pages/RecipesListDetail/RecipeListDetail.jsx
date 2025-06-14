import {
	ChefHat,
	Clock,
	CookingPot,
	Leaf,
	ShoppingCart,
	User,
	Target,
	Grid3x3,
} from "lucide-react";
import { useState } from "react";
import { useLoaderData, useNavigate } from "react-router";
import AddLItemFromRecipe from "../../components/AddItemFromRecipe";
import Ingredients from "../../components/Ingredients";
import RecipeSteps from "../../components/RecipeSteps";
import useModal from "../../hooks/useModal";
import { api } from "../../utils/axios";

const RecipeListDetail = () => {
	const { data } = useLoaderData();
	const [shoppingList, setShoppingLists] = useState(data.attributes);
	const navigate = useNavigate();
	const [activeTab, setActiveTab] = useState("tab1");
	const { Modal, openModal, closeModal } = useModal();
	console.log(data);

	const handleAddShoppingList = async ({ shoppingListId, name }) => {
		try {
			const response = await api.post(`/shopping_lists/from_recipe`, {
				recipe_id: data.id,
				shopping_list_id: shoppingListId,
				name: name,
			});
			setShoppingLists(response.data.data.attributes);
		} catch (error) {
			console.error(error);
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
					<span>調理時間 : {shoppingList.cooking_time}分</span>
				</div>
				<div className="flex items-center badge badge-secondary">
					<Grid3x3 size={20} />
					<span>カテゴリ : {shoppingList.recipe_category}</span>
				</div>
				<div className="flex items-center badge badge-secondary">
					<Target size={20} />
					<span>目的 : {shoppingList.purpose}</span>
				</div>
				<div className="flex items-center badge badge-secondary">
					<User size={20} />
					<span className="">材料 : {shoppingList.servings}人分</span>
				</div>
			</div>

			<div className="mt-10">
				<button onClick={openModal} className="btn btn-primary">
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
							servings={shoppingList.servings}
							ingredients={shoppingList.ingredients}
						/>
					)}
					{activeTab === "tab2" && (
						<RecipeSteps steps={shoppingList.recipe_steps} />
					)}
				</div>
			</div>
			<Modal>
				<AddLItemFromRecipe
					closeModal={closeModal}
					shoppingLists={shoppingList.shopping_lists}
					recipeName={data.attributes.name}
					handleAddShoppingList={handleAddShoppingList}
				/>
			</Modal>
		</main>
	);
};

export default RecipeListDetail;
