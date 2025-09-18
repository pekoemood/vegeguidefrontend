import { render, screen } from "@testing-library/react";
import AddLItemFromRecipe from "../../components/AddItemFromRecipe";
import userEvent from "@testing-library/user-event";

describe('AddItemFromRecipe', () => {
  const defaultProps = {
    closeModal: vi.fn(),
    shoppingLists: [
      {
        id: 1,
        name: '買い物リスト',
        updated: 10,
        items_count: 5,
        checked_count: 3,
        already_added: false,
      },
    ],
    recipeName: '野菜炒め',
    handleAddShoppingList: vi.fn(),
  };

  let renderResult: any;

  beforeEach(() => {
    vi.clearAllMocks()
    renderResult = render(<AddLItemFromRecipe {...defaultProps} />);
    
  })

  describe('正常系', () => {
    it('必要なフィールドが全て表示されていること', () => {
      expect(screen.getByRole('button', { name: '新しいリストを作成'})).toBeInTheDocument();
      expect(screen.getByRole('button', { name: 'キャンセル'})).toBeInTheDocument();
      expect(screen.getByRole('button', { name: /買い物リスト/ })).toBeInTheDocument();
    });

    it('新しい買い物リストを作成できること', async() => {
      const user = userEvent.setup();
      const newButton = screen.getByRole('button', { name: '新しいリストを作成'});
      await user.click(newButton);

      const inputElement = screen.getByPlaceholderText('買い物リスト名');
      await user.type(inputElement, '本日買い物するリスト');
      const submitButton = screen.getByRole('button', { name: '作成して追加' });
      await user.click(submitButton);
      expect(defaultProps.handleAddShoppingList).toHaveBeenCalledWith({ name: '本日買い物するリスト' });
      await user.click(screen.getByRole('button', { name: 'キャンセル' }));
    })
  });
})