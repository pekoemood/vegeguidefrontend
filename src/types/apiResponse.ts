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


interface Recipe {
  id: number;
  name: string;
  instructions: string;
  cooking_time: number;
  servings: number;
  purpose: string;
  recipe_category: string;
}

interface Ingredient {
  name: string;
  amount: string;
  unit: string;
  display_amount: string;
  category: string;
}

export interface RecipeStep {
  step_number: number;
  description: string;
}

interface ShoppingList {
  id: number;
  name: string;
  updated: number;
  items_count: number;
  checked_count: number;
  already_added: boolean;
}

export interface RecipeResponse extends Recipe {
    image_url: string;
    ingredients: Ingredient[];
    recipe_steps: RecipeStep[];
    shopping_lists: ShoppingList[];
}

export interface Recipes {
  id: number;
  type: string;
  attributes: RecipeResponse;
}
