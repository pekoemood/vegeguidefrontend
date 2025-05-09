import { Link, useNavigate } from "react-router";

const Card = ({ id, name, prices, image, description, season }) => {
	const navigation = useNavigate();

	const handleClick = () => {
		navigation(`/vegelist/${id}`);
	};

	return (
		<Link to={`/vegelist/${id}`}>
			<div className="indicator shadow-sm transition duration-200 ease-in-out transform hover:-translate-y-1 hover:shadow-lg">
				{season && (
					<span className="indicator-item badge badge-accent transition animate-bounce">
						旬SEASONAL
					</span>
				)}
				<div className="card bg-base-100 w-90 ">
					<figure>
						<img className="w-full h-60 object-cover" src={image} alt={name} />
					</figure>
					<div className="card-body">
						<h2 className="card-title">{name}</h2>
						<p>{description}</p>
						<div className="card-actions justify-end">
							<button onClick={handleClick} className="btn btn-primary w-full">
								詳細を見る
							</button>
						</div>
					</div>
				</div>
			</div>
		</Link>
	);
};

export default Card;
