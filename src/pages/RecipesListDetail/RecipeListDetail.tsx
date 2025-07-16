import {
	ChefHat,
	Clock,
	CookingPot,
	Grid3x3,
	Leaf,
	ShoppingCart,
	Target,
	User,
} from "lucide-react";
import { useState } from "react";
import toast from "react-hot-toast";
import { useLoaderData, useNavigate } from "react-router";
import AddLItemFromRecipe from "../../components/AddItemFromRecipe";
import Ingredients from "../../components/Ingredients";
import Meta from "../../components/Meta";
import RecipeSteps from "../../components/RecipeSteps";
import useModal from "../../hooks/useModal";
import { api } from "../../utils/axios";
import { RecipeResponse, Recipes } from "../../types/apiResponse";

const RecipeListDetail = () => {
	const data = useLoaderData<Recipes>();
	console.log(data);
	const [shoppingList, setShoppingLists] = useState<RecipeResponse>(data.attributes);
	const navigate = useNavigate();
	const [activeTab, setActiveTab] = useState<string>("tab1");
	const { Modal, openModal, closeModal } = useModal();

	const handleAddShoppingList = async ({ shoppingListId, name }:{shoppingListId: number, name: string}): Promise<void> => {
		try {
			const response = await api.post<{data: Recipes}>(`/shopping_lists/from_recipe`, {
				recipe_id: data.id,
				shopping_list_id: shoppingListId,
				name: name,
			});
			setShoppingLists(response.data.data.attributes);
			toast.success("買い物リストに追加しました");
		} catch (error) {
			console.error(error);
			toast.error("買い物リストの追加に失敗しました");
		}
	};

	return (
		<>
			<Meta
				title="レシピ詳細"
				description="簡単＆おいしい野菜レシピを食事別に一覧表示。手順や所要時間も明確にご紹介。"
			/>
			<main className="container max-w-screen-lg mx-auto px-8 py-6">
				<div className="mb-6">
					<button
						onClick={() => navigate("/recipe-lists")}
						className="btn btn-outline"
					>
						戻る
					</button>
				</div>

				<section className="flex flex-col md:flex-row items-center gap-2">
					<div className="flex-1">
						<img
							src={data.attributes.image_url}
							alt="料理画像"
							className="aspect-square w-sm rounded-lg"
						/>
					</div>
					<div className="flex-1">
						<h1 className="text-2xl font-bold">{data.attributes.name}</h1>
						<p className="mt-4 text-neutral-500 text-xs md:text-base">
							{data.attributes.instructions}
						</p>
						<div className="mt-4 flex flex-col md:flex-row flex-wrap gap-2">
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
								<span className="">食材 : {shoppingList.servings}人分</span>
							</div>
						</div>
					</div>
				</section>

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
							食材
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
		</>
	);
};

export default RecipeListDetail;
