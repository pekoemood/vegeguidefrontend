import axios from "axios";
import { ChefHat, Search, X } from "lucide-react";
import { useEffect, useState, useTransition } from "react";
import toast from "react-hot-toast";
import { useLoaderData, useLocation, useNavigate } from "react-router";
import GenerateRecipeArea from "../../components/GenerateRecipeArea";
import Meta from "../../components/Meta";
import RecipeSkeleton from "../../components/RecipeSkeleton";
import type { RecipeImage, RecipeResponse } from "../../types/apiResponse";
import type { VegetableSummary } from "../../types/vegetable";
import { api } from "../../utils/axios";
import VegetableCard from "./VegetableCard";

const RecipeGeneratorPage = () => {
	const location = useLocation();
	const data = useLoaderData<VegetableSummary[]>();
	const [vegeName, setVegeName] = useState<string>("");
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
	const [recipe, setRecipe] = useState<RecipeResponse | null>(null);
	const [isPending, startTransition] = useTransition();
	const [isSaving, startSaving] = useTransition();
	const navigation = useNavigate();
	const [recipeImage, setRecipeImage] = useState<RecipeImage | null>(null);

	const filterVegetables = data.filter((vegetable) =>
		vegetable.name.toLowerCase().includes(vegeName.toLowerCase()),
	);

	const toggleVegetable = (id: number) => {
		if (selectedVegetables.includes(id)) {
			setSelectedVegetables((prev) => prev.filter((vegeId) => vegeId !== id));
		} else {
			setSelectedVegetables((prev) => [...prev, id]);
		}
	};

	const getCalorieLabel = (calorie: string) => {
		const cal = Number(calorie);
		if (cal <= 400) return "軽め";
		if (cal <= 700) return "標準";
		return "しっかり";
	};

	const RecipeGenerator = () => {
		startTransition(async () => {
			try {
				setRecipe(null);
				setRecipeImage(null);
				const selectedVegetableNames = selectedVegetables
					.map((id) => {
						const veg = data.find((v) => v.id === id);
						return veg ? veg.name : null;
					})
					.filter(Boolean);

				const response = await api.post<RecipeResponse>(`/recipe_generations`, {
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

	const handleClickSave = (): void => {
		startSaving(async () => {
			try {
				await api.post(`/recipes`, {
					...recipe,
					image_id: recipeImage?.image_id,
				});
				navigation("/recipe-lists");
				toast.success("レシピを保存しました");
			} catch (error) {
				console.error(error);
			}
		});
	};

	useEffect(() => {
		if (!recipe) return;

		const getRecipeImage = async () => {
			try {
				const response = await api.post<RecipeImage>(
					"/recipe_image_generations",
					{
						recipe: {
							name: recipe.name,
							ingredients: recipe.ingredients,
						},
					},
				);
				setRecipeImage(response.data);
			} catch (err) {
				console.error(err);
				if (axios.isAxiosError(err)) {
					const message = err.response?.data?.error ?? "エラーが発生しました";
					toast.error(message);
				} else {
					toast.error("エラーが発生しました");
				}
			}
		};
		getRecipeImage();
	}, [recipe]);

	return (
		<>
			<Meta
				title="レシピ提案"
				description="あなたの冷蔵庫にある食材からぴったりのレシピを提案します。今日の献立に迷ったらこちら！"
			/>
			<main className="container mx-auto px-4 py-8 animate-fade-up">
				<h1 className="text-2xl font-bold">レシピ提案</h1>

				<div className="space-y-3 mb-6">
					<div className="flex items-center gap-2">
						<h3 className="text-sm font-semibold text-base-content">
							選択中の野菜
						</h3>
						{selectedVegetables.length > 0 && (
							<span className="badge badge-primary badge-sm">
								{selectedVegetables.length}個
							</span>
						)}
					</div>
					<div className="flex flex-wrap gap-2">
						{selectedVegetables.length > 0 ? (
							selectedVegetables.map((id) => {
								const veg = data.find((v) => v.id === id);
								if (!veg) return null;
								return (
									<div
										key={veg.id}
										className="badge badge-primary gap-2 py-3 px-3"
									>
										<span className="text-primary-content font-medium">
											{veg.name}
										</span>
										<button
											className="btn btn-ghost btn-xs text-primary-content hover:bg-primary-focus rounded-full w-4 h-4 min-h-0 p-0"
											onClick={() => toggleVegetable(id)}
											aria-label={`${veg.name}を選択から除外`}
										>
											<X size={12} />
										</button>
									</div>
								);
							})
						) : (
							<div className="flex items-center gap-2 text-base-content/60">
								<div className="w-2 h-2 bg-base-content/30 rounded-full"></div>
								<p>野菜を選択してください</p>
							</div>
						)}
					</div>
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

				<div className="mt-8">
					<h3 className="text-sm font-semibold text-base-content mb-4">
						野菜を選択
					</h3>
					<div className="grid grid-cols-2 sm:grid-cols-4 md:grid-cols-6 lg:grid-cols-8 gap-4 md:hidden">
						{filterVegetables.slice(0, 12).map((vegetable, index) => (
							<div
								key={vegetable.id}
								className="animate-fade-up"
								style={{
									animationDelay: `${index * 0.05}s`,
									animationFillMode: "both",
								}}
							>
								<VegetableCard
									id={vegetable.id}
									name={vegetable.name}
									img={vegetable.image_url}
									onClick={() => toggleVegetable(vegetable.id)}
									selected={selectedVegetables.includes(vegetable.id)}
								/>
							</div>
						))}
					</div>
					<div className="hidden md:block overflow-x-auto">
						<div className="flex gap-4 w-max py-4">
							{filterVegetables.map((vegetable, index) => (
								<div
									key={vegetable.id}
									className="animate-fade-up"
									style={{
										animationDelay: `${index * 0.05}s`,
										animationFillMode: "both",
									}}
								>
									<VegetableCard
										id={vegetable.id}
										name={vegetable.name}
										img={vegetable.image_url}
										onClick={() => toggleVegetable(vegetable.id)}
										selected={selectedVegetables.includes(vegetable.id)}
									/>
								</div>
							))}
						</div>
					</div>
					{filterVegetables.length > 12 && (
						<div className="md:hidden mt-4 text-center">
							<p className="text-sm text-base-content/60">
								検索で絞り込むと、より多くの野菜が表示されます
							</p>
						</div>
					)}
				</div>

				<section
					className="animate-fade-up"
					style={{ animationDelay: "0.3s", animationFillMode: "both" }}
				>
					<h2 className="text-xl font-semibold mt-8">レシピ条件設定</h2>
					<div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mt-6">
						{/* 調理時間とカロリー設定を上段に配置 */}
						<div className="bg-base-100 p-6 rounded-xl border border-base-300 shadow-sm">
							<label className="label">
								<span className="label-text text-base font-semibold flex items-center gap-2">
									⏰ 調理時間
								</span>
							</label>
							<div className="grid grid-cols-3 gap-3 mt-3">
								{[
									{ value: "30分以内", icon: "⚡", label: "時短", desc: "30分以内" },
									{ value: "30分〜1時間", icon: "🍳", label: "普通", desc: "30分〜1時間" },
									{ value: "１時間以上", icon: "🔥", label: "じっくり", desc: "1時間以上" }
								].map((option) => (
									<button
										key={option.value}
										type="button"
										onClick={() => setCookingTime(option.value)}
										className={`
											p-3 border-2 rounded-lg transition-all duration-200 text-center hover:scale-105
											${cookingTime === option.value 
												? "border-primary bg-primary/10 text-primary shadow-md scale-105" 
												: "border-base-300 hover:border-primary/50 hover:bg-base-100"
											}
										`}
									>
										<div className="text-xl mb-1">{option.icon}</div>
										<div className="font-semibold text-xs">{option.label}</div>
										<div className="text-xs text-base-content/60 mt-1">{option.desc}</div>
									</button>
								))}
							</div>
						</div>

						<div className="bg-base-100 p-6 rounded-xl border border-base-300 shadow-sm">
							<label className="label" htmlFor="calorie">
								<span className="label-text text-base font-semibold flex items-center gap-2">
									🔥 カロリー目安: <span className="font-bold text-primary">{calorie}kcal</span> 
									<span className="text-sm text-base-content/60">({getCalorieLabel(calorie)})</span>
								</span>
							</label>
							<div className="mt-4">
								<input
									type="range"
									min="200"
									max="1000"
									step="50"
									value={calorie}
									onChange={(e) => setCalorie(e.target.value)}
									className="range range-primary w-full"
									id="calorie"
								/>
								<div className="flex justify-between text-xs text-base-content/60 px-2 mt-2">
									<div className="text-center">
										<div>200kcal</div>
										<div className="font-medium">軽め</div>
									</div>
									<div className="text-center">
										<div>600kcal</div>
										<div className="font-medium">標準</div>
									</div>
									<div className="text-center">
										<div>1000kcal</div>
										<div className="font-medium">しっかり</div>
									</div>
								</div>
							</div>
						</div>
					</div>

					{/* 料理カテゴリを全幅で配置 */}
					<div className="bg-base-100 p-6 rounded-xl border border-base-300 shadow-sm mt-6">
						<label className="label">
							<span className="label-text text-base font-semibold flex items-center gap-2">
								🍽️ 料理カテゴリ
							</span>
						</label>
						<div className="grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-6 gap-2 mt-3">
							{[
								{ value: "主菜", icon: "🍖" },
								{ value: "副菜", icon: "🥗" },
								{ value: "スープ", icon: "🍲" },
								{ value: "サラダ", icon: "🥙" },
								{ value: "ご飯もの", icon: "🍚" },
								{ value: "麺類", icon: "🍜" },
								{ value: "和食", icon: "🍱" },
								{ value: "洋食", icon: "🍝" },
								{ value: "中華", icon: "🥟" },
								{ value: "エスニック", icon: "🍛" },
								{ value: "デザート", icon: "🍰" }
							].map((cat) => (
								<button
									key={cat.value}
									type="button"
									onClick={() => setCategory(cat.value)}
									className={`
										p-3 rounded-lg border-2 transition-all duration-200 hover:scale-105
										${category === cat.value 
											? "border-primary bg-primary/10 text-primary shadow-md scale-105" 
											: "border-base-300 hover:border-primary/50 hover:bg-base-100"
										}
									`}
								>
									<div className="text-lg mb-1">{cat.icon}</div>
									<div className="text-xs font-medium">{cat.value}</div>
								</button>
							))}
						</div>
					</div>

					<div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mt-6">
						{/* 目的・シーンと分量を下段に配置 */}
						<div className="bg-base-100 p-6 rounded-xl border border-base-300 shadow-sm">
							<label className="label">
								<span className="label-text text-base font-semibold flex items-center gap-2">
									🎯 目的・シーン
								</span>
							</label>
							<div className="flex flex-wrap gap-2 mt-3">
								{[
									{ value: "普段使い", color: "badge-neutral", icon: "🏠" },
									{ value: "時短・スピード", color: "badge-primary", icon: "⚡" },
									{ value: "作り置き", color: "badge-secondary", icon: "📦" },
									{ value: "ダイエット・ヘルシー", color: "badge-accent", icon: "🥬" },
									{ value: "おもてなし", color: "badge-info", icon: "🎉" }
								].map((option) => (
									<button
										key={option.value}
										type="button"
										onClick={() => setPurpose(option.value)}
										className={`
											badge badge-lg cursor-pointer transition-all duration-200 hover:scale-105 flex items-center gap-1 py-3 px-4
											${purpose === option.value 
												? `${option.color} scale-110 shadow-md` 
												: "badge-outline hover:bg-base-200"
											}
										`}
									>
										<span className="text-sm">{option.icon}</span>
										<span className="font-medium">{option.value}</span>
									</button>
								))}
							</div>
						</div>

						<div className="bg-base-100 p-6 rounded-xl border border-base-300 shadow-sm">
							<label className="label">
								<span className="label-text text-base font-semibold flex items-center gap-2">
									👥 分量
								</span>
							</label>
							<div className="flex items-center justify-center gap-4 mt-4">
								<button
									type="button"
									onClick={() => setServings(Math.max(1, servings - 1))}
									className="btn btn-outline btn-circle"
									disabled={servings <= 1}
								>
									−
								</button>
								<div className="text-center min-w-[100px] px-4 py-2 bg-base-200 rounded-lg">
									<div className="text-3xl font-bold text-primary">{servings}</div>
									<div className="text-sm text-base-content/60">人分</div>
								</div>
								<button
									type="button"
									onClick={() => setServings(Math.min(10, servings + 1))}
									className="btn btn-outline btn-circle"
									disabled={servings >= 10}
								>
									＋
								</button>
							</div>
							<div className="text-center text-xs text-base-content/60 mt-3">
								1〜10人分まで設定可能
							</div>
						</div>
					</div>

					{/* 調理方法を全幅で配置 */}
					<div className="bg-base-100 p-6 rounded-xl border border-base-300 shadow-sm mt-6">
						<label className="label">
							<span className="label-text text-base font-semibold flex items-center gap-2">
								🍳 調理方法
							</span>
						</label>
						<div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-3 mt-3">
							{[
								{ value: "指定なし", icon: "🤷", desc: "おまかせ" },
								{ value: "電子レンジ", icon: "📻", desc: "簡単調理" },
								{ value: "フライパン", icon: "🍳", desc: "炒める・焼く" },
								{ value: "鍋", icon: "🍲", desc: "煮る・茹でる" },
								{ value: "オーブン", icon: "🔥", desc: "焼く・ロースト" }
							].map((method) => (
								<button
									key={method.value}
									type="button"
									onClick={() => setCookingMethod(method.value)}
									className={`
										p-4 border-2 rounded-lg transition-all duration-200 text-center hover:scale-105
										${cookingMethod === method.value 
											? "border-primary bg-primary/10 text-primary shadow-md scale-105" 
											: "border-base-300 hover:border-primary/50 hover:bg-base-100"
										}
									`}
								>
									<div className="text-2xl mb-2">{method.icon}</div>
									<div className="font-semibold text-sm mb-1">{method.value}</div>
									<div className="text-xs text-base-content/60">{method.desc}</div>
								</button>
							))}
						</div>
					</div>

					<div className="mt-8 flex justify-center">
						<button
							type="button"
							onClick={RecipeGenerator}
							className="btn btn-primary btn-lg px-8 py-4 text-lg font-semibold shadow-lg hover:shadow-xl transition-all duration-200"
							disabled={isPending || selectedVegetables.length === 0}
						>
							{isPending ? (
								<>
									<span className="loading loading-spinner loading-md mr-2"></span>
									レシピを生成中...
								</>
							) : (
								<>
									🍽️ レシピを提案する
								</>
							)}
						</button>
					</div>
				</section>

				<section
					className="mt-8 flex flex-col items-center space-y-4 animate-fade-up"
					style={{ animationDelay: "0.5s", animationFillMode: "both" }}
				>
					{isPending ? (
						<RecipeSkeleton />
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

					{!isPending && recipe && recipeImage && (
						<GenerateRecipeArea
							recipe={recipe}
							recipeImage={recipeImage}
							isSaving={isSaving}
							isPending={isPending}
							handleClickSave={handleClickSave}
						/>
					)}
				</section>
			</main>
		</>
	);
};

export default RecipeGeneratorPage;
