import { useNavigate } from "react-router";

const Card = ({ id, name, prices, image, description }) => {
	const navigation = useNavigate();

	const handleClick = () => {
		navigation(`/vegelist/${id}`);
	};
	return (
		<div className="card bg-base-100 w-96 shadow-sm">
			<figure className="px-10 pt-10">
				<img
					src={
						image
							? image
							: "https://img.daisyui.com/images/stock/photo-1606107557195-0e29a4b5b4aa.webp"
					}
					alt="Shoes"
					className="rounded-xl h-48"
				/>
			</figure>
			<div className="card-body items-center text-center">
				<h2 className="card-title">{name}</h2>
				<p className="text-left">{description}</p>
				<div className="card-actions">
					<button onClick={handleClick} className="btn btn-primary">
						詳細
					</button>
				</div>
			</div>
		</div>
	);
};

export default Card;
