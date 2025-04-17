const Card = ({ name, prices, image }) => {
	return (
<div className="card bg-base-100 w-96 shadow-sm">
  <figure className="px-10 pt-10">
    <img
      src={ image ? image : "https://img.daisyui.com/images/stock/photo-1606107557195-0e29a4b5b4aa.webp"}
      alt="Shoes"
      className="rounded-xl h-48" />
  </figure>
  <div className="card-body items-center text-center">
    <h2 className="card-title">{name}</h2>
    <p>{prices[0].attributes.price}A card component has a figure, a body part, and inside body there are title and actions parts</p>
    <div className="card-actions">
      <button className="btn btn-primary">Buy Now</button>
    </div>
  </div>
</div>
	);
};

export default Card;
