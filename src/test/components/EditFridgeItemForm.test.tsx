import { render, screen } from "@testing-library/react";
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
		vi.resetAllMocks();
		render(<EditFridgeItemForm {...defaultProps} />);
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
		it("入力フィールドが正しく更新されること", () => {});
		it("カテゴリ選択が正しく選択できること");
		it("キャンセルボタンでモーダルが閉じること");
	});
});
