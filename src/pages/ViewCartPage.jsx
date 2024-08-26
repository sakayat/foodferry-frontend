import { ChevronRight } from "lucide-react";
import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { useCartItemStore } from "../lib/store/zustandStore";
import ViewCartItem from "../components/ViewCartItem";
import { currencyFormat } from "../lib/utils";

const ViewCartPage = () => {
  useEffect(() => {
    fetchCartList();
  }, []);

  const { cartItems, fetchCartList } = useCartItemStore();

  return (
    <div className="pt-5">
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
              <Link to="view-cart/">Cart</Link>
            </li>
          </ul>
        </div>
        <div className="mb-5">
          <h2 className="text-3xl text-center">Your Cart</h2>
        </div>
        <div className="cart-title grid grid-cols-12 gap-12 md:gap-0 border-b py-3">
          <div className="col-span-4 md:col-span-6">
            <span>Product Name</span>
          </div>
          <div className="col-span-4 md:col-span-3">
            <span>Quantity</span>
          </div>
          <div className="col-span-4 md:col-span-3">
            <span>Total</span>
          </div>
        </div>
        <div>
          {cartItems?.items?.map((item) => (
            <ViewCartItem
              key={item.id}
              item={item}
              fetchCartList={fetchCartList}
            />
          ))}
        </div>
        <div className="flex flex-col items-end py-5">
          <h2 className="text-3xl">Order Summary</h2>
          <div className="flex items-center gap-5 py-3">
            <h4 className="text-xl">Subtotal</h4>
            <span className="font-bold">
              {currencyFormat(cartItems.total_price)}
            </span>
          </div>
          <Link to="/checkout" className="default-btn py-3 px-6 w-full md:w-96 text-center">
            Check Out
          </Link>
        </div>
      </div>
    </div>
  );
};

export default ViewCartPage;
