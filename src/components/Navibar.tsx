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
import toast from "react-hot-toast";
import { Link, useNavigate } from "react-router";
import { UserContext } from "../context/UserContext";
import useModal from "../hooks/useModal";
import { api } from "../utils/axios";
import AccountSetting from "./AccountSetting";
import Spinner from "./Spinner";

const Navibar = () => {
	const navigate = useNavigate();
	const [isOpen, setIsOpen] = useState(false);
	const { Modal, openModal, closeModal } = useModal();

	const { user, setUser, loading } = useContext(UserContext);

	const handleLogout = async () => {
		try {
			await api.post(`/logout`);
			setUser(null);
			navigate("/");
			toast.success("ログアウトしました");
		} catch (error) {
			console.log("ログアウトに失敗しました", error);
			toast.error("ログアウトに失敗しました");
		}
	};

	if (loading) return <Spinner />;

	return (
		<div className="navbar bg-primary text-primary-content">
			<div className="navbar-start">
				<button className="btn btn-ghost text-xl flex items-center">
					<img className="block w-8 h-8 " src="/vegege.png" alt="" />
					<Link to="/">VegeGuide</Link>
				</button>
			</div>

			{/* モバイル用　：　ハンバーガー */}
			<div className="navbar-end lg:hidden relative">
				<button className="btn btn-ghost" onClick={() => setIsOpen(!isOpen)}>
					<svg
						xmlns="http://www.w3.org/2000/svg"
						width="32"
						height="32"
						viewBox="0 0 512 512"
					>
						<path d="M64,384H448V341.33H64Zm0-106.67H448V234.67H64ZM64,128v42.67H448V128Z" />
					</svg>
				</button>
				{isOpen && (
					<ul
						tabIndex={0}
						className={`menu absolute right-0 top-full mt-2 z-[50] p-2 shadow bg-base-100 rounded-box w-40 transition-all transform ${isOpen ? "opacity-100 scale-100" : "opacity-0 scale-95"}`}
					>
						<li>
							<Link
								to="/vegelist"
								className="flex items-center gap-x-1"
								onClick={() => setIsOpen(false)}
							>
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
										onClick={() => setIsOpen(false)}
									>
										<ChefHat size={15} />
										レシピ提案
									</Link>
								</li>
								<li>
									<Link
										to="/recipe-lists"
										className="flex items-center gap-x-1"
										onClick={() => setIsOpen(false)}
									>
										<BookOpen size={15} />
										レシピ一覧
									</Link>
								</li>
								<li>
									<Link
										to="/shoppinglist"
										className="flex items-center gap-x-1"
										onClick={() => setIsOpen(false)}
									>
										<ShoppingCart size={15} />
										買い物リスト
									</Link>
								</li>

								<li>
									<Link
										to="/fridge-items"
										className="flex items-center gap-x-1"
										onClick={() => setIsOpen(false)}
									>
										<Refrigerator size={15} />
										冷蔵庫
									</Link>
								</li>
								<li>
									<span
										className="flex items-center gap-x-1"
										onClick={() => {
											openModal(), setIsOpen(false);
										}}
									>
										<User size={15} />
										マイページ
									</span>
								</li>
								<li>
									<button
										onClick={() => {
											handleLogout(), setIsOpen(false);
										}}
										className="flex items-center gap-x-1"
									>
										<LogOut size={15} />
										ログアウト
									</button>
								</li>
							</>
						)}
						{!user && (
							<>
								<li>
									<Link
										to="/signup"
										className="flex items-center gap-x-1"
										onClick={() => setIsOpen(false)}
									>
										<UserPlus size={15} />
										新規登録
									</Link>
								</li>
								<li>
									<Link
										to="/login"
										className="flex items-center gap-x-1"
										onClick={() => setIsOpen(false)}
									>
										<LogIn size={15} />
										ログイン
									</Link>
								</li>
							</>
						)}
					</ul>
				)}
			</div>

			{/* PC画面用 */}
			<div className="navbar-center hidden lg:flex">
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

			<div className="navbar-end hidden lg:flex">
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
