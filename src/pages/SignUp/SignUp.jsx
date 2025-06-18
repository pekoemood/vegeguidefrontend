import { zodResolver } from "@hookform/resolvers/zod";
import axios from "axios";
import { use, useContext, useTransition } from "react";
import { useForm } from "react-hook-form";
import { Link, useNavigate } from "react-router";
import Button from "../../components/Button";
import FormField from "../../components/FormField";
import GoogleLoginButton from "../../components/GoogleLoginButton";
import Spinner from "../../components/Spinner";
import { UserContext } from "../../context/UserContext";
import { signUpSchema } from "../../utils/validation";
import Meta from "../../components/Meta";

const SignUp = () => {
	const [isPending, startTransition] = useTransition();
	const navigate = useNavigate();
	const { user, setUser, loading } = use(UserContext);
	const defaultValues = {
		name: "",
		email: "",
		password: "",
	};

	const {
		register,
		handleSubmit,
		formState: { errors, isSubmitting },
	} = useForm({
		defaultValues,
		resolver: zodResolver(signUpSchema),
	});

	const onSubmit = ({ name, email, password }) => {
		startTransition(async () => {
			try {
				const response = await axios.post(
					`${import.meta.env.VITE_RAILS_API}/users`,
					{
						name,
						email,
						password,
					},
					{
						withCredentials: true,
					},
				);
				setUser(response.data);
				navigate("/vegelist");
			} catch (error) {
				if (error.response) {
					console.log("エラーメッセージ", error.response.data.status);
				} else if (error.request) {
					console.log("サーバーからの応答なし");
				} else {
					console.log("エラー", error.message);
				}
				console.error("登録に失敗しました:", error);
			}
		});
	};

	const onError = (error, e) => console.log(error, e);

	return (
		<>
		<Meta title='新規登録' description="無料で VegeGuide に登録して、野菜の指南・レシピ提案・買い物リストなど全機能を使い始めましょう。" />
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
								src="https://images.unsplash.com/photo-1542838132-92c53300491e"
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
								新規アカウント登録
							</h2>
							<p className="text-sm text-gray-500">
								健康的な食生活を始めるための第一歩
							</p>
						</div>

						<GoogleLoginButton text={"Googleで登録"} />

						<div className="relative">
							<div className="absolute inset-0 flex items-center">
								<span className="w-full border-t border-base-300"></span>
							</div>
							<div className="relative flex justify-center text-xs">
								<span className="bg-base-100 px-2 text-neutral-500">
									または
								</span>
							</div>
						</div>

						<form
							className="space-y-6"
							onSubmit={handleSubmit(onSubmit, onError)}
							noValidate
						>
							<FormField
								id="name"
								label="名前"
								type="text"
								placeholder="vegeguide"
								error={errors.name}
								{...register("name")}
							/>
							<FormField
								id="email"
								label="メールアドレス"
								type="email"
								placeholder="vege@gmail.com"
								error={errors.email}
								{...register("email")}
							/>
							<FormField
								id="password"
								label="パスワード"
								type="password"
								placeholder="8文字以上の英数字"
								error={errors.password}
								{...register("password")}
							/>
							<Button type="submit" disabled={isPending}>
								{isPending ? <Spinner /> : "登録する"}
							</Button>
						</form>

						<div className="text-center text-sm">
							すでにアカウントをお持ちですか？{" "}
							<Link
								to="/login"
								className="font-medium text-green-600 hover:text-green-700"
							>
								ログイン
							</Link>
						</div>
					</div>
				</div>
			</div>
		</div>
		</>
	);
};

export default SignUp;
