import { Mail } from "lucide-react";
import { useState } from "react";

const MailTab = ({ email }) => {
  const [formData, setFormData] = useState({
    newEmail: "",
    password: "",
  })

  const handleChange = (e) => {
    setFormData((prev) => ({
      ...prev, [e.target.name]: e.target.value
    }))
  }


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

			<form>
				<fieldset className="fieldset space-y-4">
					<div>
						<label htmlFor="" className="label text-sm">
							現在のメールアドレス
						</label>
						<input
							type="email"
							placeholder="現在のパスワードを入力"
							className="input w-full"
							name="oldMail"
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
              value={formData.newEmail}
              onChange={handleChange}
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
              value={formData.password}
              onChange={handleChange}
						/>
					</div>

					<button className="btn btn-primary" type="submit">
						メールアドレスを変更
					</button>
				</fieldset>
			</form>
		</section>
	);
};

export default MailTab;
