import axios from "axios";
import { createContext, useEffect, useState } from "react";

export const UserContext = createContext();

export const UserProvider = ({ children }) => {
	const [user, setUser] = useState(null);
	const [loading, setLoading] = useState(true);

	const fetchUser = async () => {
		try {
			const response = await axios.get(
				`${import.meta.env.VITE_RAILS_API}/check_login_status`,
				{
					withCredentials: true,
				},
			);
			if (response.data.logged_in) {
				setUser(response.data);
			} else {
				setUser(null);
			}
		} catch (error) {
			setUser(null);
		} finally {
			setLoading(false);
		}
	};

	useEffect(() => {
		fetchUser();
	}, []);

	return (
		<UserContext value={{ user, setUser, loading, fetchUser }}>
			{children}
		</UserContext>
	);
};
