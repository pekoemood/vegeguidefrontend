import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import toast from "react-hot-toast";
import { beforeEach, describe, expect, it } from "vitest";
import AccountSetting from "../../components/AccountSetting";
import { api } from "../../utils/axios";

describe("AccountSetting", () => {
	// 共通props
	const defaultProps = {
		name: "shio",
		email: "shio@example.com",
	};

	describe("通常アカウント", () => {
		beforeEach(() => {
			render(<AccountSetting {...defaultProps} google_account={false} />);
		});

		it("名前・メールアドレス・全タブが表示される", () => {
			// 入力欄のラベルで取得
			expect(
				screen.getByRole("textbox", { name: "お名前" }),
			).toBeInTheDocument();
			expect(
				screen.getByRole("textbox", { name: "メールアドレス" }),
			).toBeInTheDocument();
			// タブの存在
			expect(
				screen.getByRole("tab", { name: "パスワード" }),
			).toBeInTheDocument();
			expect(
				screen.getByRole("tab", { name: "プロフィール" }),
			).toBeInTheDocument();
			expect(screen.getByRole("tab", { name: "メール" })).toBeInTheDocument();
		});

		it("タブの切り替えが正常に動作する", async () => {
			const user = userEvent.setup();
			// パスワードタブをクリック
			const passwordTab = screen.getByRole("tab", { name: "パスワード" });
			await user.click(passwordTab);
			// パスワード変更フォームが表示される
			expect(
				await screen.findByLabelText("現在のパスワード"),
			).toBeInTheDocument();
			expect(screen.getByLabelText("新しいパスワード")).toBeInTheDocument();
			expect(
				screen.getByRole("button", { name: "パスワードを変更" }),
			).toBeInTheDocument();

			// メールタブをクリック
			const emailTab = screen.getByRole("tab", { name: "メール" });
			await user.click(emailTab);
			// メール変更フォームが表示される
			expect(
				await screen.findByRole("textbox", { name: "現在のメールアドレス" }),
			).toBeInTheDocument();
			expect(
				screen.getByRole("textbox", { name: "新しいメールアドレス" }),
			).toBeInTheDocument();
			expect(
				screen.getByRole("button", { name: "メールアドレスを変更" }),
			).toBeInTheDocument();
		});

		describe("パスワードタブ", () => {
			describe("正常系", () => {
				//パスワードを入力して、成功メッセージを表示させる
				it("正しいパスワード入力で、更新成功メッセージが表示される", async () => {
					const user = userEvent.setup();
					vi.spyOn(api, "patch").mockResolvedValue({
						data: { message: "パスワード変更 " },
					});
					const toastSuccessMock = vi
						.spyOn(toast, "success")
						.mockImplementation(() => {});

					const passwordTab = screen.getByRole("tab", { name: "パスワード" });
					await user.click(passwordTab);
					await user.type(
						screen.getByLabelText("現在のパスワード"),
						"oldpass123",
					);
					await user.type(
						screen.getByLabelText("新しいパスワード"),
						"newpass456",
					);
					await user.click(
						screen.getByRole("button", { name: "パスワードを変更" }),
					);
					expect(toastSuccessMock).toHaveBeenCalledWith(
						"パスワードの更新が完了しました",
					);
				});
			});
		});

		describe("メールタブ", () => {
			describe("正常系", () => {
				it("正しいメールアドレスの入力で、更新メッセージが表示される", async () => {
					const user = userEvent.setup();
					vi.spyOn(api, "post").mockResolvedValue({
						data: { message: "確認メールを送信しました " },
					});

					const toastSuccessMock = vi
						.spyOn(toast, "success")
						.mockImplementation(() => {});

					const mailTab = screen.getByRole("tab", { name: "メール" });
					await user.click(mailTab);
					await user.type(
						screen.getByRole("textbox", { name: "現在のメールアドレス" }),
						"shio@gmail.com",
					);
					await user.type(
						screen.getByRole("textbox", { name: "新しいメールアドレス" }),
						"newShio@gmail.com",
					);
					await user.type(
						screen.getByLabelText("現在のパスワード"),
						"password",
					);
					await user.click(
						screen.getByRole("button", { name: "メールアドレスを変更" }),
					);
					expect(toastSuccessMock).toHaveBeenCalledWith(
						"新しいメールアドレスに確認メールを送信しました",
					);
				});
			});
		});
	});

	describe("Googleアカウント", () => {
		beforeEach(() => {
			render(<AccountSetting {...defaultProps} google_account={true} />);
		});

		it("名前・メールアドレスのみ表示され、パスワード/メールタブは非表示", () => {
			expect(
				screen.getByRole("textbox", { name: "お名前" }),
			).toBeInTheDocument();
			expect(screen.getByDisplayValue(defaultProps.name)).toBeInTheDocument();
			expect(
				screen.getByRole("textbox", { name: "メールアドレス" }),
			).toBeInTheDocument();
			expect(screen.getByDisplayValue(defaultProps.email)).toBeInTheDocument();
			// Googleアカウントではパスワード・メールタブが表示されない
			expect(
				screen.queryByRole("tab", { name: "パスワード" }),
			).not.toBeInTheDocument();
			expect(
				screen.queryByRole("tab", { name: "メール" }),
			).not.toBeInTheDocument();
		});
	});
});
