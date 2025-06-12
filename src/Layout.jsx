import { Outlet, useNavigation } from "react-router";
import Footer from "./components/Footer";
import Navibar from "./components/Navibar";
import { UserProvider } from "./context/UserContext";


const Layout = () => {
	const navigation = useNavigation();
	const isNavigating = Boolean(navigation.location);

	return (
		<>
			<div className="flex flex-col min-h-screen">
				<UserProvider>
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
				</UserProvider>
			</div>
		</>
	);
};

export default Layout;
