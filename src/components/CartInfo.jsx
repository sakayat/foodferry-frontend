import React, { useState } from "react";
import { Trash2, X } from "lucide-react";

const CartInfo = ({ item }) => {
  const [quantity, setQuantity] = useState(item.quantity);

  return (
    <div className="cart-product flex items-center justify-between w-full py-2 px-4">
      <img
        src={`${import.meta.env.VITE_API_BASE_URL}/media/${item.food_image}`}
        alt=""
        className="w-14 h-14 rounded"
      />
      <span>{item.food_item_name}</span>
      <span>{item.total_price}</span>
      <input
        type="number"
        name="number"
        className="w-20 text-center border rounded-full py-1 px-4 border-black"
        value={quantity}
        onChange={(e) => setQuantity(e.target.value)}
      />
      <button className="bg-[#286140] text-white p-2.5 rounded-full">
        <Trash2 size={18} />
      </button>
    </div>
  );
};

export default CartInfo;
