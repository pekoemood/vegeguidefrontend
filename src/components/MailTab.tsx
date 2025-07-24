import { Mail } from "lucide-react";
import { useActionState } from "react";
import toast from "react-hot-toast";
import { api } from "../utils/axios";
import { EmailFormData } from "../types/apiResponse";


const MailTab = ({ email }:{email: string}) => {
	const initialState = {
		new_email: "",
		password: "",
	};

	const [state, formAction, isPending] = useActionState(
		async (_currentState, formData: FormData) => {
			const data = Object.fromEntries(formData.entries());

			try {
				await api.post(`/email_change_requests`, {
					new_email: data.newEmail,
					password: data.password,
				});
				toast.success("新しいメールアドレスに確認メールを送信しました");
			} catch (err) {
				console.log(err);
				toast.error(err.response?.data?.message);
			}
		},
		initialState,
	);

	return (
		<section className="flex flex-col space-y-6">
			<div>
				<div className="flex items-center space-x-1">
					<Mail size={18} />
					<h2 className="text-lg font-bold">メールアドレス変更</h2>
				</div>

				<p className="text-neutral-500 text-sm">
					新しいメールアドレスに変更できます。
				</p>
			</div>

			<form action={formAction}>
				<fieldset className="fieldset space-y-4">
					<div>
						<label htmlFor="" className="label text-sm">
							現在のメールアドレス
						</label>
						<input
							type="email"
							placeholder="現在のパスワードを入力"
							className="input w-full"
							value={email}
							disabled={true}
						/>
					</div>

					<div>
						<label htmlFor="" className="label text-sm">
							新しいメールアドレス
						</label>
						<input
							type="email"
							placeholder="new-email@example.com"
							className="input w-full"
							name="newEmail"
						/>
					</div>

					<div>
						<label htmlFor="" className="label text-sm">
							現在のパスワード
						</label>
						<input
							type="password"
							placeholder="現在のパスワードを入力"
							className="input w-full"
							name="password"
						/>
					</div>

					<button
						className="btn btn-primary"
						type="submit"
						disabled={isPending}
					>
						{isPending ? (
							<span className="loading loading-spinner loading-xs"></span>
						) : (
							"メールアドレスを変更"
						)}
					</button>
				</fieldset>
			</form>
		</section>
	);
};

export default MailTab;
