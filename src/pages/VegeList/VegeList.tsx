import { Leaf, RotateCcw, Search } from "lucide-react";
import { useEffect, useState } from "react";
import { useLoaderData, useSearchParams } from "react-router";
import Card from "../../components/Card";
import Meta from "../../components/Meta";
import PaginationButtons from "../../components/PaginationButtons";
import useVegeNames from "../../hooks/useVegeNames";
import type { VegetablesLoaderData } from "../../types/vegetable";

const VegeList = () => {
	const loaderData = useLoaderData() as VegetablesLoaderData;
	const { data: vegetables, meta } = loaderData;
	const { total_pages, current_page } = meta;
	const [searchParams, setSearchParams] = useSearchParams();
	const [searchText, setSearchText] = useState<string>(
		searchParams.get("keyword") || "",
	);
	const [isInSeason, setIsInSeason] = useState<boolean>(
		searchParams.get("season") === "true",
	);
	const [isDiscounted, setIsDiscounted] = useState<boolean>(
		searchParams.get("discounted") === "true",
	);
	const { vegeNames } = useVegeNames();
	const [filteredNames, setFilteredNames] = useState<string[]>([]);
	const [isDropdownVisible, setIsDropdownVisible] = useState<boolean>(false);
	const [isResetting, setIsResetting] = useState<boolean>(false);

	//野菜名の遅延検索（デバウンス、リセット時は除く）
	useEffect(() => {
		if (isResetting) return;

		const timer = setTimeout(() => {
			setSearchParams((prev) => {
				const current = new URLSearchParams(prev);
				current.set("keyword", searchText);
				current.set("page", "1");
				return current;
			});
		}, 500);
		return () => clearTimeout(timer);
	}, [searchText, isResetting, setSearchParams]);

	//フィルター即座反映（リセット時は除く）
	useEffect(() => {
		if (isResetting) return;

		setSearchParams((prev) => {
			const current = new URLSearchParams(prev);
			current.set("season", isInSeason ? "true" : "false");
			current.set("discounted", isDiscounted ? "true" : "false");
			current.set("page", "1");
			return current;
		});
	}, [isInSeason, isDiscounted, isResetting, setSearchParams]);

	const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
		const value = e.target.value;
		setSearchText(value);

		if (value.trim() === "") {
			setFilteredNames([]);
			setIsDropdownVisible(false);
			return;
		}

		const filtered = vegeNames.filter((name) =>
			name.toLowerCase().includes(value.toLowerCase()),
		);
		setFilteredNames(filtered);
		setIsDropdownVisible(filtered.length > 0);
	};

	const handleSelect = (name: string) => {
		setSearchText(name);
		setIsDropdownVisible(false);
	};

	const handleResetFilters = () => {
		setIsResetting(true);
		setSearchText("");
		setIsInSeason(false);
		setIsDiscounted(false);
		setSearchParams(new URLSearchParams());
		// リセット完了を確実にするため少し遅延
		setTimeout(() => {
			setIsResetting(false);
		}, 100);
	};

	return (
		<>
			<Meta
				title="野菜一覧"
				description="旬の野菜を一覧でチェック。栄養や調理のヒントも満載！次のメニューの参考にどうぞ。"
			/>
			<div className="container mx-auto px-2 mt-8 flex flex-col  md:flex-row space-x-4 space-y-2 md:space-y-0 md:items-center">
				<div className="dropdown w-full sm:w-72">
					<label className="input input-primary flex items-center w-full">
						<Search className="text-neutral-500" size={15} />
						<input
							className="grow"
							name="vege-search"
							type="search"
							placeholder="野菜名を検索"
							value={searchText}
							onChange={handleChange}
							autoComplete="off"
						/>
					</label>
					{isDropdownVisible && (
						<ul className="dropdown-content menu bg-base-100 rounded-box z-[1] w-full sm:w-72 p-2 shadow-lg border border-base-300 mt-1 max-h-60 overflow-auto">
							{filteredNames.length > 0 ? (
								filteredNames.map((name) => (
									<li key={name}>
										<button
											type="button"
											onClick={() => handleSelect(name)}
											onMouseDown={(e) => e.preventDefault()}
											className="hover:bg-base-200 transition-colors duration-200 w-full text-left"
										>
											{name}
										</button>
									</li>
								))
							) : (
								<li className="px-4 py-2 text-base-content/60 text-center">
									該当する野菜が見つかりません
								</li>
							)}
						</ul>
					)}
				</div>

				<div className="flex gap-2">
					<input
						id="season"
						type="checkbox"
						className="toggle"
						checked={isInSeason}
						onChange={(e) => setIsInSeason(e.target.checked)}
					/>
					<label htmlFor="season" className="label text-sm">
						旬の野菜のみ表示
					</label>
				</div>

				<div className="flex gap-2">
					<input
						id="discounted"
						type="checkbox"
						className="toggle"
						checked={isDiscounted}
						onChange={(e) => setIsDiscounted(e.target.checked)}
					/>
					<label htmlFor="discounted" className="label text-sm">
						値下がり中の野菜のみ表示
					</label>
				</div>
			</div>

			<div className="mt-4 md:m-8 grid md:grid-cols-2 lg:grid-cols-3 2xl:grid-cols-4 gap-4">
				{vegetables.length > 0 ? (
					vegetables.map((vegetable, index) => (
						<div
							key={vegetable.id}
							className="animate-fade-up"
							style={{
								animationDelay: `${index * 0.1}s`,
								animationFillMode: "both",
							}}
						>
							<Card
								id={vegetable.attributes.id}
								name={vegetable.attributes.name}
								description={vegetable.attributes.description}
								price={vegetable.attributes.latest_price.latest_price}
								rate={vegetable.attributes.compare_last_month.compare_price}
								image={vegetable.attributes.image_url}
								season={vegetable.attributes.seasons[0]?.in_season}
							/>
						</div>
					))
				) : (
					<div className="col-span-full flex flex-col items-center justify-center py-16 px-4">
						<div className="text-center max-w-md mx-auto">
							<div className="mb-6">
								<Leaf size={64} className="mx-auto text-base-content/30" />
							</div>
							<h3 className="text-xl font-semibold text-base-content mb-3">
								該当する野菜が見つかりませんでした
							</h3>
							<p className="text-base-content/60 mb-6 leading-relaxed">
								検索条件を変更するか、フィルターをリセットして再度お試しください。
							</p>
							<div className="flex flex-col sm:flex-row gap-3 justify-center">
								<button
									type="button"
									onClick={handleResetFilters}
									className="btn btn-outline btn-primary gap-2"
								>
									<RotateCcw size={16} />
									フィルターをリセット
								</button>
								<button
									type="button"
									onClick={() => setSearchText("")}
									className="btn btn-ghost gap-2"
								>
									<Search size={16} />
									検索条件をクリア
								</button>
							</div>
						</div>
					</div>
				)}
			</div>
			{vegetables.length > 0 && total_pages > 0 && (
				<PaginationButtons
					totalPages={total_pages}
					currentPage={current_page}
				/>
			)}
		</>
	);
};

export default VegeList;
