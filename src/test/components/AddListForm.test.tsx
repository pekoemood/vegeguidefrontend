import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import AddListForm from "../../components/AddListForm";

describe("AddListForm", () => {
	const defaultProps = {
		closeModal: vi.fn(),
		handleAddList: vi.fn(),
	};

	beforeEach(() => {
		vi.clearAllMocks();
		render(<AddListForm {...defaultProps} />);
	});

	describe("正常系", () => {
		it("コンポーネントが正しく表示されていること", () => {
			expect(screen.getByPlaceholderText("買い物リスト名")).toBeInTheDocument();
			expect(
				screen.getByRole("button", { name: "キャンセル" }),
			).toBeInTheDocument();
			expect(screen.getByRole("button", { name: "追加" })).toBeInTheDocument();
		});

		it("入力値が反映され、関数が呼ばれること", async () => {
			const user = userEvent.setup();
			const inputElement = screen.getByPlaceholderText("買い物リスト名");
			await user.type(inputElement, "本日の買い物リスト");
			const addButton = screen.getByRole("button", { name: "追加" });
			await user.click(addButton);
			expect(defaultProps.handleAddList).toHaveBeenCalledTimes(1);
			expect(defaultProps.handleAddList).toHaveBeenCalledWith(
				"本日の買い物リスト",
			);
		});
	});
});
