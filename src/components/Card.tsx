import { TrendingDown, TrendingUp } from "lucide-react";
import { Link, useNavigate } from "react-router";
import type { CardProps } from "../types/apiResponse";
import OptimizedImage from "./OptimizedImage";

const Card = ({
	id,
	name,
	image,
	description,
	season,
	price,
	rate,
}: CardProps) => {
	const navigation = useNavigate();

	const handleClick = () => {
		navigation(`/vegelist/${id}`);
	};

	return (
		<Link to={`/vegelist/${id}`} className="container mx-auto px-2 block w-fit">
			<div className="indicator card shadow-sm transition duration-200 ease-in-out transform hover:-translate-y-1 hover:shadow-lg">
				{season && (
					<span className="indicator-item indicator-center sm:indicator-end  badge badge-accent transition animate-bounce">
						旬の野菜
					</span>
				)}
				<div className="card bg-base-100 w-90 ">
					<figure>
						<OptimizedImage
							src={image}
							alt={name}
							className="w-full h-60"
							width={360}
							height={240}
							quality={85}
						/>
					</figure>
					<div className="card-body">
						<h2 className="card-title">{name}</h2>
						<div className="flex justify-between items-center gap-2">
							<span className="text-xl">{price}円/kg</span>
							<div className="flex items-center gap-1">
								{rate > 0 ? (
									<div className="flex items-center">
										<TrendingUp className="text-red-500" />
										<span className="text-red-500">{rate}%(先週比)</span>
									</div>
								) : (
									<div className="flex items-center">
										<TrendingDown className="text-green-500" />
										<span className="text-green-500">{rate}%(先週比)</span>
									</div>
								)}
							</div>
						</div>

						<p>{description}</p>
						<div className="card-actions justify-end">
							<button
								type="button"
								onClick={handleClick}
								className="btn btn-primary w-full"
							>
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
