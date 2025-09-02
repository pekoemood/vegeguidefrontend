import axios, { type AxiosError } from "axios";
import { useEffect, useState } from "react";
import { api } from "../utils/axios";

const useVegeNames = () => {
	const [vegeNames, setVegeNames] = useState<string[]>([]);
	const [error, setError] = useState<AxiosError | null>(null);
	const [loading, setLoading] = useState<boolean>(true);

	useEffect(() => {
		const fetchVegeNames = async () => {
			try {
				const response = await api.get<{ names: string[] }>(
					"/vegetables/names",
				);
				setVegeNames(response.data.names);
			} catch (error) {
				console.error("野菜の名前一覧の取得に失敗しました", error);
				if (axios.isAxiosError(error)) {
					setError(error);
				}
			} finally {
				setLoading(false);
			}
		};
		fetchVegeNames();
	}, []);

	return { vegeNames, error, loading };
};

export default useVegeNames;
