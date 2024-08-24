import React from "react";
import { Trash2, X } from "lucide-react";
import { useQuery } from "@tanstack/react-query";
import { fetchCartList } from "../lib/fetchData";
import CartInfo from "./CartInfo";

const MenuCartItem = ({ setIsCartOpen, isCartOpen }) => {
  const { data } = useQuery({
    queryKey: ["cart_item"],
    queryFn: fetchCartList,
  });

  return (
    <div
      className="cart-container absolute top-0 
    right-0 w-[35rem]  bg-white p-4 z-10"
    >
      <div className="space-y-5 min-h-[calc(100dvh-15rem)] flex flex-col justify-between">
        <div className="border border-black rounded py-2 relative flex items-center justify-center">
          <span className="font-semibold">Your Cart</span>
          <button
            className=" absolute right-0 px-4"
            onClick={() => setIsCartOpen(!isCartOpen)}
          >
            <X size={18} />
          </button>
        </div>
        {data?.items.map((item) => (
          <CartInfo key={item.id} item={item} />
        ))}
        <div className="cart-footer border rounded py-3 px-4 space-y-5">
          <div className="cart-order-summary text-center space-x-4">
            <span>Subtotal:</span>
            <span className="font-semibold">$ 396.00 USD</span>
          </div>
          <button className="py-2.5 rounded flex justify-center w-full default-btn">
            View Cart
          </button>
          
        </div>
      </div>
    </div>
  );
};

export default MenuCartItem;
