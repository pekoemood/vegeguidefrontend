import { useActionState } from "react";
import Button from "../../components/Button";
import FormField from "../../components/FormField";
import axios from "axios";
import { useNavigate } from 'react-router';
import Spinner from "../../components/Spinner";

const Login = () => {
	const navigate = useNavigate();
	const [state, submitAction, isPending] = useActionState(
		async (prevState, formData) => {
			const response = await axios.post(`${import.meta.env.VITE_RAILS_API}/login`,{
				email: formData.get('email'),
				password: formData.get('password')
			}, {
        withCredentials: true,
      });
			navigate('/');
		},
		{
			email: '',
			password: ''
		}
	);


	return (
		
		<div className="flex min-h-screen flex-col md:flex-row">
			<div className="relative hidden md:block md:w-1/2 bg-gradient-to-br from-green-50 to-green-100">
				<div className="absolute inset-0 flex flex-col items-center justify-center p-12">
					<div className="max-w-md space-y-6">
						<div className="space-y-2 text-center">
							<h1 className="text-3xl font-bold tracking-tighter text-green-800 sm:text-4xl mad:text-5xl">
								VegeGuide
							</h1>
							<p className="text-gray-600 md:text-xl">
								忙しいあなたの、毎日の"ちょうどいい健康習慣"
							</p>
						</div>

						<div className="relative h-64 w-full overflow-hidden rounded-xl">
							<img
								className="object-cover"
								src="https://images.unsplash.com/photo-1610348725531-843dff563e2c"
								alt="野菜の写真"
							/>
						</div>

						<div className="space-y-4">
							<div>
								<h3 className="font-medium">栄養価の高い旬の野菜</h3>
								<p className="text-sm text-gray-500">
									コスパ良く健康的な食生活を実現
								</p>
							</div>

							<div>
								<h3 className="font-medium">時短レシピ提案</h3>
								<p className="text-sm text-gray-500">
									忙しい毎日でも簡単に調理可能
								</p>
							</div>

							<div>
								<h3 className="font-medium">買い物リスト自動生成</h3>
								<p className="text-sm text-gray-500">
									効率的な買い物をサポート
								</p>
							</div>
						</div>
					</div>
				</div>
			</div>

			<div className="flex flex-1 items-center justify-center p-6 md:p-12">
				<div className="w-full max-w-md space-y-8">
					<div className="space-y-2 text-center md:hidden">
						<h1 className="text-3xl font-bold tracking-tighter text-green-800">
							VegeGuide
						</h1>
						<p className="text-gray-600">
							忙しいあなたの、毎日の"ちょうどいい健康習慣"
						</p>
					</div>

					<div className="space-y-6">
						<div className="space-y-2 text-center">
							<h2 className="text-2xl font-semibold tracking-tight">
								アカウントにログイン
							</h2>
							<p className="text-sm text-gray-500">
								健康的な食生活への第一歩を踏み出しましょう
							</p>
						</div>

						<form className="space-y-6" action={submitAction}>
							<FormField
								id="email"
								label="メールアドレス"
								type="email"
								name='email'
								placeholder="vege@gmail.com"
							/>
							<FormField
								id="password"
								label="パスワード"
								type="password"
								name='password'
								placeholder="8文字以上の英数字"
							/>
							<Button type="submit" disabled={isPending}>{isPending ? <Spinner/> : 'ログイン'}</Button>
						</form>
						
					</div>
				</div>
			</div>
		</div>
	);
};

export default Login;
