import { ChefHat, Leaf, Refrigerator, ShoppingCart } from "lucide-react";
import { useNavigate } from "react-router";
import EmailChangeSuccess from "../../components/EmailChangeSuccess";
import Meta from "../../components/Meta";
import { useEmailChangeConfirmation } from "../../hooks/useEmailChangeConfirmation";
import useModal from "../../hooks/useModal";
import { useScrollAnimation } from "../../hooks/useScrollAnimation";
import FeatureCard from "./FeatureCard";
import MeritHighLight from "./MeritHighLight";
import Recommend from "./Recommend";
import UsageCard from "./UsageCard";

const recommendList: string[] = [
	"忙しい仕事の合間に健康的な食事を摂りたい方",
	"料理は苦手だけど、外食やコンビニ食を減らしたい方",
	"健康を意識し始めた社会人の方",
	"食費を抑えつつ、栄養バランスの良い食事をしたい方",
	"食材を無駄にせず、効率的に使い切りたい方",
];

function Top(): React.ReactElement {
	const navigate = useNavigate();
	const { Modal, openModal, closeModal } = useModal();
	const { email } = useEmailChangeConfirmation(openModal);
	useScrollAnimation();

	return (
		<>
			<Meta title="トップ" description="VegeGuideのアプリ概要です。" />
			<header className="w-full mx-auto sticky top-0 z-40 backdrop-blur bg-white animate-fade-up mb-16 lg:mb-32">
				<div className="container mx-auto flex h-16 items-center justify-center">
					<nav className="flex justify-center gap-8">
						<a href="#feature" className="transition hover:text-primary">
							特徴
						</a>
						<a href="#usage" className="transition hover:text-primary">
							使い方
						</a>
						<a href="#merit" className="transition hover:text-primary">
							メリット
						</a>
					</nav>
				</div>
			</header>
			<main
				className="container flex flex-col px-4 lg:px-0  mx-auto space-y-16 lg:space-y-32 min-h-screen animate-fade-up"
				style={{ animationDelay: "0.1s", animationFillMode: "both" }}
			>
				<section
					className="flex mx-auto animate-fade-up"
					style={{ animationDelay: "0.2s", animationFillMode: "both" }}
				>
					<div className="flex-1 flex flex-col items-center justify-center space-y-8">
						<h1
							className="text-center lg:text-left text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight animate-fade-up"
							style={{ animationDelay: "0.3s", animationFillMode: "both" }}
						>
							忙しいあなたの
							<br />
							<span className="text-primary">毎日のちょうどいい健康習慣</span>
						</h1>
						<p
							className=" text-lg md:text-xl lg:text-2xl text-neutral-500 animate-fade-up"
							style={{ animationDelay: "0.4s", animationFillMode: "both" }}
						>
							野菜情報・価格比較・レシピ提案・買い物リスト・食材管理を一元化。
							<br />
							料理のハードルを下げ、食材のムダを防ぎながら、栄養価が高くコスパの良い食生活をサポートします。
						</p>
						<div
							className="flex space-x-4 animate-fade-up"
							style={{ animationDelay: "0.5s", animationFillMode: "both" }}
						>
							<button
								className="btn btn-primary"
								onClick={() => navigate("/signup")}
							>
								今すぐ使ってみる
							</button>
							<button className="btn">
								<a href="#feature">詳しく見る</a>
							</button>
						</div>
					</div>
					<div
						className="hidden lg:flex flex-1 justify-center animate-fade-up"
						style={{ animationDelay: "0.6s", animationFillMode: "both" }}
					>
						<div className="mockup-phone ">
							<div className="mockup-phone-camera" />
							<div className="bg-base-100 mockup-phone-display text-white grid place-content-center p-2">
								<img src="/top.png" alt="" />
							</div>
						</div>
					</div>
				</section>

				<section id="feature" className="scroll-mt-20 scroll-animation-target">
					<div className="container mx-auto">
						<div className="text-center">
							<h2 className="text-2xl md:text-3xl lg:text-4xl font-bold">
								<span className="text-primary">VegeGuide</span>の特徴
							</h2>
							<p className="text-md md:text-lg lg:text-xl text-neutral-500 mt-4">
								健康的な食生活を送りたいけれど、忙しくて時間がない。
								そんなあなたの毎日をサポートする機能が揃っています。
							</p>
						</div>

						<div className="grid grid-cols-1 lg:grid-cols-4 gap-8 mt-16">
							<div className="scroll-animation-target">
								<FeatureCard
									title="旬の野菜情報"
									description="「旬・安い・栄養価が高い」野菜を一覧で表示。 季節に合わせた最適な食材選びをサポートします。"
									Icon={Leaf}
								/>
							</div>
							<div
								className="animate-fade-up"
								style={{ animationDelay: "0.85s", animationFillMode: "both" }}
							>
								<FeatureCard
									title="時短レシピ提案"
									description="選んだ野菜を使った簡単レシピをすぐに提案。 忙しい平日でも手軽に作れるメニューが見つかります。"
									Icon={ChefHat}
								/>
							</div>
							<div
								className="animate-fade-up"
								style={{ animationDelay: "0.9s", animationFillMode: "both" }}
							>
								<FeatureCard
									title="買い物リスト自動生成"
									description="レシピを選ぶだけで必要な食材が自動でリストアップ。 仕事帰りのスーパーでもサクッと買い物ができます。"
									Icon={ShoppingCart}
								/>
							</div>
							<div
								className="animate-fade-up"
								style={{ animationDelay: "0.95s", animationFillMode: "both" }}
							>
								<FeatureCard
									title="食材管理＋レシピ提案"
									description="買い物リストから食材を登録し、賞味期限や在庫を管理。登録食材を使ったレシピも提案。食材を無駄なく使い切ります。"
									Icon={Refrigerator}
								/>
							</div>
						</div>
					</div>
				</section>

				<section id="usage" className="scroll-mt-20 scroll-animation-target">
					<div className="container mx-auto">
						<div className="text-center">
							<h2 className="text-2xl md:text-3xl lg:text-4xl font-bold">
								使い方はとてもシンプル
							</h2>
							<p className="text-md md:text-lg lg:text-xl text-neutral-500 mt-4">
								複数のアプリを行き来する必要はありません。
								VegeGuideひとつで、食材選びから調理まで一気通貫でサポートします。
							</p>
						</div>

						<div className="grid grid-cols-1 lg:grid-cols-4 gap-8 mt-16 place-items-center">
							<div className="scroll-animation-target">
								<UsageCard
									image="https://i.gyazo.com/ce62a126366946d7196e7c61a7118a26.jpg"
									title="旬の野菜を選ぶ"
									description="アプリを開くと、旬の野菜が一覧で表示されます。"
									number="1"
								/>
							</div>
							<div
								className="animate-fade-up"
								style={{ animationDelay: "1.15s", animationFillMode: "both" }}
							>
								<UsageCard
									image="https://i.gyazo.com/de1f1402b1c2b8ecf02bf5c13dba219a.png"
									title="レシピを生成する"
									description="レシピ提案から選んだ野菜のレシピを生成します。"
									number="2"
								/>
							</div>
							<div
								className="animate-fade-up"
								style={{ animationDelay: "1.2s", animationFillMode: "both" }}
							>
								<UsageCard
									image="https://i.gyazo.com/8684ee9291f2a6850f9011ffcd941483.png"
									title="買い物リストを作成"
									description="生成したレシピから買い物リストを作成します"
									number="3"
								/>
							</div>
							<div
								className="animate-fade-up"
								style={{ animationDelay: "1.25s", animationFillMode: "both" }}
							>
								<UsageCard
									image="https://i.gyazo.com/cadd35db48d1482d86cc2bbebab4479e.png"
									title="簡単に調理"
									description="レシピ通りに、短時間で簡単に調理できます。"
									number="4"
								/>
							</div>
						</div>
					</div>
				</section>

				<section id="merit" className="scroll-mt-20 scroll-animation-target">
					<div className="container mx-auto">
						<div className="text-center">
							<h2 className="text-2xl md:text-3xl lg:text-4xl font-bold">
								VegeGuideを使うメリット
							</h2>
							<p className="text-md md:text-lg lg:text-xl text-neutral-500 mx-auto mt-4">
								健康的な食生活を無理なく続けるための、4つの推しポイント
							</p>
						</div>

						<div className="space-y-12 mt-8">
							<MeritHighLight
								title="旬の野菜 × 価格情報 × 栄養価表示の三位一体"
								merits={[
									"「今の旬」「価格の安さ」「栄養面」の3軸から、コスパの良い食材選びができる",
									"他のレシピアプリや買い物アプリにはない、情報の一元化を実現",
								]}
								image={
									<a href="https://gyazo.com/fb5be1e00203df88a56a73f9291c9d87">
										<img
											src="https://i.gyazo.com/fb5be1e00203df88a56a73f9291c9d87.gif"
											alt="Image from Gyazo"
											width="600"
										/>
									</a>
								}
								order={["order-1", "order-2"]}
							/>
							<MeritHighLight
								title="買い物リストの自動生成 × 実用的UI"
								merits={[
									"レシピ一覧から自動生成できるチェックリスト付き買い物リスト",
									"仕事帰りでもサクッと買い物できる実用的なUI設計",
								]}
								image={
									<a href="https://gyazo.com/b40e4457aeb065d479f75c0010c8cf2b">
										<img
											src="https://i.gyazo.com/b40e4457aeb065d479f75c0010c8cf2b.gif"
											alt="Image from Gyazo"
											width="600"
										/>
									</a>
								}
								order={["order-1 md:order-2", "order-1 md:order-1"]}
							/>
							<MeritHighLight
								title="複数アプリを行き来する必要がなく、毎日の食生活がシンプルに"
								merits={[
									"「野菜を選ぶ→買う→作る→残りも使う」一連の流れを一つのサービスで完結",
									"他サービスのように「レシピだけ」「栄養管理だけ」「冷蔵庫管理だけ」という分断がない",
								]}
								image={
									<a href="https://gyazo.com/6632c66b96f6e7eb1ca6c49a3cd5e9ea">
										<img
											src="https://i.gyazo.com/6632c66b96f6e7eb1ca6c49a3cd5e9ea.gif"
											alt="Image from Gyazo"
											width="480"
										/>
									</a>
								}
								order={["order-1", "order-2"]}
							/>
							<MeritHighLight
								title="食材の無駄を減らす「冷蔵庫機能」"
								merits={[
									"「今あるもので何が作れる？」がすぐにわかる",
									"食材のムダがなくなり、食費削減＋罪悪感ゼロ",
									"生成AIによるカスタムレシピ提案、冷蔵庫内食材に基づくリコメンド",
								]}
								image={
									<a href="https://gyazo.com/c2dda647c92d1499f67c7446b210ecef">
										<img
											src="https://i.gyazo.com/c2dda647c92d1499f67c7446b210ecef.gif"
											alt="Image from Gyazo"
											width="480"
										/>
									</a>
								}
								order={["order-1 md:order-2", "order-2 md:order-1"]}
							/>
						</div>
					</div>
				</section>

				<section
					className="animate-fade-up"
					style={{ animationDelay: "1.4s", animationFillMode: "both" }}
				>
					<div className="container mx-auto">
						<div className="text-center">
							<div className="mx-auto max-w-2xl rounded-xl shadow-lg p-1 md:p-5 lg:p-10">
								<h2 className="text-2xl md:text-3xl lg:text-4xl font-bold">
									こんな方におすすめです
								</h2>

								<div className="space-y-4 mt-8">
									{recommendList.map((text) => (
										<div key={text} className="scroll-animation-target">
											<Recommend text={text} />
										</div>
									))}
								</div>
							</div>
						</div>
					</div>
				</section>

				<section className="pb-20 scroll-animation-target">
					<div className="container text-center space-y-4 mx-auto">
						<h2 className="text-2xl md:text-3xl lg:text-4xl font-bold">
							今すぐ初めて、<span className="text-primary">健康的な食生活</span>
							を手に入れよう
						</h2>
						<p className="mg:text-lg lg:text-xl text-neutral-500 mx-auto">
							VegeGuideなら、忙しい毎日でも無理なく続けられる
							"ちょうどいい健康習慣"をサポートします。
						</p>

						<div className="flex justify-center pt-4">
							<button
								className="btn btn-primary transform transition hover:scale-105"
								onClick={() => navigate("/signup")}
							>
								今すぐ始める
							</button>
						</div>
					</div>
				</section>
			</main>

			<Modal>
				<EmailChangeSuccess email={email} closeModal={closeModal} />
			</Modal>
		</>
	);
}

export default Top;
