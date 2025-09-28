import { CircleCheckBig, Mail } from "lucide-react";

const EmailChangeSuccess = ({
	email,
	closeModal,
}: { email: string; closeModal: () => void }) => {
	return (
		<section className="bg-base-100 p-6 rounded-lg min-w-lg shadow-lg">
			<div className="flex justify-center flex-col items-center space-y-4">
				<div className="flex items-center justify-center w-12 h-12 rounded-full bg-emerald-200">
					<CircleCheckBig className="text-primary" />
				</div>

				<div className="flex flex-col space-y-2 justify-center items-center">
					<h2 className="text-2xl font-bold">
						メールアドレスの変更が完了しました
					</h2>
					<p className="text-neutral-500">
						新しいメールアドレスでの認証が正常が完了しました
					</p>

					<div className="bg-info rounded-lg flex items-center p-4 space-x-4 w-full mt-4">
						<Mail />
						<div>
							<p className="text-sm">新しいメールアドレス</p>
							<p className="text-sm">{email}</p>
						</div>
					</div>

					<div className="w-full mt-4">
						<p className="font-semibold">次のステップ</p>
						<ul className="mt-2 list-disc list-inside space-y-2">
							<li className="text-sm text-neutral-500">
								今後のログインには新しいメールアドレスを使用してください
							</li>
							<li className="text-sm text-neutral-500">
								重要な通知は新しいメールアドレスに送信されます
							</li>
							<li className="text-sm text-neutral-500">
								セキュリティ設定の確認を勧めます
							</li>
						</ul>
					</div>

					<div className="border-t-1 border-base-300 w-full mt-4" />

					<button type="button" className="btn btn-neutral mt-4" onClick={closeModal}>
						閉じる
					</button>
				</div>
			</div>
		</section>
	);
};

export default EmailChangeSuccess;
