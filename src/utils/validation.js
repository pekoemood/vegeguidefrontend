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
