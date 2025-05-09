const PaginationButtons = () => {
	return (
		<div>
			{Array.from({ length: totalPages }, (v, i) => i + 1).map((page) => {
				<button
					key={page}
					className={`join-items btn ${currentPage === page ? "btn-active" : ""}`}
					onClick={() => handleMove(page)}
				>
					{page}
				</button>;
			})}
		</div>
	);
};
