import { Link } from "react-router";

const Navibar = () => {
	return (
		<div className="navbar bg-primary text-primary-content">
			<div className="flex-1">
				<button className="btn btn-ghost text-xl">
					<Link to="/">VegeGuide</Link>
				</button>
			</div>
			<div className="flex-none">
				<ul className="menu menu-horizontal px-1">
					<li>
						<Link to="/vegelist">野菜一覧</Link>
					</li>
					<li>
						<Link to="/signup">新規登録</Link>
					</li>
					<li>
						<Link to='/login'>ログイン</Link>
					</li>
				</ul>
			</div>
		</div>
	);
};

export default Navibar;
