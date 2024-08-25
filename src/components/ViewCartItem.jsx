import React, { useState } from "react";
import QuantityButton from "./QuantityButton";
import { currencyFormat } from "../lib/utils";

const ViewCartItem = ({ item, fetchCartList }) => {
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
    fetchCartList();
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
    <div className="cart-item grid grid-cols-12 gap-12 md:gap-0 py-5">
      <div className="col-span-4 md:col-span-6">
        <div className="flex items-center gap-5">
          <img
            src={`${import.meta.env.VITE_API_BASE_URL}/media/${
              item.food_image
            }`}
            alt=""
            className="w-20 h-20 hidden md:flex"
          />
          <div className="space-y-3">
            <h4>{item.food_item_name}</h4>
            <span>{item.food_item_price}</span>
          </div>
        </div>
      </div>
      <div className="col-span-4 md:col-span-3">
        <QuantityButton
          handleChangePlusValue={handleChangePlusValue}
          handleChangeMinusValue={handleChangeMinusValue}
          quantity={quantity}
          setQuantity={setQuantity}
        />
      </div>
      <div className="col-span-4 md:col-span-3">
        <span>{currencyFormat(item.total_price)}</span>
      </div>
    </div>
  );
};

export default ViewCartItem;
