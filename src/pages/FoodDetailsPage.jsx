import React, { useState } from "react";
import img1 from "../assets/images/slider.jpg";
import { useQuery } from "@tanstack/react-query";
import { fetchFoodDetails } from "../lib/fetchData";
import { Link, useParams } from "react-router-dom";
import { currencyFormat } from "../lib/utils";
import { ArrowBigRight, ChevronRight, Minus, Plus } from "lucide-react";

const FoodDetailsPage = () => {
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
            <div className="flex justify-center gap-2 border border-black p-2 w-28">
              <button
                className={`w-6 text-2xl ${
                  disableButton ? "text-gray-600" : ""
                }`}
                onClick={() => handleChangeMinusValue()}
                disabled={disableButton}
              >
                <Minus size={18} />
              </button>
              <input
                type="number"
                value={quantity}
                onChange={(e) => setQuantity(e.target.value)}
                className="outline-none font-bold text-center w-6 [appearance:number] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none"
              />
              <button
                className="w-6 text-2xl"
                onClick={() => handleChangePlusValue()}
              >
                <Plus size={18} />
              </button>
            </div>
            <button className="px-6 default-btn border h-12 w-full uppercase">
              Add to cart
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default FoodDetailsPage;
