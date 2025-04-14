import { Outlet } from "react-router";
import Footer from "./components/Footer";
import Navibar from "./components/Navibar";

const Layout = () => {
	return (
		<>
			<Navibar />
			<Outlet />
			<Footer />
		</>
	);
	l;
};

export default Layout;
