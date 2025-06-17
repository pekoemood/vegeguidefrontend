import { useContext, useState } from "react";
import { UserContext } from "../context/UserContext";
import MailTab from "./MailTab";
import PasswordTab from "./PasswordTab";
import ProfileTab from "./ProfileTab";

const AccountSetting = ({ name, email }) => {
	const [activeTab, setActiveTab] = useState("profile");
	const { user } = useContext(UserContext);

	return (
		<main className="bg-base-100 p-6 rounded-lg min-w-lg max-w-lg shadow-lg">
			<h2 className="text-xl font-bold">アカウント設定</h2>
			<p className="text-neutral-500 text-sm">
				アカウント情報の確認と変更ができます。
			</p>

			<div role="tablist" className="tabs tabs-box mt-6">
				<a
					role="tab"
					className={`tab flex-1 ${activeTab === "profile" && "tab-active"}`}
					onClick={() => setActiveTab("profile")}
				>
					プロフィール
				</a>
				{!user.google_account && (
					<>
						<a
							role="tab"
							className={`tab flex-1 ${activeTab === "password" && "tab-active"}`}
							onClick={() => setActiveTab("password")}
						>
							パスワード変更
						</a>
						<a
							role="tab"
							className={`tab flex-1 ${activeTab === "mail" && "tab-active"}`}
							onClick={() => setActiveTab("mail")}
						>
							メール変更
						</a>
					</>
				)}
			</div>

			<div className="mt-6 p-6 border border-base-300 rounded-lg">
				{activeTab === "profile" && (
					<ProfileTab
						name={name}
						email={email}
						googleUser={user?.google_account}
					/>
				)}
				{activeTab === "password" && <PasswordTab />}
				{activeTab === "mail" && <MailTab email={email} />}
			</div>
		</main>
	);
};

export default AccountSetting;
