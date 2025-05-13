import { Search } from "lucide-react";
import { useState } from "react";
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

	const handleSearch = () => {
		setSearchParams({ keyword: searchText });
	};

	return (
		<>
			<div className="mt-8 ml-8 flex space-x-4">
				<label className="input input-primary " htmlFor="">
					<Search className="text-neutral-500" size={15} />
					<input
						className="grow"
						type="search"
						placeholder="野菜名を検索"
						value={searchText}
						onChange={(e) => setSearchText(e.target.value)}
						onKeyDown={(e) => e.key === "Enter" && handleSearch()}
					/>
				</label>
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
