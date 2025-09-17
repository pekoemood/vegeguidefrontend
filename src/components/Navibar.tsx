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
import { useContext, useEffect, useRef, useState } from "react";
import toast from "react-hot-toast";
import { Link, useLocation, useNavigate } from "react-router";
import { UserContext } from "../context/UserContext";
import useModal from "../hooks/useModal";
import { api } from "../utils/axios";
import AccountSetting from "./AccountSetting";
import Spinner from "./Spinner";

const Navibar = () => {
	const navigate = useNavigate();
	const location = useLocation();
	const [isOpen, setIsOpen] = useState(false);
	const [isLoggingOut, setIsLoggingOut] = useState(false);
	const { Modal, openModal, closeModal } = useModal();
	const menuRef = useRef<HTMLUListElement>(null);

	const { user, setUser, loading } = useContext(UserContext);

	// 現在のページがアクティブかどうかを判定
	const isActivePage = (path: string) => location.pathname === path;

	// アクティブページのスタイルを生成（モバイル用）
	const getActivePageStyle = (path: string) => {
		const baseStyle =
			"flex items-center gap-x-1 hover:bg-primary/10 transition-colors duration-200";
		const activeStyle = "bg-primary/20 text-primary-content font-semibold";
		return `${baseStyle} ${isActivePage(path) ? activeStyle : ""}`;
	};

	// PC画面用のアクティブページスタイル（より目立つデザイン）
	const getActivePageStylePC = (path: string) => {
		const baseStyle =
			"flex items-center gap-x-1 hover:bg-primary-focus/20 transition-all duration-200 px-4 py-2 rounded-lg";
		const activeStyle =
			"bg-base-100 text-base-content font-bold shadow-lg border-2 border-base-300";
		return `${baseStyle} ${isActivePage(path) ? activeStyle : ""}`;
	};

	// 外側クリックでメニューを閉じる
	useEffect(() => {
		const handleClickOutside = (event: MouseEvent) => {
			if (menuRef.current && !menuRef.current.contains(event.target as Node)) {
				setIsOpen(false);
			}
		};

		if (isOpen) {
			document.addEventListener("mousedown", handleClickOutside);
		}

		return () => {
			document.removeEventListener("mousedown", handleClickOutside);
		};
	}, [isOpen]);

	const handleLogout = async () => {
		if (isLoggingOut) return;

		setIsLoggingOut(true);
		try {
			await api.post(`/logout`);
			setUser(null);
			navigate("/");
			toast.success("ログアウトしました");
		} catch (error) {
			console.error("ログアウトエラー:", error);
			toast.error("ログアウトに失敗しました");
		} finally {
			setIsLoggingOut(false);
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
				<button
					className="btn btn-ghost"
					onClick={() => setIsOpen(!isOpen)}
					aria-label={isOpen ? "メニューを閉じる" : "メニューを開く"}
					aria-expanded={isOpen}
					aria-controls="mobile-menu"
				>
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
						ref={menuRef}
						id="mobile-menu"
						tabIndex={0}
						className={`menu absolute right-0 top-full mt-2 z-[50] p-2 shadow bg-base-100 rounded-box w-40 transition-all transform ${isOpen ? "opacity-100 scale-100" : "opacity-0 scale-95"}`}
					>
						<li>
							<Link
								to="/vegelist"
								className={getActivePageStyle("/vegelist")}
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
										className={getActivePageStyle("/recipe-generator")}
										onClick={() => setIsOpen(false)}
									>
										<ChefHat size={15} />
										レシピ提案
									</Link>
								</li>
								<li>
									<Link
										to="/recipe-lists"
										className={getActivePageStyle("/recipe-lists")}
										onClick={() => setIsOpen(false)}
									>
										<BookOpen size={15} />
										レシピ一覧
									</Link>
								</li>
								<li>
									<Link
										to="/shoppinglist"
										className={getActivePageStyle("/shoppinglist")}
										onClick={() => setIsOpen(false)}
									>
										<ShoppingCart size={15} />
										買い物リスト
									</Link>
								</li>

								<li>
									<Link
										to="/fridge-items"
										className={getActivePageStyle("/fridge-items")}
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
										className="flex items-center gap-x-1 hover:bg-primary/10 transition-colors duration-200"
										disabled={isLoggingOut}
									>
										{isLoggingOut ? (
											<div className="loading loading-spinner loading-xs"></div>
										) : (
											<LogOut size={15} />
										)}
										{isLoggingOut ? "ログアウト中..." : "ログアウト"}
									</button>
								</li>
							</>
						)}
						{!user && (
							<>
								<li>
									<Link
										to="/signup"
										className={getActivePageStyle("/signup")}
										onClick={() => setIsOpen(false)}
									>
										<UserPlus size={15} />
										新規登録
									</Link>
								</li>
								<li>
									<Link
										to="/login"
										className={getActivePageStyle("/login")}
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
						<Link to="/vegelist" className={getActivePageStylePC("/vegelist")}>
							<Leaf size={15} />
							野菜一覧
						</Link>
					</li>
					{user && user.name && (
						<>
							<li>
								<Link
									to="/recipe-generator"
									className={getActivePageStylePC("/recipe-generator")}
								>
									<ChefHat size={15} />
									レシピ提案
								</Link>
							</li>
							<li>
								<Link
									to="/recipe-lists"
									className={getActivePageStylePC("/recipe-lists")}
								>
									<BookOpen size={15} />
									レシピ一覧
								</Link>
							</li>
							<li>
								<Link
									to="/shoppinglist"
									className={getActivePageStylePC("/shoppinglist")}
								>
									<ShoppingCart size={15} />
									買い物リスト
								</Link>
							</li>

							<li>
								<Link
									to="/fridge-items"
									className={getActivePageStylePC("/fridge-items")}
								>
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
									className="flex items-center gap-x-1 hover:bg-primary/10 transition-colors duration-200"
									disabled={isLoggingOut}
								>
									{isLoggingOut ? (
										<div className="loading loading-spinner loading-xs"></div>
									) : (
										<LogOut size={15} />
									)}
									{isLoggingOut ? "ログアウト中..." : "ログアウト"}
								</button>
							</li>
						</>
					) : (
						<>
							<li>
								<Link to="/signup" className={getActivePageStylePC("/signup")}>
									<UserPlus size={15} />
									新規登録
								</Link>
							</li>
							<li>
								<Link to="/login" className={getActivePageStylePC("/login")}>
									<LogIn size={15} />
									ログイン
								</Link>
							</li>
						</>
					)}
				</ul>
			</div>
			<Modal>
				<AccountSetting
					name={user?.name}
					email={user?.email}
					google_account={user?.google_account}
				/>
			</Modal>
		</div>
	);
};

export default Navibar;
