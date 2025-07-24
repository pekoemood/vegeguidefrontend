import { z } from "zod";

const ERROR_MESSAGES = {
	REQUIRED_NAME: "名前は必須です",
	INVALID_EMAIL: "正しいメールアドレスを入力してください",
	PASSWORD_MIN_LENGTH: "パスワードは8文字以上である必要があります",
	SAME_PASSWORD: "現在のパスワードと同じにはできません",
} as const;

const emailSchema = z.string().email(ERROR_MESSAGES.INVALID_EMAIL);
const passwordSchema = z.string().min(8, ERROR_MESSAGES.PASSWORD_MIN_LENGTH);

export const singUpSchema = z.object({
	name: z.string().min(1, ERROR_MESSAGES.REQUIRED_NAME),
	email: emailSchema,
	password: passwordSchema,
});

export const loginSchema = z.object({
	email: emailSchema,
	password: passwordSchema,
});

export const passwordChangeSchema = z
	.object({
		oldPassword: passwordSchema,
		newPassword: passwordSchema,
	})
	.superRefine((data, ctx) => {
		if (data.newPassword === data.oldPassword) {
			ctx.addIssue({
				path: ["newPassword"],
				message: ERROR_MESSAGES.SAME_PASSWORD,
				code: z.ZodIssueCode.custom,
			});
		}
	});

export type SignUpInput = z.infer<typeof singUpSchema>;
export type LoginInput = z.infer<typeof loginSchema>;
export type PasswordChangeInput = z.infer<typeof passwordChangeSchema>;
