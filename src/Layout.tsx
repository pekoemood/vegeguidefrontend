import type React from "react";
import { useEffect } from "react";
import ReactGA from "react-ga4";
import { Toaster } from "react-hot-toast";
import {
	Outlet,
	ScrollRestoration,
	useLocation,
	useNavigation,
} from "react-router";
import Footer from "./components/Footer";
import Navibar from "./components/Navibar";
import { UserProvider } from "./context/UserContext";

const GAListener: React.FC = () => {
	const location = useLocation();
	useEffect(() => {
		ReactGA.send({
			hitType: "pageview",
			page: location.pathname + location.search,
		});
	}, [location]);
	return null;
};

const Layout: React.FC = () => {
	const navigation = useNavigation();
	const isNavigating = navigation.state === "loading";

	return (
		<>
			<div className="flex flex-col min-h-screen">
				<UserProvider>
					<GAListener />
					<ScrollRestoration />
					<Navibar />
					{isNavigating && (
						<div className="fixed inset-0 flex items-center justify-center bg-base-300/50 z-50">
							<span className="loading loading-dots loading-xl"></span>
						</div>
					)}
					<div className="flex-grow">
						<Outlet />
					</div>
					<Footer />
					<Toaster />
				</UserProvider>
			</div>
		</>
	);
};

export default Layout;
