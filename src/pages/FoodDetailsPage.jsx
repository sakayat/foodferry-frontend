import React, { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { currencyFormat } from "../lib/utils";
import { ChevronRight, Minus, Plus } from "lucide-react";
import { useCartStore } from "../lib/store/zustandStore";
import Feedback from "../components/Feedback";

const FoodDetailsPage = () => {
  const token = localStorage.getItem("authToken");

  const { isCartOpen, setIsCartOpen } = useCartStore();

  const { slug } = useParams();

  const [foodItem, setFoodItem] = useState();

  useEffect(() => {
    fetchFoodDetails();
  }, []);

  const fetchFoodDetails = async () => {
    const res = await fetch(
      `${
        import.meta.env.VITE_API_BASE_URL
      }/api/restaurant/food-details/${slug}/`
    );
    const data = await res.json();
    setFoodItem(data);
  };

  const [quantity, setQuantity] = useState(1);

  const handleChangeQuantity = (quantity) => {
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
              <Link to="">{foodItem?.name}</Link>
            </li>
          </ul>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <div className="image">
            <img
              src={`${import.meta.env.VITE_API_BASE_URL}/${foodItem?.image}`}
              alt=""
              className="w-full h-full rounded-xl"
            />
          </div>
          <div className="flex flex-col gap-5">
            <span className="font-semibold">{foodItem?.category_name}</span>
            <h2 className="text-4xl font-bold uppercase tracking-widest">
              {foodItem?.name}
            </h2>
            <p className="text-xl leading-6 lowercase">{foodItem?.description}</p>
            <span className="font-bold">{currencyFormat(foodItem?.price)}</span>
            <span>Quantity</span>
            <form action="" className="space-y-5" onSubmit={handleAddToCart}>
              <div className="flex items-center justify-between gap-2 border border-black p-2 w-24 md:w-36">
                <div
                  className="text-2xl cursor-pointer"
                  onClick={handleChangeMinusValue}
                >
                  <div
                    className="w-6 text-2xl cursor-pointer"
                    onClick={() => handleChangeMinusValue()}
                  >
                    <Minus size={18} />
                  </div>
                </div>
                <input
                  type="number"
                  value={quantity}
                  onChange={(e) => setQuantity(e.target.value)}
                  className="outline-none font-bold text-center w-8"
                />
                <div
                  className="text-2xl cursor-pointer"
                  onClick={handleChangePlusValue}
                >
                  <Plus size={18} />
                </div>
              </div>
              <button
                className="px-6 default-btn border h-12 w-full uppercase"
                type="submit"
              >
                Add to cart
              </button>
            </form>
          </div>
        </div>
        <Feedback slug={slug}/>
      </div>
    </div>
  );
};

export default FoodDetailsPage;
