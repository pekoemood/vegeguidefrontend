import { useEffect, useState } from "react";
import { api } from "../utils/axios";

const useVegeNames = () => {
	const [vegeNames, setVegeNames] = useState([]);
	const [error, setError] = useState(null);
	const [loading, setLoading] = useState(true);

	useEffect(() => {
		const fetchVegeNames = async () => {
			try {
				const response = await api.get("/vegetables/names");
				setVegeNames(response.data.names);
			} catch (error) {
				console.error("野菜の名前一覧の取得に失敗しました", error);
				setError(error);
			} finally {
				setLoading(false);
			}
		};
		fetchVegeNames();
	}, []);

	return { vegeNames, error, loading };
};

export default useVegeNames;
