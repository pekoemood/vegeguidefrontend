import { createBrowserRouter } from "react-router";
import Layout from "../Layout";
import Login from "../pages/Login/Login";
import ShoppingList from "../pages/ShoppingList/ShoppingList";
import SignUp from "../pages/SignUp/SignUp";
import Top from "../pages/Top/Top";
import VegeDetail from "../pages/VegeDetail/VegeDetail";
import { vegeDetailLoader } from "../pages/VegeDetail/vegeDetailLoader";
import VegeList from "../pages/VegeList/VegeList";
import { vegeListLoader } from "../pages/VegeList/vegeListLoader";
import ShoppingListDetail from "../pages/ShoppingListDetail/ShoppingListDetail";
import shoppingListLoader from "../pages/ShoppingList/shoppingListLoader";
import { shoppingListDetailLoader } from "../pages/ShoppingListDetail/shoppingListDetailLoader";


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
		],
	},
]);
