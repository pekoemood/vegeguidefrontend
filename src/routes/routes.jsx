import { createBrowserRouter } from "react-router";
import Layout from "../Layout";
import FridgeItems from "../pages/FridgeItems/FridgeItems";
import { fridgeItemsLoader } from "../pages/FridgeItems/fridgeItemsLoader";
import Login from "../pages/Login/Login";
import RecipeGeneratorPage from "../pages/RecipeGenerator/RecipeGeneratorPage";
import recipeGeneratorLoader from "../pages/RecipeGenerator/recipeGeneratorLoader";
import RecipeLists from "../pages/RecipeLists/RecipeLists";
import { recipeListsLoader } from "../pages/RecipeLists/recipeListsLoader";
import RecipeListDetail from "../pages/RecipesListDetail/RecipeListDetail";
import { recipeListDetailLoader } from "../pages/RecipesListDetail/recipeListDetailLoader";
import ShoppingList from "../pages/ShoppingList/ShoppingList";
import shoppingListLoader from "../pages/ShoppingList/shoppingListLoader";
import ShoppingListDetail from "../pages/ShoppingListDetail/ShoppingListDetail";
import { shoppingListDetailLoader } from "../pages/ShoppingListDetail/shoppingListDetailLoader";
import SignUp from "../pages/SignUp/SignUp";
import Top from "../pages/Top/Top";
import VegeDetail from "../pages/VegeDetail/VegeDetail";
import { vegeDetailLoader } from "../pages/VegeDetail/vegeDetailLoader";
import VegeList from "../pages/VegeList/VegeList";
import { vegeListLoader } from "../pages/VegeList/vegeListLoader";
import NotFoundPage from "../pages/NotFoundPage/NotFoundPage";

export const routes = createBrowserRouter([
	{
		Component: Layout,
		hydrateFallbackElement: <p>Loading...</p>,
		errorElement: <NotFoundPage />,
		children: [
			{
				index: true,
				Component: Top,
			},
			{
				path: "/signup",
				Component: SignUp,
			},
			{
				path: "/login",
				Component: Login,
			},
			{
				path: "/vegelist",
				Component: VegeList,
				loader: vegeListLoader,
			},
			{
				path: "/vegelist/:id",
				Component: VegeDetail,
				loader: vegeDetailLoader,
			},
			{
				path: "/shoppinglist",
				Component: ShoppingList,
				loader: shoppingListLoader,
			},
			{
				path: "/shoppinglist/:id",
				Component: ShoppingListDetail,
				loader: shoppingListDetailLoader,
			},
			{
				path: "/recipe-lists",
				Component: RecipeLists,
				loader: recipeListsLoader,
			},
			{
				path: "/recipe-lists/:id",
				Component: RecipeListDetail,
				loader: recipeListDetailLoader,
			},
			{
				path: "/recipe-generator",
				Component: RecipeGeneratorPage,
				loader: recipeGeneratorLoader,
			},
			{
				path: "/fridge-items",
				Component: FridgeItems,
				loader: fridgeItemsLoader,
			},
		],
	},
]);
