const VegetableCard = ({ id, name, img, onClick, selected }) => {
	return (
		<div
			onClick={onClick}
			className={`card max-w-45 flex-shrink-0 shadow-sm transform transition duration-200 hover:shadow-lg hover:scale-105 hover:bg-neutral-200 ${selected ? "bg-neutral-300" : "bg-base-100"}`}
		>
			<figure className="px-10 pt-10">
				<img src={img} alt="vegetable" className="rounded-xl h-15" />
			</figure>
			<div className="card-body items-center text-center">
				<h2 className="card-title">{name}</h2>
			</div>
		</div>
	);
};

export default VegetableCard;
