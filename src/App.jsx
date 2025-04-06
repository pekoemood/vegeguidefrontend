import { useEffect, useState } from "react";

const App = () => {
	const [todos, setTodos] = useState([]);

	useEffect(() => {
		const getTodos = async () => {
			const response = await fetch(`${import.meta.env.VITE_RAILS_API}`);
			const data = await response.json();
			setTodos(data);
		};
		getTodos();
	}, []);

	return (
		<>
			<div className="container mx-auto mt-8">
				<h1 className="text-4xl text-center">hello world</h1>
			</div>
			<div className="grid grid-cols-4 gap-4">
				{todos.map((todo) => (
					<div key={todo.id} className="card w-96 bg-base-100 card-xl shadow-sm">
						<div className="card-body">
							<h2 className="card-title">{todo.title}</h2>
							<p>{todo.description}</p>
						</div>
					</div>
				))}
			</div>
		</>
	);
};

export default App;
