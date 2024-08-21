import React from 'react'
import { Trash2, X } from "lucide-react";

const MenuCartItem = ({setCartOpen}) => {
  return (
    <div className="cart-container absolute top-0 
    right-0 w-[35rem]  bg-white p-4 z-10">
        <div className="space-y-5 min-h-[calc(100dvh-15rem)] flex flex-col justify-between">
        <div className="border border-black rounded py-2 relative flex items-center justify-center">
          <span className="font-semibold">Your Cart</span>
          <button className=" absolute right-0 px-4" onClick={() => setCartOpen(prev => !prev)}>
            <X size={18} />
          </button>
        </div>
        <div className="items border border-black rounded overflow-y-auto space-y-2 min-h-[calc(100dvh-15rem)]">
          <div className="cart-product flex items-center justify-between w-full py-2 px-4">
            <img
              src="src/assets/images/2.png"
              alt=""
              className="w-14 h-14 rounded"
            />
            <span>Chicken Alfredo</span>
            <span>$12.99 USD</span>
            <input
              type="number"
              name="number"
              className="w-20 text-center border rounded-full py-1 px-4 border-black"
              
            />
            <button className="bg-[#286140] text-white p-2.5 rounded-full">
              <Trash2 size={18} />
            </button>
          </div>
        </div>
        <div className="cart-footer border rounded py-3 px-4 space-y-5">
          <div className="cart-order-summary text-center space-x-4">
            <span>Subtotal:</span>
            <span className="font-semibold">$ 396.00 USD</span>
          </div>
          <button className="py-2.5 rounded flex justify-center w-full default-btn">
            Continue to Checkout
          </button>
        </div>
        </div>
      </div>
  )
}

export default MenuCartItem