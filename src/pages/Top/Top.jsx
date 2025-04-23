import { useLoaderData } from "react-router";

const Top = () => {
	const { data } = useLoaderData();
	console.log(data);

	return (
		<>
			<h1>Topページです</h1>
			<p>{data.candidates[0].content.parts[0].text}</p>
		</>
	);
};

export default Top;
