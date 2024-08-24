import React, { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { fetchFoodDetails } from "../lib/fetchData";
import { Link, useParams } from "react-router-dom";
import { currencyFormat } from "../lib/utils";
import { ChevronRight, Minus, Plus } from "lucide-react";
import { useCartStore } from "../lib/store/zustandStore";

const FoodDetailsPage = () => {
  const token = localStorage.getItem("authToken");

  const { isCartOpen, setIsCartOpen } = useCartStore();

  const { slug } = useParams();

  const { data } = useQuery({
    queryKey: ["food"],
    queryFn: () => fetchFoodDetails(slug),
  });

  const [quantity, setQuantity] = useState(1);

  const [disableButton, setDisableButton] = useState(false);

  const handleChangePlusValue = () => {
    setQuantity((prev) => prev + 1);
    setDisableButton(quantity < 0);
  };

  const handleChangeMinusValue = () => {
    setQuantity((prev) => prev - 1);
    setDisableButton(quantity <= 1);
  };

  const handleAddToCart = async (e) => {
    e.preventDefault();

    await fetch(
      `${import.meta.env.VITE_API_BASE_URL}/api/cart/add-to-cart/${slug}/`,
      {
        method: "post",
        headers: {
          "Content-type": "application/json",
          Authorization: `Token ${token}`,
        },
        body: JSON.stringify({ quantity }),
      }
    );
    setIsCartOpen(!isCartOpen);
  };

  return (
    <div className="pt-10">
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
              <Link to="">{data?.name}</Link>
            </li>
          </ul>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <div className="image">
            <img
              src={`${import.meta.env.VITE_API_BASE_URL}/${data?.image}`}
              alt=""
              className="w-full h-full"
            />
          </div>
          <div className="flex flex-col gap-5">
            <span className="font-semibold">{data?.category_name}</span>
            <h2 className="text-4xl font-bold uppercase tracking-widest">
              {data?.name}
            </h2>
            <p className="text-xl leading-6 lowercase">{data?.description}</p>
            <span className="font-bold">{currencyFormat(data?.price)} USD</span>
            <span>Quantity</span>
            <form action="" className="space-y-5" onSubmit={handleAddToCart}>
              <div className="flex justify-center gap-2 border border-black p-2 w-28">
                <div
                  className={`w-6 text-2xl cursor-pointer ${
                    disableButton ? "text-gray-600" : ""
                  }`}
                  onClick={() => handleChangeMinusValue()}
                  disabled={disableButton}
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
                  className="w-6 text-2xl cursor-pointer"
                  onClick={() => handleChangePlusValue()}
                >
                  <Plus size={18} />
                </div>
              </div>
              <button className="px-6 default-btn border h-12 w-full uppercase">
                Add to cart
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default FoodDetailsPage;
