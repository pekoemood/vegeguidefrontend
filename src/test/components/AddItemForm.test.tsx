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

    it('正しく表示されていること', () => {
      expect(screen.getByPlaceholderText('食材名')).toBeInTheDocument();
      expect(screen.getByPlaceholderText('数量')).toBeInTheDocument();
      expect(screen.getByRole('option', { name: 'カテゴリーを選択' })).toBeInTheDocument();
      expect(screen.getByRole('button', { name: 'キャンセル' })).toBeInTheDocument();
      expect(screen.getByRole('button', { name: '追加' })).toBeInTheDocument();
    })
  })
})