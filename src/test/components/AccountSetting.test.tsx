import { render, screen } from "@testing-library/react";
import AccountSetting from "../../components/AccountSetting";
import { beforeEach, describe, expect, it } from "vitest";
import userEvent from "@testing-library/user-event";



describe('AccountSetting', () => {
  // 共通props
  const defaultProps = {
    name: 'shio',
    email: 'shio@example.com',
  };

  describe('通常アカウント', () => {
    beforeEach(() => {
      render(<AccountSetting {...defaultProps} google_account={false} />);
    });

    it('名前・メールアドレス・全タブが表示される', () => {
      // 入力欄のラベルで取得
      expect(screen.getByRole('textbox', { name: 'お名前' })).toBeInTheDocument();
      expect(screen.getByRole('textbox', { name: 'メールアドレス' })).toBeInTheDocument();
      // タブの存在
      expect(screen.getByRole('tab', { name: 'パスワード' })).toBeInTheDocument();
      expect(screen.getByRole('tab', { name: 'プロフィール' })).toBeInTheDocument();
      expect(screen.getByRole('tab', { name: 'メール' })).toBeInTheDocument();
    });



    it('タブの切り替えが正常に動作する', async () => {
      const user = userEvent.setup();
      // パスワードタブをクリック
      const passwordTab = screen.getByRole('tab', { name: 'パスワード' });
      await user.click(passwordTab);
      // パスワード変更フォームが表示される
      expect(await screen.findByLabelText('現在のパスワード')).toBeInTheDocument();
      expect(screen.getByLabelText('新しいパスワード')).toBeInTheDocument();
      expect(screen.getByRole('button', { name: 'パスワードを変更' })).toBeInTheDocument();

      // メールタブをクリック
      const emailTab = screen.getByRole('tab', { name: 'メール' });
      await user.click(emailTab);
      // メール変更フォームが表示される
      expect(await screen.findByRole('textbox', { name: '現在のメールアドレス' })).toBeInTheDocument();
      expect(screen.getByRole('textbox', { name: '新しいメールアドレス' })).toBeInTheDocument();
      expect(screen.getByRole('button', { name: 'メールアドレスを変更' })).toBeInTheDocument();
    });

    describe('プロフィールタブ', () => {
      it('名前の変更ができる', async () => {
        const user = userEvent.setup();

      })
    });
    
    describe('パスワードタブ', () => {

    });

    describe('メールタブ', () => {

    });
  });

  describe('Googleアカウント', () => {
    beforeEach(() => {
      render(<AccountSetting {...defaultProps} google_account={true} />);
    });

    it('名前・メールアドレスのみ表示され、パスワード/メールタブは非表示', () => {
      expect(screen.getByRole('textbox', { name: 'お名前' })).toBeInTheDocument();
      expect(screen.getByDisplayValue(defaultProps.name)).toBeInTheDocument();
      expect(screen.getByRole('textbox', { name: 'メールアドレス' })).toBeInTheDocument();
      expect(screen.getByDisplayValue(defaultProps.email)).toBeInTheDocument();
      // Googleアカウントではパスワード・メールタブが表示されない
      expect(screen.queryByRole('tab', { name: 'パスワード' })).not.toBeInTheDocument();
      expect(screen.queryByRole('tab', { name: 'メール' })).not.toBeInTheDocument();
    });
  });
});


