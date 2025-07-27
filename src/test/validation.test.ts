import { describe, it, expect } from 'vitest';
import { loginSchema, singUpSchema, passwordChangeSchema } from '../utils/validation';

describe('Validation', () => {
  describe('loginSchema', () => {
    it('should pass with valid email and password', () => {
      const validData = {
        email: 'test@example.com',
        password: 'password123'
      };
      
      const result = loginSchema.safeParse(validData);
      expect(result.success).toBe(true);
    });

    it('should fail with invalid email', () => {
      const invalidData = {
        email: 'invalid-email',
        password: 'password123'
      };

      const result = loginSchema.safeParse(invalidData);
      expect(result.success).toBe(false);
    });

    it('should fail with short password', () => {
      const invalidData = {
        email: 'test@example.com',
        password: '123'
      };

      const result = loginSchema.safeParse(invalidData);
      expect(result.success).toBe(false);
    });
  });
  describe('singUpSchema', () => {
    it('should pass with valid name, email and password',  () => {
      const validData = {
        name: 'testUser',
        email: 'test@example.com',
        password: 'password123'
      };
      const result = singUpSchema.safeParse(validData);
      expect(result.success).toBe(true);
    });

    it('エラーメッセージが正しく設定されていること', () => {
      const invalidData = {
        name: '',
        email: 'invalid-email',
        password: '123'
      };
      const result = singUpSchema.safeParse(invalidData);

      if(!result.success) {
        const errors = result.error.flatten().fieldErrors;
        expect(errors.name?.[0]).toBe('名前は必須です');
        expect(errors.email?.[0]).toBe('正しいメールアドレスを入力してください');
        expect(errors.password?.[0]).toBe('パスワードは8文字以上である必要があります');
      }
      
    })

    it('should fail with invalid name', () => {
      const invalidData = {
        name: "",
        email: 'test@example.com',
        password: 'password123'
      };

      const result = singUpSchema.safeParse(invalidData);
      expect(result.success).toBe(false);
    });
  });
  describe('passwordChangeSchema', () => {
    it('現在のパスワードと新しいパスワードが異なる場合は変更できること', () => {
      const validData = {
        oldPassword: 'password123',
        newPassword: 'password234'
      };
      const result = passwordChangeSchema.safeParse(validData);
      expect(result.success).toBe(true);
    });
    it('現在のパスワードと新しいパスワードが同じ場合はエラーになること', () => {
      const invalidData = {
        oldPassword: 'password123',
        newPassword: 'password123'
      };

      const result = passwordChangeSchema.safeParse(invalidData);
      expect(result.success).toBe(false);
    });
    it('エラーメッセージが正しく設定されていること', () => {
      const invalidData = {
        oldPassword: 'password123',
        newPassword: 'password123'
      };
      const result = passwordChangeSchema.safeParse(invalidData);
      if (!result.success) {
        const errors = result.error.flatten().fieldErrors;
        expect(errors.newPassword?.[0]).toBe('現在のパスワードと同じにはできません');
      };
    })
  })
})