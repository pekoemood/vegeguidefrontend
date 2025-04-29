import { Outlet } from "react-router";
import Footer from "./components/Footer";
import Navibar from "./components/Navibar";
import { UserProvider } from "./context/UserContext";

const Layout = () => {
	return (
		<>
			<UserProvider>
				<Navibar />
				<Outlet />
				<Footer />
			</UserProvider>
		</>
	);
	l;
};

export default Layout;
