import React, { useEffect, useState } from "react";
import { Trash2, X } from "lucide-react";
import CartInfo from "./CartInfo";
import { useCartItemStore } from "../lib/store/zustandStore";

const MenuCartItem = ({ setIsCartOpen, isCartOpen }) => {

  const { cartItems, fetchCartList } = useCartItemStore();

  useEffect(() => {
    fetchCartList();
  }, []);


  

  return (
    <div
      className="cart-container absolute top-0
    right-0 w-[30rem] p-4 z-10"
    >
      <div className="space-y-5 min-h-[calc(100dvh-5rem)] flex flex-col justify-between">
        <div className="border border-black/40 rounded py-2 relative flex items-center justify-center">
          <span className="font-semibold">Your Cart</span>
          <button
            className="absolute right-0 px-4"
            onClick={() => setIsCartOpen(!isCartOpen)}
          >
            <X size={18} />
          </button>
        </div>
        <div className="items border border-black/40 rounded overflow-y-auto space-y-2 min-h-[calc(100dvh-15rem)]">
          {cartItems?.items?.map((item) => (
            <CartInfo key={item.id} item={item} fetchCartList={fetchCartList} />
          ))}
        </div>
        <div className="cart-footer border rounded py-3 px-4 space-y-5">
          <div className="cart-order-summary text-center space-x-4">
            <span>Subtotal:</span>
            <span className="font-semibold">{cartItems.total_price} USD</span>
          </div>
          <button className="py-2.5 flex justify-center w-full default-btn">
            View Cart
          </button>
        </div>
      </div>
    </div>
  );
};

export default MenuCartItem;
