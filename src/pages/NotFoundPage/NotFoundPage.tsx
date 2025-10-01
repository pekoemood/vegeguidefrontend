import { House } from "lucide-react";
import { useNavigate } from "react-router";

const NotFoundPage = () => {
	const navigate = useNavigate();
	return (
		<main className="min-h-screen flex items-center justify-around p-4">
			<div className="max-w-lg w-full text-center space-y-8">
				<div className="space-y-4">
					<h1 className="text-9xl font-bold text-primary select-none">404</h1>
					<div className="space-y-2">
						<h2 className="text-3xl font-semibold">ページが見つかりません</h2>
						<p className="leading-relaxed ">
							お探しのページは存在しないか、移動された可能性があります。
						</p>
					</div>
				</div>

				<div className="space-y-3">
					<button
						type="button"
						className="btn w-full"
						onClick={() => navigate("/")}
					>
						<House className="w-4 h-4" />
						ホームに戻る
					</button>
				</div>
			</div>
		</main>
	);
};

export default NotFoundPage;
