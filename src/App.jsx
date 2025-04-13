import { useEffect, useState } from "react";

const App = () => {
	const [data, setData] = useState(null);

	useEffect(() => {
		const getTodos = async () => {
			const response = await fetch(`${import.meta.env.VITE_RAILS_API}/vegetables`);
			const jsonData = await response.json();
			setData(jsonData);
		};
		getTodos();
	}, []);

	if(!data) {
		return <p>読み込み中....</p>
	}

	console.log(data.data.attributes);
	return (
		<>
      <h1>野菜一覧</h1>
			<p>{data.data[0].attributes.name}</p>
			<p>{data.included[0].attributes.price}</p>
		
		</>
	);
};

export default App;
