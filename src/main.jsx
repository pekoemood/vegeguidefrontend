import { GoogleOAuthProvider } from "@react-oauth/google";
import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { RouterProvider } from "react-router";
import { routes } from "./routes/routes.jsx";
import ReactGA from 'react-ga4';

ReactGA.initialize(import.meta.env.VITE_GA_MEASUREMENT_ID);



createRoot(document.getElementById("root")).render(
	<StrictMode>
		<GoogleOAuthProvider clientId={import.meta.env.VITE_GOOGLE_CLIENT_ID}>
			<RouterProvider router={routes}/>
		</GoogleOAuthProvider>
	</StrictMode>,
);
