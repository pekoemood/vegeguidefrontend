import { createBrowserRouter } from "react-router";
import Layout from "../Layout";
import Login from "../pages/Login/Login";
import Top from "../pages/Top/Top";
import VegeDetail from "../pages/VegeDetail/VegeDetail";
import { vegeDetailLoader } from "../pages/VegeDetail/vegeDetailLoader";
import VegeList from "../pages/VegeList/VegeList";
import { vegeListLoader } from "../pages/VegeList/vegeListLoader";
import { TopLoader } from "../pages/Top/TopLoader";

export const routes = createBrowserRouter([
	{
		Component: Layout,
		hydrateFallbackElement: <p>Loading...</p>,
		children: [
			{
				index: true,
				Component: Top,
				loader: TopLoader,
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
