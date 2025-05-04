import axios from "axios";
import { useContext, useEffect, useState } from "react";
import { Link, useNavigate } from "react-router";
import { UserContext } from "../context/UserContext";
import Spinner from "./Spinner";

const Navibar = () => {
	const navigate = useNavigate();

	const { user, setUser, loading } = useContext(UserContext);

	console.log(user);

	const handleLogout = async () => {
		try {
			await axios.post(
				`${import.meta.env.VITE_RAILS_API}/logout`,
				{},
				{
					withCredentials: true,
				},
			);
			setUser(null);
			navigate("/");
		} catch (error) {
			console.log("ログアウトに失敗しました", error);
		}
	};

	if (loading) return <Spinner />;

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
					{user ? (
						<>
							<li>
								<span>{user.name}さん</span>
							</li>
							<li>
								<Link to="/shoppinglist">買い物リスト</Link>
							</li>
							<li>
								<button onClick={handleLogout}>ログアウト</button>
							</li>
						</>
					) : (
						<>
							<li>
								<Link to="/signup">新規登録</Link>
							</li>
							<li>
								<Link to="/login">ログイン</Link>
							</li>
						</>
					)}
				</ul>
			</div>
		</div>
	);
};

export default Navibar;
