import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import type { LucideIcon } from "lucide-react";
import React from "react";
import EditFridgeItemForm from "../../components/EditFridgeItemForm";

describe("EditFridgeItemForm", () => {
	const MockIcon: LucideIcon = React.forwardRef<
		SVGSVGElement,
		React.SVGProps<SVGSVGElement>
	>((props, ref) => <div data-testid="mock-icon" ref={ref} {...props} />);
	const defaultProps = {
		closeModal: vi.fn(),
		categories: [
			{ name: "野菜", icon: MockIcon },
			{ name: "肉類", icon: MockIcon },
			{ name: "調味料", icon: MockIcon },
		],
		id: 1,
		item: {
			id: "1",
			name: "人参",
			category: "野菜",
			display_amount: "100g",
			expire_date: "2025-9-20",
			created_at: "2025-09-17T17:44:38.363+09:00",
			created_day: "2025-9-17",
			expire_status: "warning",
		},
		handleEdit: vi.fn(),
	};
	beforeEach(() => {
		vi.useFakeTimers({ toFake: ["Date"] });
		vi.setSystemTime(new Date(2025, 8, 15));
		vi.resetAllMocks();
		render(<EditFridgeItemForm {...defaultProps} />);
	});

	afterEach(() => {
		vi.useRealTimers();
	});

	describe("正常系", () => {
		it("正しく初期表示されること", () => {
			expect(screen.getByPlaceholderText("食材名")).toBeInTheDocument();
			expect(screen.getByRole("combobox")).toBeInTheDocument();
			expect(screen.getByRole("option", { name: "野菜" })).toBeInTheDocument();
			expect(screen.getByPlaceholderText("数量")).toBeInTheDocument();
			expect(
				screen.getByRole("button", { name: "9/20/2025" }),
			).toBeInTheDocument();
		});
		it("入力フィールドが正しく更新されること", async () => {
			const user = userEvent.setup({ delay: null });
			const inputIngredient = screen.getByPlaceholderText("食材名");
			expect(inputIngredient).toHaveValue("人参");
			await user.clear(inputIngredient);
			await user.type(inputIngredient, "牛肉");
			expect(inputIngredient).toHaveValue("牛肉");

			const selectElement = screen.getByRole("combobox");
			expect(selectElement).toHaveValue("野菜");
			await user.selectOptions(selectElement, "肉類");
			expect(selectElement).toHaveValue("肉類");

			const inputAmount = screen.getByPlaceholderText("数量");
			expect(inputAmount).toHaveValue("100g");
			await user.clear(inputAmount);
			await user.type(inputAmount, "500g");
			expect(inputAmount).toHaveValue("500g");

			const dateButton = screen.getByRole("button", { name: "9/20/2025" });
			await user.click(dateButton);

			const calendar = screen.getByRole("grid");
			expect(calendar).toBeInTheDocument();

			const targetDate = screen.getByRole("button", {
				name: "2025年9月25日木曜日",
			});
			await user.click(targetDate);
			expect(
				screen.getByRole("button", { name: "9/25/2025" }),
			).toBeInTheDocument();
		});
	});
});
