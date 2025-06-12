import { z } from "zod";

export const signUpSchema = z.object({
	name: z.string().min(1, "名前は必須です"),
	email: z.string().email("正しいメールアドレスを入力してください"),
	password: z.string().min(8, "パスワードは8文字以上である必要があります"),
});

export const loginSchema = z.object({
	email: z.string().email("正しいメールアドレスを入力してください"),
	password: z.string().min(8, "パスワードは8文字以上である必要があります"),
});

export const passwordSchema = z
	.object({
		oldPassword: z
			.string()
			.min(8, "現在のパスワードを8文字以上で入力してください"),
		newPassword: z
			.string()
			.min(8, "新しいパスワードは8文字以上で入力してください"),
	})
	.superRefine((data, ctx) => {
		if (data.newPassword === data.oldPassword) {
			ctx.addIssue({
				path: ["newPassword"],
				message: "現在のパスワードと同じにはできません",
				code: "custom",
			});
		}
	});
