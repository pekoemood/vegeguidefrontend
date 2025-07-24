import { useEffect, useState } from "react";
import { api } from "../utils/axios";

type VegeName = string;

const useVegeNames = () => {
	const [vegeNames, setVegeNames] = useState<VegeName[]>([]);
	const [error, setError] = useState<Error | null>(null);
	const [loading, setLoading] = useState<boolean>(true);

	useEffect(() => {
		const fetchVegeNames = async () => {
			try {
				const response = await api.get<{ names: VegeName[] }>(
					"/vegetables/names",
				);
				setVegeNames(response.data.names);
			} catch (error) {
				console.error("野菜の名前一覧の取得に失敗しました", error);
				if (error instanceof Error) {
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
