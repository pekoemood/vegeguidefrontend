import { zodResolver } from "@hookform/resolvers/zod";
import axios from "axios";
import { JSX, use, useTransition } from "react";
import { useForm } from "react-hook-form";
import { Link, useNavigate } from "react-router";
import Button from "../../components/Button";
import FormField from "../../components/FormField";
import GoogleLoginButton from "../../components/GoogleLoginButton";
import Meta from "../../components/Meta";
import Spinner from "../../components/Spinner";
import { UserContext } from "../../context/UserContext";
import { LoginInput, loginSchema } from "../../utils/validation";
import { api } from "../../utils/axios";
import toast from "react-hot-toast";

interface UserProps {
	name: string;
	email: string;
	password: string;
}

interface UserResponse {
	name: string;
	email: string;
	status?: string;
}


const Login = ():JSX.Element => {
	const [isPending, startTransition] = useTransition();
	const navigate = useNavigate();
	const { setUser } = use(UserContext);
	const defaultValues: UserProps = {
		name: "",
		email: "",
		password: "",
	};

	const {
		register,
		handleSubmit,
		formState: { errors },
	} = useForm<LoginInput>({
		defaultValues,
		resolver: zodResolver(loginSchema),
	});

	const onSubmit = ({ email, password }: { email: string, password: string}) => {
		startTransition(async () => {
			try {
				const response = await api.post<UserResponse>(`/login`,
					{
						email,
						password,
					},
				);
				setUser(response.data);
				navigate("/vegelist");
			} catch (error) {
				if (error.response) {
					console.log("エラーメッセージ", error.response.data.status);
					toast.error(error.response.data.status)
				} else if (error.request) {
					console.log("サーバーからの応答なし");
					toast.error('サーバーからの応答なし');
				} else {
					console.log("エラー:", error.message);
				}
				console.error("登録に失敗しました:", error);
			}
		});
	};

	return (
		<>
			<Meta
				title="ログイン"
				description="冷蔵庫の食材をスマートに管理。不足・賞味期限も通知で安心。食材をムダなく使えます。"
			/>
			<div className="flex min-h-screen flex-col md:flex-row animate-fade-up">
				<div className="relative hidden md:block md:w-1/2 bg-gradient-to-br from-green-50 to-green-100 animate-fade-up" style={{animationDelay: '0.1s', animationFillMode: 'both'}}>
					<div className="absolute inset-0 flex flex-col items-center justify-center p-12">
						<div className="max-w-md space-y-6">
							<div className="space-y-2 text-center animate-fade-up" style={{animationDelay: '0.2s', animationFillMode: 'both'}}>
								<h1 className="text-3xl font-bold tracking-tighter text-green-800 sm:text-4xl mad:text-5xl">
									VegeGuide
								</h1>
								<p className="text-gray-600 md:text-xl">
									忙しいあなたの、毎日の"ちょうどいい健康習慣"
								</p>
							</div>

							<div className="relative h-64 w-full overflow-hidden rounded-xl animate-fade-up" style={{animationDelay: '0.3s', animationFillMode: 'both'}}>
								<img
									className="object-cover"
									src="https://images.unsplash.com/photo-1610348725531-843dff563e2c"
									alt="野菜の写真"
								/>
							</div>

							<div className="space-y-4">
								<div className="animate-fade-up" style={{animationDelay: '0.4s', animationFillMode: 'both'}}>
									<h3 className="font-medium">栄養価の高い旬の野菜</h3>
									<p className="text-sm text-gray-500">
										コスパ良く健康的な食生活を実現
									</p>
								</div>

								<div className="animate-fade-up" style={{animationDelay: '0.45s', animationFillMode: 'both'}}>
									<h3 className="font-medium">時短レシピ提案</h3>
									<p className="text-sm text-gray-500">
										忙しい毎日でも簡単に調理可能
									</p>
								</div>

								<div className="animate-fade-up" style={{animationDelay: '0.5s', animationFillMode: 'both'}}>
									<h3 className="font-medium">買い物リスト自動生成</h3>
									<p className="text-sm text-gray-500">
										効率的な買い物をサポート
									</p>
								</div>
							</div>
						</div>
					</div>
				</div>

				<div className="flex flex-1 items-center justify-center p-6 md:p-12 animate-fade-up" style={{animationDelay: '0.15s', animationFillMode: 'both'}}>
					<div className="w-full max-w-md space-y-8">
						<div className="space-y-2 text-center md:hidden animate-fade-up" style={{animationDelay: '0.2s', animationFillMode: 'both'}}>
							<h1 className="text-3xl font-bold tracking-tighter text-green-800">
								VegeGuide
							</h1>
							<p className="text-gray-600">
								忙しいあなたの、毎日の"ちょうどいい健康習慣"
							</p>
						</div>

						<div className="space-y-6">
							<div className="space-y-2 text-center animate-fade-up" style={{animationDelay: '0.25s', animationFillMode: 'both'}}>
								<h2 className="text-2xl font-semibold tracking-tight">
									アカウントにログイン
								</h2>
								<p className="text-sm text-gray-500">
									健康的な食生活への第一歩を踏み出しましょう
								</p>
							</div>

							<div className="animate-fade-up" style={{animationDelay: '0.3s', animationFillMode: 'both'}}>
								<GoogleLoginButton text="Googleでログイン" />
							</div>

							<div className="relative animate-fade-up" style={{animationDelay: '0.35s', animationFillMode: 'both'}}>
								<div className="absolute inset-0 flex items-center">
									<span className="w-full border-t border-base-300"></span>
								</div>
								<div className="relative flex justify-center text-xs">
									<span className="bg-base-100 text-neutral-500 px-2">
										または
									</span>
								</div>
							</div>

							<form
								className="space-y-6 animate-fade-up"
								onSubmit={handleSubmit(onSubmit)}
								noValidate
								style={{animationDelay: '0.4s', animationFillMode: 'both'}}
							>
								<div className="animate-fade-up" style={{animationDelay: '0.45s', animationFillMode: 'both'}}>
									<FormField
										id="email"
										label="メールアドレス"
										type="email"
										placeholder="vege@gmail.com"
										error={errors.email}
										{...register("email")}
									/>
								</div>
								<div className="animate-fade-up" style={{animationDelay: '0.5s', animationFillMode: 'both'}}>
									<FormField
										id="password"
										label="パスワード"
										type="password"
										placeholder="8文字以上の英数字"
										error={errors.password}
										{...register("password")}
									/>
								</div>
								<div className="animate-fade-up" style={{animationDelay: '0.55s', animationFillMode: 'both'}}>
									<Button type="submit" disabled={isPending}>
										{isPending ? <Spinner /> : "ログイン"}
									</Button>
								</div>
							</form>

							<div className="text-center text-sm animate-fade-up" style={{animationDelay: '0.6s', animationFillMode: 'both'}}>
								アカウントをお持ちでないですか？{" "}
								<Link
									to="/signup"
									className="font-medium text-green-600 hover:text-green-700"
								>
									新規登録
								</Link>
							</div>
						</div>
					</div>
				</div>
			</div>
		</>
	);
};

export default Login;
