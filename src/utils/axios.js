import axios from "axios";

export const api = axios.create({
	baseURL: `${import.meta.env.VITE_RAILS_API}`,
	withCredentials: true,
	timeout: 10000,
});
