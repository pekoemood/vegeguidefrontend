import { useNavigate } from "react-router";
import { UserContext } from "../context/UserContext";
import { useContext } from "react";
import toast from "react-hot-toast";
import { ChefHat } from 'lucide-react';

type Props = {
	vegetableName: string;
	id: number;
};

const RecipeGenerator = ({ vegetableName, id }: Props) => {
	const navigate = useNavigate();
	const { user } = useContext(UserContext);

	const handleClick = (): void => {
		if (!user) {
			toast.error('レシピ機能をご利用いただくにはログインが必要です');
			navigate("/login");
			return;
		}

		navigate("/recipe-generator", { state: { selectedVegetableId: id } });
	};

	return (
		<div className="p-6 mt-4 rounded-2xl shadow-lg space-y-4">
			<h2 className="text-xl font-semibold text-primary flex items-center gap-2">
				<ChefHat className="w-5 h-5 text-primary" />
				{vegetableName}を使ったレシピ
			</h2>
			<p>AIが{vegetableName}を使ったおすすめレシピを提案します。</p>
			<div className="text-center mt-10">
				<button onClick={handleClick} className="btn btn-neutral">
					{vegetableName}のレシピ提案を見る
				</button>
			</div>
		</div>
	);
};

export default RecipeGenerator;
