import { Search } from "lucide-react";
import { useEffect, useState } from "react";
import { useLoaderData, useSearchParams } from "react-router";
import Card from "../../components/Card";
import Meta from "../../components/Meta";
import PaginationButtons from "../../components/PageinationButtons";
import useVegeNames from "../../hooks/useVegeNames";
import { Vegetable, VegetablesLoaderData } from "../../types/vegetable";





const VegeList = () => {
	const loaderData = useLoaderData() as VegetablesLoaderData;
	const { data: vegetables, meta } = loaderData;
	const { total_pages, current_page } = meta;
	const [searchParams, setSearchParams] = useSearchParams();
	const [searchText, setSearchText] = useState<string>("");
	const [isInSeason, setIsInSeason] = useState<boolean>(false);
	const [isDiscounted, setIsDiscounted] = useState<boolean>(false);
	const { vegeNames } = useVegeNames();
	const [filteredNames, setFilteredNames] = useState<string[]>([]);
	const [isDropdownVisible, setIsDropdownVisible] = useState<boolean>(false);

	//野菜名の遅延検索
	useEffect(() => {
		const timer = setTimeout(() => {
			setSearchParams({
				keyword: searchText,
				season: isInSeason ? 'true' : 'false',
				discounted: isDiscounted ? 'true' : 'false',
			});
		}, 500);

		return () => clearTimeout(timer);
	}, [searchText, isInSeason, isDiscounted]);

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

	return (
		<>
			<Meta
				title="野菜一覧"
				description="旬の野菜を一覧でチェック。栄養や調理のヒントも満載！次のメニューの参考にどうぞ。"
			/>
			<div className="container mx-auto px-2 mt-8 flex flex-col  md:flex-row space-x-4 space-y-2 md:space-y-0 md:items-center">
				<div className="relative w-72">
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
						<ul className="absolute bg-white border border-base-300 rounded-md mt-1 w-72 max-h-60 overflow-auto z-10 shadow-lg">
							{filteredNames.map((name) => (
								<li
									key={name}
									onClick={() => handleSelect(name)}
									className="px-4 py-2 cursor-pointer hover:bg-gray-100"
									onMouseDown={(e) => e.preventDefault()}
								>
									{name}
								</li>
							))}
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
								animationFillMode: 'both'
							}}
						>
							<Card
								id={vegetable.id}
								name={vegetable.attributes.name}
								description={vegetable.attributes.description}
								price={vegetable.attributes.latest_price.latest_price}
								rate={vegetable.attributes.compare_last_month.compare_price}
								image={vegetable.attributes.image_url}
								season={vegetable.attributes.seasons[0].in_season}
							/>
						</div>
					))
				) : (
					<p className="col-span-4 font-bold text-error text-lg">
						該当する野菜は見つかりませんでした
					</p>
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
