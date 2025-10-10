import { render, screen } from "@testing-library/react";
import { MemoryRouter } from "react-router";
import Navibar from "../../components/Navibar";
import { UserContext, UserProvider } from "../../context/UserContext";
import userEvent from "@testing-library/user-event";

describe("Navibar", () => {
	describe("正常系", () => {
		describe("ログイン前", () => {
			beforeEach(() => {
				vi.clearAllMocks();
				render(
					<MemoryRouter>
						<UserContext
							value={{
								user: null,
								setUser: vi.fn(),
								loading: false,
								fetchUser: vi.fn(),
							}}
						>
							<Navibar />
						</UserContext>
					</MemoryRouter>,
				);
			});
			it("ログイン前は新規登録・ログインボタンが表示されること", () => {
				expect(screen.getByText("新規登録")).toBeInTheDocument();
				expect(screen.getByText("ログイン")).toBeInTheDocument();
				expect(screen.queryByTestId("マイページ")).not.toBeInTheDocument();
				expect(screen.queryByText("ログアウト")).not.toBeInTheDocument();
			});
			it("ログイン前は認証が必要なメニューが表示されない", () => {
				expect(screen.queryByText('レシピ提案')).not.toBeInTheDocument();
				expect(screen.queryByText("レシピ一覧")).not.toBeInTheDocument();
				expect(screen.queryByText("買い物リスト")).not.toBeInTheDocument();
				expect(screen.queryByText("冷蔵庫")).not.toBeInTheDocument();
			})
		});
		describe("ログイン後", () => {
			beforeEach(() => {
				vi.clearAllMocks();
				const user = { logged_in: true, name: "shio", email: "shio@gmail.com" };
				render(
					<MemoryRouter>
						<UserContext
							value={{
								user: user,
								setUser: vi.fn(),
								loading: false,
								fetchUser: vi.fn(),
							}}
						>
							<Navibar />
						</UserContext>
					</MemoryRouter>,
				);
			});

			it("ログイン状態のナビゲーションメニューが正しく表示されていること", () => {
				expect(screen.getByText("野菜一覧")).toBeInTheDocument();
				expect(screen.getByText("レシピ提案")).toBeInTheDocument();
				expect(screen.getByText("レシピ一覧")).toBeInTheDocument();
				expect(screen.getByText("買い物リスト")).toBeInTheDocument();
				expect(screen.getByText("マイページ")).toBeInTheDocument();
				expect(screen.getByText("ログアウト")).toBeInTheDocument();
			});

			it('野菜一覧リンクが正しいhrefを持つ',  () => {
				const link  = screen.getByRole("link", { name: "野菜一覧" });
				expect(link).toHaveAttribute('href', '/vegelist');
			});
		});
	});
});
