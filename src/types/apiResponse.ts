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
  calorie: number;
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
    step?: RecipeStep[]
}

export interface Recipes {
  id: number;
  type: string;
  attributes: RecipeResponse;
}

export interface RecipeImage {
  image_id: string;
  image_url: string;
}

export interface FridgeItem {
  id: string;
  name: string;
  category: string;
  display_amount: string;
  expire_date: string;
  created_at: string;
  created_day: string;
  expire_status: string
}

export interface FridgeItemsRes {
  id: number;
  type: string;
  attributes: FridgeAddItem;
}

export interface FridgeItemsResponse {
  data: {
    id: number;
    type: string;
    attributes: FridgeItem;
  }[]
}



export interface FridgeItems extends Array<FridgeItem>{}

export interface FridgeAddItem {
  id?: number;
  name: string;
  category: string;
  amount: string;
  date: Date;
}

export interface FridgeItemResponse {
  data: {
    id: number;
    type: string;
    attributes: FridgeItem;
  }
}

