import { useState } from "react";
import { useLoaderData } from "react-router";
import StorageMethod from "../../components/StorageMethod";

const VegeDetail = () => {
	const { vegetable } = useLoaderData();
	const { data } = vegetable;
	console.log(data);
	const [activeTab, setActiveTab] = useState("tab1");

	return (
		<>
			<div className="container mx-auto px-4">
				<div className="flex justify-center gap-8 my-8 mx-auto">
					<div className="max-w-md">
						<div className="rounded-lg overflow-hidden shadow-md">
							<img
								src={data.attributes.image_url}
								alt={data.attributes.name}
								width={400}
								height={300}
								className="w-full h-auto object-cover"
							/>
						</div>
					</div>

					<div>
						<h1 className="text-3xl md:text-4xl md:text-4xl font-bold text-emerald-800 mb-4">
							{data.attributes.name}
						</h1>
						<p className="text-gray-700 mb-4">{data.attributes.description}</p>
						<div className="bg-emerald-50 p-4 rounded-lg border border-emerald-100">
							<h2 className="text-lg font-semibold text-emerald-700 mb-2">
								旬の時期
							</h2>
							<p className="text-gray-700">
								{data.attributes.seasons[0].start_month}月~
								{data.attributes.seasons[0].end_month}月（
								{data.attributes.seasons[0].note}）
							</p>
						</div>
					</div>
				</div>

				<div className="mx-auto max-w-2/3 mb-8">
					<div role="tablist" className="tabs tabs-box flex justify-between">
						<a
							role="tab"
							className={`tab flex-1 ${activeTab === "tab1" ? "tab-active" : ""}`}
							onClick={() => setActiveTab("tab1")}
						>
							価格推移
						</a>
						<a
							role="tab"
							className={`tab flex-1 ${activeTab === "tab2" ? "tab-active" : ""}`}
							onClick={() => setActiveTab("tab2")}
						>
							栄養成分
						</a>
						<a
							role="tab"
							className={`tab flex-1 ${activeTab === "tab3" ? "tab-active" : ""}`}
							onClick={() => setActiveTab("tab3")}
						>
							保存方法
						</a>
					</div>

					<div>
						{activeTab === "tab1" && <p>表示１</p>}
						{activeTab === "tab2" && <p>表示2</p>}
						{activeTab === "tab3" && <StorageMethod storage={data.attributes.storage} />}
					</div>
				</div>
			</div>
		</>
	);
};

export default VegeDetail;
