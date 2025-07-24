import { useGoogleLogin } from "@react-oauth/google";
import { use } from "react";
import { useNavigate } from "react-router";
import { UserContext } from "../context/UserContext";
import type { googleLoginResponse } from "../types/apiResponse";
import { api } from "../utils/axios";

const GoogleLoginButton = ({ text }: { text: string }) => {
	const navigate = useNavigate();
	const { setUser } = use(UserContext);
	const login = useGoogleLogin({
		flow: "auth-code",
		redirect_uri: import.meta.env.VITE_GOOGLE_REDIRECT_URL,
		onSuccess: async (codeResponse) => {
			const authCode = codeResponse.code;

			try {
				const response = await api.post<googleLoginResponse>(
					`/auth/google_login`,
					{
						code: authCode,
					},
				);
				console.log("ログイン成功", response.data);
				setUser(response.data);
				navigate("/vegelist");
			} catch (err) {
				console.error("ログイン失敗", err);
			}
		},
		onError: () => {
			console.error("ログインに失敗しました");
		},
	});
	return (
		<button
			className="btn bg-white text-black border-[#e5e5e5] w-full"
			onClick={() => login()}
		>
			<svg
				aria-label="Google logo"
				width="16"
				height="16"
				xmlns="http://www.w3.org/2000/svg"
				viewBox="0 0 512 512"
			>
				<g>
					<path d="m0 0H512V512H0" fill="#fff"></path>
					<path
						fill="#34a853"
						d="M153 292c30 82 118 95 171 60h62v48A192 192 0 0190 341"
					></path>
					<path
						fill="#4285f4"
						d="m386 400a140 175 0 0053-179H260v74h102q-7 37-38 57"
					></path>
					<path
						fill="#fbbc02"
						d="m90 341a208 200 0 010-171l63 49q-12 37 0 73"
					></path>
					<path
						fill="#ea4335"
						d="m153 219c22-69 116-109 179-50l55-54c-78-75-230-72-297 55"
					></path>
				</g>
			</svg>
			{text}
		</button>
	);
};

export default GoogleLoginButton;
