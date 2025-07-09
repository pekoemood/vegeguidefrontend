import { useState } from "react";
import { useLoaderData } from "react-router";
import Meta from "../../components/Meta";
import NutritionInfo from "../../components/NutritionInfo";
import PriceChart from "../../components/PriceChart";
import RecipeGenerator from "../../components/RecipeGenerator";
import StorageMethod from "../../components/StorageMethod";

const VegeDetail = () => {
	const { data } = useLoaderData();
	console.log(data);
	const [activeTab, setActiveTab] = useState("tab1");

	return (
		<>
			<Meta
				title="野菜詳細"
				description="旬の野菜を一覧でチェック。栄養や調理のヒントも満載！次のメニューの参考にどうぞ。"
			/>
			<div className="container mx-auto px-4">
				<div className="flex flex-col md:flex-row justify-center gap-8 my-8 mx-auto">
					<div className="max-w-md order-2 md:order-1 mx-auto md:mx-0">
						<div className="rounded-lg overflow-hidden shadow-md">
							<img
								src={data.attributes.image_url}
								alt={data.attributes.name}
								className="w-full object-contain"
							/>
						</div>
					</div>

					<div className="order-1 md:order-2">
						<h1 className="text-3xl md:text-4xl font-bold mb-4">
							{data.attributes.name}
						</h1>
						<p className="text-neutral-500 mb-4">
							{data.attributes.description}
						</p>
						<div className=" p-4 rounded-lg border border-neutral-300">
							<h2 className="text-lg font-semibold mb-2">旬の時期</h2>
							<p className="text-gray-700">
								{data.attributes.seasons[0].start_month}月~
								{data.attributes.seasons[0].end_month}月（
								{data.attributes.seasons[0].note}）
							</p>
						</div>
					</div>
				</div>

				<div className="mx-auto max-w-screen-lg mb-8">
					<div role="tablist" className="tabs tabs-box flex justify-between">
						<a
							role="tab"
							className={`text-xs mg:text-base tab flex-1 ${activeTab === "tab1" ? "tab-active" : ""}`}
							onClick={() => setActiveTab("tab1")}
						>
							価格推移
						</a>
						<a
							role="tab"
							className={`text-xs mg:text-base tab flex-1 ${activeTab === "tab2" ? "tab-active" : ""}`}
							onClick={() => setActiveTab("tab2")}
						>
							栄養成分
						</a>
						<a
							role="tab"
							className={`text-xs mg:text-base tab flex-1 ${activeTab === "tab3" ? "tab-active" : ""}`}
							onClick={() => setActiveTab("tab3")}
						>
							保存方法
						</a>
						<a
							role="tab"
							className={`text-xs mg:text-base tab flex-1 ${activeTab === "tab4" ? "tab-active" : ""}`}
							onClick={() => setActiveTab("tab4")}
						>
							レシピ
						</a>
					</div>

					<div>
						{activeTab === "tab1" && (
							<PriceChart prices={data.attributes.monthly_prices} />
						)}
						{activeTab === "tab2" && (
							<NutritionInfo nutritions={data.attributes.nutritions} />
						)}
						{activeTab === "tab3" && (
							<StorageMethod storage={data.attributes.storage} />
						)}
						{activeTab === "tab4" && (
							<RecipeGenerator
								vegetableName={data.attributes.name}
								id={data.attributes.id}
							/>
						)}
					</div>
				</div>
			</div>
		</>
	);
};

export default VegeDetail;
