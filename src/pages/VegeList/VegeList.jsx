import { Search } from "lucide-react";
import { useEffect, useState } from "react";
import { useLoaderData, useSearchParams } from "react-router";
import Card from "../../components/Card";
import PaginationButtons from "../../components/PageinationButtons";
import { api } from "../../utils/axios";

const VegeList = () => {
	const { data } = useLoaderData();
	const { data: vegetables, meta } = data;
	const { total_pages, current_page } = meta;
	const [searchParams, setSearchParams] = useSearchParams();
	const [searchText, setSearchText] = useState("");
	const [isInSeason, setIsInSeason] = useState(false);
	const [isDiscounted, setIsDiscounted] = useState(false);

	useEffect(() => {
		const timer = setTimeout(() => {
			setSearchParams({ keyword: searchText, season: isInSeason, discounted: isDiscounted });
		}, 500);

		return () => clearTimeout(timer);
	}, [searchText, isInSeason, isDiscounted]);


	return (
		<>
			<div className="mt-8 ml-8 flex space-x-4 items-center">
				<label className="input input-primary " htmlFor="">
					<Search className="text-neutral-500" size={15} />
					<input
						className="grow"
						type="search"
						placeholder="野菜名を検索"
						value={searchText}
						onChange={(e) => setSearchText(e.target.value)}
					/>
				</label>
				<input id="season" type="checkbox" className="toggle" checked={isInSeason} onChange={(e) => setIsInSeason(e.target.checked)} />
				<label htmlFor="season" className="label text-sm">旬の野菜のみ表示</label>
				<input id="discounted" type="checkbox" className="toggle" checked={isDiscounted} onChange={(e) => setIsDiscounted(e.target.checked)} />
				<label htmlFor="discounted" className="label text-sm">値下がり中の野菜のみ表示</label>
			</div>
			<div className="m-8 grid grid-cols-4 gap-8">
				{vegetables.length > 0 ? (
					vegetables.map((vegetable) => (
						<Card
							key={vegetable.id}
							id={vegetable.id}
							name={vegetable.attributes.name}
							description={vegetable.attributes.description}
							price={vegetable.attributes.latest_price.latest_price}
							rate={vegetable.attributes.compare_last_month.compare_price}
							image={vegetable.attributes.image_url}
							season={vegetable.attributes.seasons[0]?.in_season}
						/>
					))
				) : (
					<p className="col-span-4 font-bold text-error text-lg">該当する野菜は見つかりませんでした</p>
				)}
			</div>
			{ vegetables.length > 0 && total_pages > 0 && (
			<PaginationButtons totalPages={total_pages} currentPage={current_page} />
			)}

		</>
	);
};

export default VegeList;
