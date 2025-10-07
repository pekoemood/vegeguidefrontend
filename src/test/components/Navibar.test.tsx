import { render, screen } from "@testing-library/react";
import { MemoryRouter } from "react-router";
import Navibar from "../../components/Navibar";
import { UserContext, UserProvider } from "../../context/UserContext";

describe("Navibar", () => {
	describe("正常系", () => {
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

		it("メニュー開閉の確認", () => {
			expect(screen.getByText("野菜一覧"));
		});
	});
});
