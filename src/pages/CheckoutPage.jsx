import { ChevronRight } from "lucide-react";
import React, { useEffect } from "react";
import { Link } from "react-router-dom";
import { useCartItemStore } from "../lib/store/zustandStore";
import { currencyFormat } from "../lib/utils";
import CheckoutFrom from "../components/CheckoutFrom";

const CheckoutPage = () => {
  const { cartItems } = useCartItemStore();

  return (
    <div className="py-5">
      <div className="xl:container mx-auto px-8">
        <div className="breadcrumbs">
          <ul className="flex items-center gap-1 py-5">
            <li className="text-gray-600">
              <Link to="/" className="">
                Home
              </Link>
            </li>
            <li>
              <ChevronRight size={15} />
            </li>
            <li>
              <Link to="checkout/">Checkout</Link>
            </li>
          </ul>
        </div>
        <div className="py-5">
          <h2 className="text-3xl text-center">Checkout</h2>
        </div>
        <div className="py-5">
          <div className="flex flex-col md:grid grid-cols-1 md:grid-cols-12 gap-8">
            <CheckoutFrom cartItems={cartItems}/>
            <div className="order-info order-first md:order-last col-span-12 md:col-span-5">
              <h3 className="text-2xl pb-3">Your order from</h3>
              <div className="space-y-3 border-t py-3">
                {cartItems?.items?.map((item) => (
                  <div className="flex justify-between" key={item.id}>
                    <div className="space-x-2">
                      <span>{item.quantity}</span>
                      <span>x</span>
                      <span>{item.food_item_name}</span>
                    </div>
                    <span>{currencyFormat(item.total_price)}</span>
                  </div>
                ))}
                <div className="flex justify-between">
                  <span>Subtotal</span>
                  <span>{currencyFormat(cartItems?.total_price || 0)}</span>
                </div>
                <div className="text-2xl font-bold flex justify-between">
                  <span>Total</span>
                  <span>{currencyFormat(cartItems?.total_price || 0)}</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CheckoutPage;
