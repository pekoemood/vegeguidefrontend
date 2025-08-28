import { useState } from "react";
import MailTab from "./MailTab";
import PasswordTab from "./PasswordTab";
import ProfileTab from "./ProfileTab";

const AccountSetting = ({name, email, google_account}: { name: string; email: string; google_account: boolean; }) => {
	const [activeTab, setActiveTab] = useState<string>("profile");

	return (
		<main className="bg-base-100 p-6 rounded-lg max-w-lg lg:w-lg shadow-lg">
			<h2 className="text-xl font-bold">アカウント設定</h2>
			<p className="text-neutral-500 text-sm">
				アカウント情報の確認と変更ができます。
			</p>

			<div role="tablist" className="tabs tabs-box mt-6">
				<a
					role="tab"
					className={`text-xs md:text-base tab flex-1 ${activeTab === "profile" && "tab-active"}`}
					onClick={() => setActiveTab("profile")}
				>
					プロフィール
				</a>
				{!google_account && (
					<>
						<a
							role="tab"
							className={`text-xs md:text-base tab flex-1 ${activeTab === "password" && "tab-active"}`}
							onClick={() => setActiveTab("password")}
						>
							パスワード
						</a>
						<a
							role="tab"
							className={`text-xs md:text-base tab flex-1 ${activeTab === "mail" && "tab-active"}`}
							onClick={() => setActiveTab("mail")}
						>
							メール
						</a>
					</>
				)}
			</div>

			<div className="mt-6 p-6 border border-base-300 rounded-lg">
				{activeTab === "profile" && (
					<ProfileTab
						name={name}
						email={email}
						googleUser={google_account}
					/>
				)}
				{activeTab === "password" && <PasswordTab />}
				{activeTab === "mail" && <MailTab email={email} />}
			</div>
		</main>
	);
};

export default AccountSetting;
