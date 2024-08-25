import React, { useState } from "react";
import { Minus, Plus, Trash } from "lucide-react";

const CartInfo = ({ item }) => {
  const token = localStorage.getItem("authToken");
  const [newData, setNewData] = useState(item);
  const [quantity, setQuantity] = useState(item.quantity);

  const updateOnCart = async (quantity) => {
    const res = await fetch(
      `${import.meta.env.VITE_API_BASE_URL}/api/cart/update/${item.id}/`,
      {
        method: "PUT",
        headers: {
          "Content-type": "application/json",
          Authorization: `Token ${token}`,
        },
        body: JSON.stringify({ quantity }),
      }
    );
    const data = await res.json();
    setNewData(data);
  };

  const handleChangeQuantity = (quantity) => {
    updateOnCart(quantity);
    setQuantity(quantity);
  };

  const handleChangePlusValue = () => {
    handleChangeQuantity(quantity + 1);
  };

  const handleChangeMinusValue = () => {
    if (quantity > 1) {
      handleChangeQuantity(quantity - 1);
    }
  };

  return (
    <div className="cart-product space-y-5 w-full py-2 px-4">
      <div className="flex items-center gap-5">
        <img
          src={`${import.meta.env.VITE_API_BASE_URL}/media/${
            newData.food_image
          }`}
          alt=""
          className="w-14 h-14 rounded"
        />
        <span>{newData.food_item_name}</span>
        
      </div>
      <div className="flex items-center justify-between gap-5">
      <span>{newData.total_price}</span>
        <div className="flex items-center justify-between gap-2 border border-black p-2 w-36">
          <div
            className="text-2xl cursor-pointer"
            onClick={handleChangeMinusValue}
          >
            <Minus size={18} />
          </div>
          
          <input
            type="number"
            value={quantity}
            onChange={(e) => setQuantity(e.target.value)}
            className="outline-none font-bold text-center w-6 [appearance:number] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none"
          />
          <div
            className="text-2xl cursor-pointer"
            onClick={handleChangePlusValue}
          >
            <Plus size={18} />
          </div>
        </div>
        <button className="bg-[#286140] text-white p-2.5 rounded-full">
          <Trash size={18} />
        </button>
      </div>
    </div>
  );
};

export default CartInfo;
