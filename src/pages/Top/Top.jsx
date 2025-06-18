import { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router";
import EmailChangeSuccess from "../../components/EmailChangeSuccess";
import useModal from "../../hooks/useModal";
import { api } from "../../utils/axios";
import Meta from "../../components/Meta";

const Top = () => {
	const navigation = useNavigate();
	const { Modal, openModal, closeModal } = useModal();
	const location = useLocation();
	const [email, setEmail] = useState("");

	useEffect(() => {
		const changeMail = async () => {
			try {
				const params = new URLSearchParams(location.search);
				const token = params.get("token");

				if (token) {
					const response = await api.get(`/email_change_requests/confirm`, {
						params: { token },
					});
					setEmail(response.data?.email);
					openModal();
					navigation(location.pathname, { replace: true });
				}
			} catch (err) {
				console.error(err);
			}
		};
		changeMail();
	}, [location.search]);

	return (
		<>
			<Meta title="トップ" description="旬の野菜を一覧でチェック。栄養や調理のヒントも満載！次のメニューの参考にどうぞ。"/>
			<main className="max-w-screen mx-auto flex flex-col items-center py-32 space-y-12">
				<h1 className="text-5xl font-bold tracking-tight">忙しいあなたの</h1>
				<h1 className="text-6xl font-bold text-primary">
					毎日の”ちょうどいい健康習慣”
				</h1>
				<h1 className="text-4xl font-bold text-primary">VegeGuide</h1>
				<p className="text-xl text-neutral-500 text-center">
					健康を意識し始めた社会人男性に向けて、旬の野菜情報・価格比較・レシピ提案・買い物リスト・食材管理を一元化するWebサービス
					<br></br>
					料理のハードルを下げ、食材のムダを防ぎながら、栄養価が高くコスパの良い食生活をサポートします。
				</p>
				<div className="text-center">
					<button
						onClick={() => navigation("/signup")}
						className="btn btn-primary shadow-md transition transform hover:shadow-lg hover:scale-105"
					>
						今すぐ使ってみる
					</button>
				</div>
				<Modal>
					<EmailChangeSuccess email={email} closeModal={closeModal} />
				</Modal>
			</main>
		</>
	);
};

export default Top;
