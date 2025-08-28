import { Eye, EyeOff, Lock } from "lucide-react";
import { useState } from "react";
import toast from "react-hot-toast";
import { Errors, type PasswordChangeResponse } from "../types/apiResponse";
import { api } from "../utils/axios";
import { passwordChangeSchema } from "../utils/validation";

const PasswordTab = () => {
	const [showPassword, setShowPassword] = useState(false);
	const [showConfirm, setShowConfirm] = useState(false);
	const [errors, setErrors] = useState<Record<string, string[] | undefined>>(
		{},
	);
	const [formData, setFormDate] = useState({
		oldPassword: "",
		newPassword: "",
	});

	const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
		setFormDate((prev) => ({
			...prev,
			[e.target.name]: e.target.value,
		}));
	};

	const handleSubmit = async (e: React.FormEvent<HTMLElement>) => {
		e.preventDefault();

		const result = passwordChangeSchema.safeParse(formData);

		if (!result.success) {
			const fieldErrors = result.error.flatten().fieldErrors;
			setErrors(fieldErrors);
			return;
		}

		setErrors({});
		try {
			await api.patch<PasswordChangeResponse>(`/password`, {
				old_password: formData.oldPassword,
				new_password: formData.newPassword,
			});
			toast.success("パスワードの更新が完了しました");
		} catch (err) {
			console.log(err);
			toast.error("パスワードの更新に失敗しました");
		}
	};

	return (
		<section className="flex flex-col space-y-6">
			<div>
				<div className="flex items-center space-x-1">
					<Lock size={18} className="relative top-[-2px]" />
					<h2 className="text-lg font-bold">パスワード変更</h2>
				</div>

				<p className="text-neutral-500 text-sm">
					セキュリティのため、定期的にパスワードを変更することをおすすめします。
				</p>
			</div>

			<form onSubmit={handleSubmit}>
				<fieldset className="fieldset space-y-4">
					<div>
						<label htmlFor="oldPassword" className="label text-sm">
							現在のパスワード
						</label>
						<div className="relative">
							<input
								type={`${showPassword ? "text" : "password"}`}
								placeholder="現在のパスワードを入力"
								className="input w-full"
								name="oldPassword"
								value={formData.oldPassword}
								onChange={handleChange}
								id="oldPassword"
							/>
							<button
								className="absolute right-3 top-1/2 -translate-y-1/2"
								onClick={() => setShowPassword(!showPassword)}
								type="button"
							>
								{showPassword ? <EyeOff size={15} /> : <Eye size={15} />}
							</button>
						</div>
						{errors.oldPassword &&
							errors.oldPassword.map((text) => (
								<p key={text} className="mt-2 text-red-500">
									{text}
								</p>
							))}
					</div>

					<div>
						<label htmlFor="newPassword" className="label text-sm">
							新しいパスワード
						</label>
						<div className="relative">
							<input
								type={`${showConfirm ? "text" : "password"}`}
								placeholder="新しいパスワードを入力"
								className="input w-full"
								name="newPassword"
								value={formData.newPassword}
								onChange={handleChange}
								id="newPassword"
							/>
							<button
								className="absolute right-3 top-1/2 -translate-y-1/2"
								onClick={() => setShowConfirm(!showConfirm)}
								type="button"
							>
								{showConfirm ? <EyeOff size={15} /> : <Eye size={15} />}
							</button>
						</div>
						{errors.newPassword &&
							errors.newPassword.map((text) => (
								<p key={text} className="mt-2 text-red-500">
									{text}
								</p>
							))}
					</div>

					<button className="btn btn-primary" type="submit">
						パスワードを変更
					</button>
				</fieldset>
			</form>
		</section>
	);
};

export default PasswordTab;
