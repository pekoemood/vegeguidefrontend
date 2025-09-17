import axios, { type AxiosInstance } from "axios";

let csrfToken: string | undefined

export const setCsrfToken = (token: string | undefined) => {
	csrfToken = token;
};


export const api: AxiosInstance = axios.create({
	baseURL: `${import.meta.env.VITE_RAILS_API}`,
	withCredentials: true,
	timeout: 30000,
});

api.interceptors.request.use((config) => {
	if (csrfToken) {
		config.headers['X-CSRF-Token'] = csrfToken;
	}
	return config;
});

api.interceptors.response.use((response) => {
	const newToken = response.headers['x-csrf-token'];
	if (newToken) {
		setCsrfToken(newToken);
	}
	return response;
},
(error) => {
	const newToken = error.response?.headers['x-csrf-token'];
	if (newToken) {
		setCsrfToken(newToken);
	}
	return Promise.reject(error);
}
)
