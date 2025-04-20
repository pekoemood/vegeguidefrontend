import { createBrowserRouter } from "react-router";
import Layout from "../Layout";
import Login from "../pages/Login/Login";
import Top from "../pages/Top/Top";
import VegeList from "../pages/VegeList/VegeList";
import { vegeListLoader } from "../pages/VegeList/vegeListLoader";
import VegeDetail from "../pages/VegeDetail/VegeDetail";
import { vegeDetailLoader } from "../pages/VegeDetail/vegeDetailLoader";

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
		],
	},
]);
