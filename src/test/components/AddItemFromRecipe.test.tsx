import { render, screen } from "@testing-library/react";
import AddLItemFromRecipe from "../../components/AddItemFromRecipe";

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

  beforeEach(() => {
    vi.clearAllMocks()
    render(<AddLItemFromRecipe {...defaultProps} />);
  })

  describe('正常系', () => {
    it('必要なフィールドが全て表示されていること', () => {
      expect(screen.getByRole('button', { name: '新しいリストを作成'})).toBeInTheDocument();
      expect(screen.getByRole('button', { name: 'キャンセル'})).toBeInTheDocument();
      //買い物リストの表示を確認する
    });
  });
})