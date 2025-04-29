import fs from "fs";
import path from "path";
import tailwindcss from "@tailwindcss/vite";
import react from "@vitejs/plugin-react-swc";
import { defineConfig } from "vite";

// https://vite.dev/config/
export default defineConfig({
	plugins: [react(), tailwindcss()],
	server: {
		https: {
			key: fs.readFileSync(path.resolve(__dirname, "certs/localhost-key.pem")),
			cert: fs.readFileSync(path.resolve(__dirname, "certs/localhost.pem")),
		},
		port: 5173,
	},
});
