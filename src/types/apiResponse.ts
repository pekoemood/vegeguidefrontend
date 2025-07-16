export interface ShoppingItem {
  id: number;
  name: string;
  display_amount: string;
  category: string;
  checked: boolean;
  fromRecipe: string;
  item_id: number;
  amount: string;
  unit: string;
}

interface ShoppingList {
  id: number;
  name: string;
  created_at_jst: string;
  shopping_items: ShoppingItem[];
}

export interface ShoppingListEntry {
  id: string;
  type: string;
  attributes: ShoppingList;
}


export interface ShoppingListsResponse {
  data: ShoppingListEntry[]
}

export interface ShoppingListResponse {
  data: ShoppingListEntry;
}


export interface ShoppingListsLoader extends Array<ShoppingListEntry>{}

export interface ShoppingListAddItem {
  name: string;
  display_amount: string;
  category: string;
}
