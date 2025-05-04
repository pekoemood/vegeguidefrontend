import { createBrowserRouter } from "react-router";
import Layout from "../Layout";
import Login from "../pages/Login/Login";
import RecipeLists from "../pages/RecipeLists/RecipeLists";
import { recipeListsLoader } from "../pages/RecipeLists/recipeListsLoader";
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

export const routes = createBrowserRouter([
	{
		Component: Layout,
		hydrateFallbackElement: <p>Loading...</p>,
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
		],
	},
]);
