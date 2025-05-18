import { useState, useTransition } from "react";
import { useNavigate } from "react-router";

const RecipeGenerator = ({ vegetableName, id }) => {
	const navigate = useNavigate();

	const handleClick = () => {
		navigate("/recipe-generator", { state: { selectedVegetableId: id} })
	}



	return (
		<div className="p-6 mt-4 rounded-2xl shadow-lg space-y-4">
			<h2 className="text-xl font-semibold text-primary ">
				{vegetableName}を使ったレシピ
			</h2>
			<p>AIが{vegetableName}を使ったおすすめレシピを提案します。</p>
			<div className="text-center mt-10">
				<button onClick={handleClick} className="btn btn-neutral">{vegetableName}のレシピ提案を見る</button>
			</div>
		</div>
	);
};

export default RecipeGenerator;
