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
        <button onClick={() => navigate('/shoppinglist')} className="btn btn-outline btn-sm">戻る</button>
      </div>

      <div className="flex flex-col gap-6">
        <div className="shadow-md rounded-xl p-4">
          <div className="flex justify-between items-center mb-2">
            <h2 className="flex items-center text-2xl ">
            <ShoppingCart className="mr-2 h-5 w-5"/>
            <span>{ attributes.name }</span>
            </h2>
            <p className={`transition-opacity duration-500 ease-in ${items.length === check.length ? 'opacity-100' : 'opacity-0'}`}>すべての買い物が完了しました！</p>
            <span className={`badge ${check.length === items.length ? 'badge-success' : 'badge-outline badge-primary'}`}>
              {check.length}/{shoppingList.attributes.shopping_items.length} 完了
            </span>
          </div>

          <p className="text-sm text-neutral-500">作成日： {shoppingList.attributes.created_at_jst}</p>

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
                <li key={item.id} className="space-x-2 space-y-6 flex justify-between items-center text-lg">
                  <div className="flex items-center space-x-4">
                    <input onChange={() => handleClick(item.name)} type="checkbox" checked={item.checked} className="checkbox" />
                    <span className={`text-xl ${item.checked? 'line-through text-neutral-400' : ''}`}>{item.name}</span>
                  </div>
                  <div>
                    <p className="text-xl">{item.amount}{item.unit}</p>
                  </div>
                </li>
              ))}
            </ul>
          </div>
          <div className="mt-6 flex justify-center">
            <button onClick={() => handleSave(shoppingList, items)} className="btn">リストの内容を保存する</button>
          </div>
        </div>
      </div>
    </div>
  )
}

export default ShoppingListDetail;