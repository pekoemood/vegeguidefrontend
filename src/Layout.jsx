import { Outlet } from "react-router";
import Footer from "./components/Footer";
import Navibar from "./components/Navibar";
import { UserProvider } from "./context/UserContext";

const Layout = () => {
	return (
		<>
		<div className="flex flex-col min-h-screen">
			<UserProvider>
					<Navibar />
					<div className="flex-grow">
						<Outlet />
					</div>
					<Footer />
			</UserProvider>
		</div>

		</>
	);
	l;
};

export default Layout;
