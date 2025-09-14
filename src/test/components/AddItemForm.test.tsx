import { render, screen } from "@testing-library/react"
import AddItemForm from "../../components/AddItemForm"
import userEvent from "@testing-library/user-event";


describe('AddItemFrom', () => {
  describe('正常系', () => {
    const defaultProps = {
      categories: [
        '野菜',
        '肉類',
        '魚介類',
      ],
      closeModal: vi.fn(),
      handleAddItem: vi.fn(),
    };
    beforeEach(() => {
      vi.clearAllMocks();
      render(<AddItemForm {...defaultProps} />)
    });

    it('必要な入力フィールドとボタンがすべて表示', () => {
      expect(screen.getByPlaceholderText('食材名')).toBeInTheDocument();
      expect(screen.getByPlaceholderText('数量')).toBeInTheDocument();
      expect(screen.getByRole('option', { name: 'カテゴリーを選択' })).toBeInTheDocument();
      expect(screen.getByRole('button', { name: 'キャンセル' })).toBeInTheDocument();
      expect(screen.getByRole('button', { name: '追加' })).toBeInTheDocument();
    });

    it('食材を追加できること', async () => {
      const user = userEvent.setup();
      const ingredientName = screen.getByPlaceholderText('食材名');
      await user.type(ingredientName, '人参');
      const amountInput = screen.getByPlaceholderText('数量');
      await user.type(amountInput, '1本');
      const categoryElement = screen.getByRole('combobox');
      await user.selectOptions(categoryElement, '野菜');

      const addButton = screen.getByRole('button', { name: '追加'});
      await user.click(addButton);
      expect(defaultProps.handleAddItem).toBeCalled();
      expect(defaultProps.handleAddItem).toHaveBeenCalledTimes(1);
      expect(defaultProps.handleAddItem).toHaveBeenCalledWith({
        name: '人参',
        display_amount: '1本',
        category: '野菜',
      });
    });

    it('キャンセルボタンが呼ばれること', async () => {
      const user = userEvent.setup();
      const cancelButton = screen.getByRole('button', { name: 'キャンセル'});
      await user.click(cancelButton);
      expect(defaultProps.closeModal).toBeCalled();
      expect(defaultProps.closeModal).toHaveBeenCalledTimes(1);
    });
  });
})