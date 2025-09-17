import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { describe, expect, it } from "vitest";
import FormField from "../../components/FormField";

describe("FormField", () => {
	it("ラベルが正しく反映されること", () => {
		render(<FormField id="email" label="ユーザー名" />);
		expect(screen.getByLabelText("ユーザー名")).toBeInTheDocument();
	});
	it("インプットに入力が反映されること", async () => {
		const user = userEvent.setup();
		render(<FormField id="email" label="ユーザー名" />);
		const input = screen.getByRole("textbox", { name: "ユーザー名" });
		await user.type(input, "test@example.com");
		expect(input).toHaveValue("test@example.com");
	});
	it("エラーメッセージが正しく表示されること", async () => {
		render(
			<FormField
				id="name"
				label="ユーザー名"
				error={{ type: "test", message: "エラーがあります" }}
			/>,
		);
		const errorMessage = screen.getByText("エラーがあります");
		expect(errorMessage).toBeInTheDocument();
	});
});
