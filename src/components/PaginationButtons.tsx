import { useSearchParams } from "react-router";

const PaginationButtons = ({ totalPages, currentPage }:{ totalPages: number, currentPage: number}) => {
	const [searchParams, setSearchParams] = useSearchParams();

	const handleMove = (newPage: number) => {
		setSearchParams((prev) => {
			const newParams = new URLSearchParams(prev);
			newParams.set("page", newPage.toString());
			return newParams;
		});
	};

	return (
		<div className="flex justify-center join my-8">
			{Array.from({ length: totalPages }, (v, i) => i + 1).map((page) => (
				<button
					key={page}
					className={`join-item btn ${currentPage + 1 === page ? "btn-active" : ""}`}
					onClick={() => handleMove(page)}
				>
					{page}
				</button>
			))}
		</div>
	);
};

export default PaginationButtons;
