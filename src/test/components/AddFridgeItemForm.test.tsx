import { getByRole, render, screen, waitFor } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import AddFridgeItemForm from "../../components/AddFridgeItemForm";

describe("AddFridgeItemForm", () => {
	describe("正常系", () => {
		const defaultProps = {
			closeModal: vi.fn(),
			categories: [
				{ name: "全て", icon: "all" },
				{ name: "野菜", icon: "veg" },
				{ name: "果物", icon: "fruit" },
			],
			handleAdd: vi.fn(),
		};
		beforeEach(() => {
			vi.useFakeTimers({ toFake: ["Date"] });
			vi.setSystemTime(new Date(2025, 8, 10));
			vi.clearAllMocks();
			render(<AddFridgeItemForm {...defaultProps} />);
		});

		afterEach(() => {
			vi.useRealTimers();
		});
		it("初期表示の確認", () => {
			expect(
				screen.getByRole("heading", { name: "食材を追加" }),
			).toBeInTheDocument();
			expect(
				screen.getByText("食材の情報を入力してください"),
			).toBeInTheDocument();
			expect(
				screen.getByRole("option", { name: "カテゴリを選択してください" }),
			).toBeInTheDocument();
			expect(
				screen.getByRole("button", { name: "賞味期限を選択してください" }),
			).toBeInTheDocument();
			expect(
				screen.getByRole("button", { name: "キャンセル" }),
			).toBeInTheDocument();
			expect(screen.getByRole("button", { name: "追加" })).toBeInTheDocument();
		});

		it("食材情報の入力が正しく反映される", async () => {
			const user = userEvent.setup();
			const inputIngredient = screen.getByPlaceholderText("食材名");
			await user.type(inputIngredient, "人参");
			expect(inputIngredient).toHaveValue("人参");
		});

		it("カテゴリを選択し、反映される", async () => {
			const user = userEvent.setup();
			const selectElement = screen.getByRole("combobox");
			await user.click(selectElement);

			const vegetableOption = screen.getByRole("option", { name: "野菜" });
			await user.selectOptions(selectElement, vegetableOption);
			expect(selectElement).toHaveValue("野菜");

			await user.click(screen.getByRole("combobox", { name: "カテゴリ選択" }));
			const fruitOption = screen.getByRole("option", { name: "果物" });
			await user.selectOptions(selectElement, fruitOption);
			expect(
				screen.getByRole("combobox", { name: "カテゴリ選択" }),
			).toHaveValue("果物");
		});

		it("数量の入力が正しく反映される", async () => {
			const user = userEvent.setup();
			const amountInputElement = screen.getByPlaceholderText("数量");
			await user.type(amountInputElement, "１本");
			expect(amountInputElement).toHaveValue("１本");
		});

		it("賞味期限が正しく反映される", async () => {
			const user = userEvent.setup();
			const openButton = screen.getByRole("button", {
				name: "賞味期限を選択してください",
			});
			await user.click(openButton);
			const calender = screen.getByRole("grid");
			expect(calender).toBeInTheDocument();

			const dateCell = screen.getByRole("button", {
				name: "2025年9月15日月曜日",
			});
			await user.click(dateCell);
			expect(openButton).toHaveTextContent("9/15/2025");
		});

		it("必要事項を入力してhandleAdd関数に引数として渡されること", async () => {
			const user = userEvent.setup();
			// 食材名を入力
			const nameInput = screen.getByPlaceholderText("食材名");
			await user.type(nameInput, "人参");

			// カテゴリを選択
			const selectElement = screen.getByRole("combobox", {
				name: "カテゴリ選択",
			});
			await user.selectOptions(selectElement, "野菜");

			//数量を入力
			const amountElement = screen.getByPlaceholderText("数量");
			await user.type(amountElement, "1本");

			//日付を選択
			const expireButton = screen.getByRole("button", {
				name: "賞味期限を選択してください",
			});
			await user.click(expireButton);
			const dateCell = screen.getByRole("button", {
				name: "2025年9月15日月曜日",
			});
			await user.click(dateCell);

			//submitをクリック
			const submitButton = screen.getByRole("button", { name: "追加" });
			await user.click(submitButton);

			expect(defaultProps.handleAdd).toBeCalled();
			expect(defaultProps.handleAdd).toHaveBeenCalledWith({
				name: "人参",
				category: "野菜",
				amount: "1本",
				date: new Date("2025-09-15T00:00:00.000Z"),
			});
		});
	});
});
