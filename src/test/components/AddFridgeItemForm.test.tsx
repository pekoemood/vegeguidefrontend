import { render, screen } from '@testing-library/react';
import AddFridgeItemForm from '../../components/AddFridgeItemForm';
import userEvent from '@testing-library/user-event';

describe('AddFridgeItemForm', () => {
  describe('正常系', () => {
    const defaultProps = {
      closeModal: vi.fn(),
      categories: [
        { name: '全て', icon: 'all' },
        { name: '野菜', icon: 'veg' },
        { name: '果物', icon: 'fruit' }
      ],
      handleAdd: vi.fn(),
    }
    beforeEach(() => {
      vi.clearAllMocks();
      render(<AddFridgeItemForm {...defaultProps} />);
    })
    it('初期表示の確認', () => {
      expect(screen.getByRole('heading', { name: '食材を追加'})).toBeInTheDocument();
      expect(screen.getByText('食材の情報を入力してください')).toBeInTheDocument();
      expect(screen.getByRole('option', { name: 'カテゴリを選択してください' })).toBeInTheDocument();
      expect(screen.getByRole('button', { name: '賞味期限を選択してください'})).toBeInTheDocument();
      expect(screen.getByRole('button', { name: 'キャンセル' })).toBeInTheDocument();
      expect(screen.getByRole('button', { name: '追加' })).toBeInTheDocument();
    });

    it('食材情報の入力が正しく反映される', async () => {
      const user = userEvent.setup();
      const inputIngredient = screen.getByPlaceholderText('食材名');
      await user.type(inputIngredient, '人参');
      expect(inputIngredient).toHaveValue('人参');
    })
  })
})