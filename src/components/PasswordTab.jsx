import { Eye, EyeOff, Lock } from "lucide-react";
import { useState } from "react";
import toast, { Toaster } from "react-hot-toast";
import { api } from "../utils/axios";
import { passwordSchema } from "../utils/validation";

const PasswordTab = () => {
	const [showPassword, setShowPassword] = useState(false);
	const [showConfirm, setShowConfirm] = useState(false);
	const [errors, setErrors] = useState({});
	const [formDate, setFormDate] = useState({
		oldPassword: "",
		newPassword: "",
	});

	const handleChange = (e) => {
		setFormDate((prev) => ({
			...prev,
			[e.target.name]: e.target.value,
		}));
	};

	const handleSubmit = async (e) => {
		e.preventDefault();

		const result = passwordSchema.safeParse(formDate);

		if (!result.success) {
			const fieldErrors = {};
			result.error.errors.forEach((err) => {
				const field = err.path[0];
				fieldErrors[field] = err.message;
			});
			setErrors(fieldErrors);
			return;
		}

		setErrors({});
		try {
			await api.patch(`/password`, {
				old_password: formDate.oldPassword,
				new_password: formDate.newPassword,
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
						<label htmlFor="" className="label text-sm">
							現在のパスワード
						</label>
						<div className="relative">
							<input
								type={`${showPassword ? "text" : "password"}`}
								placeholder="現在のパスワードを入力"
								className="input w-full"
								name="oldPassword"
								value={formDate.oldPassword}
								onChange={handleChange}
							/>
							<button
								className="absolute right-3 top-1/2 -translate-y-1/2"
								onClick={() => setShowPassword(!showPassword)}
								type="button"
							>
								{showPassword ? <EyeOff size={15} /> : <Eye size={15} />}
							</button>
						</div>
						{errors.oldPassword && (
							<p className="mt-2 text-red-500">{errors.oldPassword}</p>
						)}
					</div>

					<div>
						<label htmlFor="" className="label text-sm">
							新しいパスワード
						</label>
						<div className="relative">
							<input
								type={`${showConfirm ? "text" : "password"}`}
								placeholder="新しいパスワードを入力"
								className="input w-full"
								name="newPassword"
								value={formDate.newPassword}
								onChange={handleChange}
							/>
							<button
								className="absolute right-3 top-1/2 -translate-y-1/2"
								onClick={() => setShowConfirm(!showConfirm)}
								type="button"
							>
								{showConfirm ? <EyeOff size={15} /> : <Eye size={15} />}
							</button>
						</div>
						{errors.newPassword && (
							<p className="mt-2 text-red-500">{errors.newPassword}</p>
						)}
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
