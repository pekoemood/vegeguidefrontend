import axios from "axios";
import {
	BookOpen,
	ChefHat,
	Leaf,
	LogIn,
	LogOut,
	Refrigerator,
	ShoppingCart,
	User,
	UserPlus,
} from "lucide-react";
import { useContext, useState } from "react";
import { Link, useNavigate } from "react-router";
import { UserContext } from "../context/UserContext";
import useModal from "../hooks/useModal";
import AccountSetting from "./AccountSetting";
import Spinner from "./Spinner";

const Navibar = () => {
	const navigate = useNavigate();
	const { Modal, openModal, closeModal } = useModal();

	const { user, setUser, loading } = useContext(UserContext);

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
	console.log(user);

	if (loading) return <Spinner />;

	return (
		<div className="navbar bg-primary text-primary-content">
			<div className="navbar-start">
				<button className="btn btn-ghost text-xl flex items-center">
					<img className="block w-8 h-8 " src="/vegege.png" alt="" />
					<Link to="/">VegeGuide</Link>
				</button>
			</div>

			<div className="navbar-center">
				<ul className="menu menu-horizontal">
					<li>
						<Link to="/vegelist" className="flex items-center gap-x-1">
							<Leaf size={15} />
							野菜一覧
						</Link>
					</li>
					{user && user.name && (
						<>
							<li>
								<Link
									to="/recipe-generator"
									className="flex items-center gap-x-1"
								>
									<ChefHat size={15} />
									レシピ提案
								</Link>
							</li>
							<li>
								<Link to="/recipe-lists" className="flex items-center gap-x-1">
									<BookOpen size={15} />
									レシピ一覧
								</Link>
							</li>
							<li>
								<Link to="/shoppinglist" className="flex items-center gap-x-1">
									<ShoppingCart size={15} />
									買い物リスト
								</Link>
							</li>

							<li>
								<Link to="/fridge-items" className="flex items-center gap-x-1">
									<Refrigerator size={15} />
									冷蔵庫
								</Link>
							</li>
						</>
					)}
				</ul>
			</div>

			<div className="navbar-end">
				<ul className="menu menu-horizontal">
					{user && user.name ? (
						<>
							<li>
								<span className="flex items-center gap-x-1" onClick={openModal}>
									<User size={15} />
									マイページ
								</span>
							</li>
							<li>
								<button
									onClick={handleLogout}
									className="flex items-center gap-x-1"
								>
									<LogOut size={15} />
									ログアウト
								</button>
							</li>
						</>
					) : (
						<>
							<li>
								<Link to="/signup" className="flex items-center gap-x-1">
									<UserPlus size={15} />
									新規登録
								</Link>
							</li>
							<li>
								<Link to="/login" className="flex items-center gap-x-1">
									<LogIn size={15} />
									ログイン
								</Link>
							</li>
						</>
					)}
				</ul>
			</div>
			<Modal>
				<AccountSetting name={user?.name} email={user?.email} />
			</Modal>
		</div>
	);
};

export default Navibar;
