import { ChefHat, Search, X } from "lucide-react";
import { useEffect, useState, useTransition } from "react";
import toast from "react-hot-toast";
import { useLoaderData, useLocation, useNavigate } from "react-router";
import Meta from "../../components/Meta";
import { api } from "../../utils/axios";
import VegetableCard from "./VegetableCard";

const RecipeGeneratorPage = () => {
	const location = useLocation();
	const { data } = useLoaderData();
	const [vegeName, setVegeName] = useState("");
	const [selectedVegetables, setSelectedVegetables] = useState(() =>
		location.state?.selectedVegetableId
			? [location.state.selectedVegetableId]
			: [],
	);
	const [cookingTime, setCookingTime] = useState("30分〜1時間");
	const [calorie, setCalorie] = useState("700");
	const [category, setCategory] = useState("主菜");
	const [purpose, setPurpose] = useState("普段使い");
	const [servings, setServings] = useState(1);
	const [cookingMethod, setCookingMethod] = useState("指定なし");
	const [recipe, setRecipe] = useState(null);
	const [isPending, startTransition] = useTransition();
	const [isSaving, startSaving] = useTransition();
	const navigation = useNavigate();
	const [recipeImage, setRecipeImage] = useState(null);

	const filterVegetables = data.filter((vegetable) =>
		vegetable.name.toLowerCase().includes(vegeName.toLowerCase()),
	);

	const toggleVegetable = (id) => {
		if (selectedVegetables.includes(id)) {
			setSelectedVegetables((prev) => prev.filter((vegeId) => vegeId !== id));
		} else {
			setSelectedVegetables((prev) => [...prev, id]);
		}
	};

	const RecipeGenerator = () => {
		startTransition(async () => {
			try {
				const selectedVegetableNames = selectedVegetables
					.map((id) => {
						const veg = data.find((v) => v.id === id);
						return veg ? veg.name : null;
					})
					.filter(Boolean);

				const response = await api.post(`/recipe_generations`, {
					cookingTime,
					calorie,
					category,
					purpose,
					servings,
					cookingMethod,
					selectedVegetables: selectedVegetableNames,
				});
				console.log("レシピのレスポンス:", response.data);
				setRecipe(response.data[0]);
			} catch (error) {
				console.error(error);
			}
		});
	};

	const handleClickSave = () => {
		startSaving(async () => {
			try {
				await api.post(`/recipes`, {
					...recipe,
					image_id: recipeImage.image_id,
				});
				navigation("/recipe-lists");
				toast.success("レシピを保存しました");
			} catch (error) {
				console.error(error);
			}
		});
	};

	console.log(recipe);

	useEffect(() => {
		const getRecipeImage = async () => {
			try {
				const response = await api.post("/recipe_image_generations", {
					recipe: {
						name: recipe.name,
						ingredients: recipe.ingredients,
					},
				});
				setRecipeImage(response.data);
			} catch (err) {
				console.error(err);
			}
		};
		getRecipeImage();
	}, [recipe]);

	console.log("レシピイメージ:", recipeImage);

	return (
		<>
			<Meta
				title="レシピ提案"
				description="あなたの冷蔵庫にある食材からぴったりのレシピを提案します。今日の献立に迷ったらこちら！"
			/>
			<main className="container mx-auto px-4 py-8">
				<h1 className="text-2xl font-bold">レシピ提案</h1>

				<div className="flex flex-wrap gap-2">
					{selectedVegetables.length > 0 ? (
						selectedVegetables.map((id) => {
							const veg = data.find((v) => v.id === id);
							return (
								<span key={veg.id} className="badge mt-4">
									{veg?.name}
									<button
										className="hover: cursor-pointer"
										onClick={() => toggleVegetable(id)}
									>
										<X size={15} />
									</button>
								</span>
							);
						})
					) : (
						<p className="mt-4 text-neutral-500">野菜を選択してください</p>
					)}
				</div>

				<div className="mt-8 w-full">
					<label className="input input-primary w-full" htmlFor="name">
						<Search className="text-neutral-500" size={15} />
						<input
							id="name"
							type="text"
							placeholder="野菜を検索"
							value={vegeName}
							onChange={(e) => setVegeName(e.target.value)}
						/>
					</label>
				</div>

				<div className="mt-8 overflow-x-auto">
					<div className="flex gap-4 w-max py-4">
						{filterVegetables.map((vegetable) => (
							<VegetableCard
								key={vegetable.id}
								id={vegetable.id}
								name={vegetable.name}
								img={vegetable.image_url}
								onClick={() => toggleVegetable(vegetable.id)}
								selected={selectedVegetables.includes(vegetable.id)}
							/>
						))}
					</div>
				</div>

				<section>
					<h2 className="text-xl font-semibold mt-8">レシピ条件設定</h2>
					<div className="flex flex-col md:grid md:grid-cols-2 gap-6 mt-4">
						<div className="space-y-2 flex flex-col">
							<label className="label" htmlFor="cookingTime">
								調理時間
							</label>
							<select
								className="select w-full"
								id="cookingTime"
								value={cookingTime}
								onChange={(e) => setCookingTime(e.target.value)}
							>
								<option value="30分以内">時短（30分以内）</option>
								<option value="30分〜1時間">普通（30分〜1時間）</option>
								<option value="１時間以上">じっくり（１時間以上）</option>
							</select>
						</div>
						<div className="space-y-2 flex flex-col">
							<label className="label" htmlFor="calorie">
								カロリー範囲
							</label>
							<select
								className="select w-full"
								id="calorie"
								value={calorie}
								onChange={(e) => setCalorie(e.target.value)}
							>
								<option value="400">低カロリー（〜400kcal）</option>
								<option value="700">標準カロリー（400〜700kcal）</option>
								<option value="9999">高カロリー（700kcal〜）</option>
							</select>
						</div>
						<div className="space-y-2 flex flex-col mt-4">
							<label className="label" htmlFor="category">
								料理カテゴリ
							</label>
							<select
								className="select w-full"
								id="category"
								value={category}
								onChange={(e) => setCategory(e.target.value)}
							>
								<option value="主菜">主菜</option>
								<option value="副菜">副菜</option>
								<option value="スープ">スープ</option>
								<option value="サラダ">サラダ</option>
								<option value="ご飯もの">ご飯もの</option>
								<option value="麺類">麺類</option>
								<option value="和食">和食</option>
								<option value="洋食">洋食</option>
								<option value="中華">中華</option>
								<option value="エスニック">エスニック</option>
								<option value="デザート">デザート</option>
							</select>
						</div>
						<div className="space-y-2 flex flex-col mt-4">
							<label className="label" htmlFor="purpose">
								目的・シーン
							</label>
							<select
								className="select w-full"
								id="purpose"
								value={purpose}
								onChange={(e) => setPurpose(e.target.value)}
							>
								<option value="普段使い">普段使い</option>
								<option value="時短・スピード">時短・スピード</option>
								<option value="作り置き">作り置き</option>
								<option value="ダイエット・ヘルシー">
									ダイエット・ヘルシー
								</option>
								<option value="おもてなし">おもてなし</option>
							</select>
						</div>
						<div className="space-y-2 flex flex-col mt-4">
							<label className="label" htmlFor="servings">
								分量(何人分)
							</label>
							<select
								className="select w-full"
								id="servings"
								value={servings}
								onChange={(e) => setServings(Number(e.target.value))}
							>
								<option value="1">1人分</option>
								<option value="2">2人分</option>
								<option value="3">3人分</option>
								<option value="4">4人分</option>
							</select>
						</div>
						<div className="space-y-2 flex flex-col mt-4">
							<label className="label" htmlFor="cookingMethod">
								調理方法
							</label>
							<select
								className="select w-full"
								id="cookingMethod"
								value={cookingMethod}
								onChange={(e) => setCookingMethod(e.target.value)}
							>
								<option value="指定なし">指定なし</option>
								<option value="電子レンジ">電子レンジ</option>
								<option value="フライパン">フライパン</option>
								<option value="鍋">鍋</option>
								<option value="オーブン">オープン</option>
							</select>
						</div>

						<button
							type="button"
							onClick={RecipeGenerator}
							className="mt-4 btn btn-neutral col-span-2"
							disabled={isPending || selectedVegetables.length === 0}
						>
							レシピを提案する
						</button>
					</div>
				</section>

				<section className="mt-8 flex flex-col items-center space-y-4">
					{isPending ? (
						<span className="loading loading-spinner loading-xl"></span>
					) : (
						!recipe && (
							<>
								<ChefHat className="text-primary" size={40} />
								<h2 className="text-xl font-semibold">レシピを提案します</h2>
								<div className="text-center text-neutral-500">
									<p>
										上の画面から野菜とレシピ条件設定を選んで、「レシピを提案する」をクリックしてください
									</p>
									<p>AIがあなたの選んだ条件に合わせたレシピを提案します。</p>
								</div>
							</>
						)
					)}

					{recipe && (
						<div className="container mx-auto px-4 flex flex-col lg:flex-row items-center">
							<div className="lg:w-1/2 md:80 lg:h-140">
								{recipeImage ? (
									<img
										src={recipeImage.image_url}
										alt="料理画像"
										className="rounded-lg w-full h-full object-cover"
									/>
								) : (
									<div className="skeleton h-full w-full"></div>
								)}
							</div>
							<div className="p-2 md:p-6 lg:w-1/2">
								<div className="flex flex-col justify-between items-start space-y-2 mb-4">
									<div>
										<h2 className="text-start text-xl font-semibold">
											{recipe.name}
										</h2>
										<p className="text-xs md:text-base text-neutral-500 mt-1">
											{recipe.instructions}
										</p>
									</div>
									<div className="flex flex-wrap gap-2">
										<div className="flex items-center badge badge-secondary">
											料理カテゴリ: {recipe.recipe_category}
										</div>
										<div className="flex items-center badge badge-secondary">
											カロリー: {recipe.calorie}kcal
										</div>
										<div className="flex items-center badge badge-secondary">
											調理時間: {recipe.cooking_time}分
										</div>
										<div className="flex items-center badge badge-secondary">
											目的・シーン: {recipe.purpose}
										</div>
									</div>
								</div>

								<div>
									<h3 className="font-semibold text-lg flex items-center mb-2">
										食材
										{
											<span className="text-sm font-normal ml-2">
												({recipe.servings}人分)
											</span>
										}
									</h3>
									<div className="rounded-md p-4">
										<ul className="flex flex-wrap gap-2">
											{recipe.ingredients?.map((ingredient, index) => (
												<li
													key={index}
													className="flex items-center gap-1 text-xs md:text-base"
												>
													<span className="badge badge-neutral badge-xs"></span>
													{ingredient.name} {ingredient?.display_amount}
												</li>
											))}
										</ul>
									</div>
								</div>

								<hr className="border-t border-base-300 my-6" />

								<div className="flex flex-col">
									<h3 className="font-semibold text-lg flex items-center mb-4">
										調理手順
									</h3>
									<ul className="steps steps-vertical">
										{(recipe?.step ?? []).map((st, index) => (
											<li key={index} className="step flex">
												<p className="text-left text-xs md:text-base">
													{st?.description}
												</p>
											</li>
										))}
									</ul>
								</div>

								<div className="flex justify-end gap-3 mt-6">
									<button
										onClick={handleClickSave}
										className="btn relative"
										disabled={isPending}
									>
										<span className={isSaving ? "invisible" : ""}>
											レシピを保存
										</span>
										{isSaving && (
											<span className="absolute left-1/2 -translate-x-1/2 loading loading-spinner loading-md"></span>
										)}
									</button>
								</div>
							</div>
						</div>
					)}
				</section>
			</main>
		</>
	);
};

export default RecipeGeneratorPage;
