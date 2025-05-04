import { useLoaderData, useNavigate } from "react-router";
import { ShoppingCart } from 'lucide-react';
import { useState } from "react";
import axios from "axios";

const ShoppingListDetail = () => {
  const { shoppingList } = useLoaderData();
  const { attributes } = shoppingList
  const { shopping_items} = attributes
  const [items, setItems] = useState(shopping_items);
  const check = items.filter((item) => item.checked === true)
  const navigate = useNavigate();
  
  

  const handleClick = (name) => {
    setItems((prev) => prev.map((item) => {
      return item.name === name ? {...item, checked: !item.checked} : item
    }))
  }

  const handleSave = async (shoppingList, items) => {
    try {
      await axios.patch(`${import.meta.env.VITE_RAILS_API}/shopping_lists/${shoppingList.id}`, {
        items,
      }, { withCredentials: true });
      navigate('/shoppinglist');
      
    } catch (error) {
      console.log(error);
    }
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="mb-6">
        <button>戻る</button>
      </div>

      <div className="flex flex-col gap-6">
        <div className="bg-white shadow-md rounded-xl p-4">
          <div className="flex justify-between items-center mb-2">
            <h2 className="flex items-center text-2xl ">
            <ShoppingCart className="mr-2 h-5 w-5 text-primary"/>
            <span className="text-primary">{ attributes.name }</span>
            </h2>
            { items.length === check.length && <p className="text-center mx-4 rounded-lg text-primary font-semibold text-xl transition-all ease-in-out transform duration-300" style={{ animation: "fadeIn 0.5s ease-in" }}>すべての買い物が完了しました！</p> }
            <span className="text-sm bg-emerald-50 text-emerald-700 border border-emerald-200 rounded px-2 py-1">
              {check.length}/{shoppingList.attributes.shopping_items.length} 完了
            </span>
          </div>

          <p className="text-sm text-gray-500">作成日： {shoppingList.attributes.created_at_jst}</p>

          <div className="mt-6">
          <div className="w-full bg-gray-200 rounded-full h-3 overflow-hidden">
          <div
            className="bg-primary h-full transition-all duration-500 ease-in-out"
            style={{ width: `${(check.length / items.length) * 100}%` }}
          />
        </div>
          </div>

          <div className="mt-6">
            <ul className="ml-4">
              {items.map((item) => (
                <li key={item.name} className="space-x-2 space-y-6 flex justify-between items-center text-lg">
                  <div className="flex items-center space-x-4">
                    <input onChange={() => handleClick(item.name)} type="checkbox" checked={item.checked} className="checkbox checkbox-primary" />
                    <span className="text-xl">{item.name}</span>
                  </div>
                  <div>
                    <p className="text-xl">{item.amount}{item.unit}</p>
                  </div>
                </li>
              ))}
            </ul>
          </div>
          <div className="mt-6 flex justify-center">
            <button onClick={() => handleSave(shoppingList, items)} className="btn btn-primary text-white">リストの内容を保存する</button>
          </div>
        </div>
      </div>
    </div>
  )
}

export default ShoppingListDetail;