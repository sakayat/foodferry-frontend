import React, { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { currencyFormat } from "../lib/utils";

const RestaurantFoodPage = () => {
  const { slug } = useParams();

  useEffect(() => {
    fetchRestaurantFood();
    fetchInfo();
  }, []);

  const [data, setData] = useState([]);
  const [info, setInfo] = useState({});

  const fetchInfo = async () => {
    const res = await fetch(
      `${import.meta.env.VITE_API_BASE_URL}/api/restaurant/info/${slug}/`,
      {
        method: "GET",
        headers: {
          "Content-type": "application/json",
        },
      }
    );
    const data = await res.json();
    setInfo(data);
  };

  const fetchRestaurantFood = async () => {
    const res = await fetch(
      `${
        import.meta.env.VITE_API_BASE_URL
      }/api/restaurant/restaurant-food-list/${slug}/`,
      {
        method: "GET",
        headers: {
          "Content-type": "application/json",
        },
      }
    );

    const data = await res.json();
    setData(data);
  };

  return (
    <div className="py-5">
      <div className="xl:container mx-auto px-8">
        <div className="my-5 border rounded-xl py-5 px-6 space-y-3">
          <h2 className="text-4xl capitalize font-bold">{info.name}</h2>
          <p className="space-x-2">
            <span className="font-bold">Address:</span>
            <span>{info.address}</span>
          </p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-5">
          {data?.map((food) => (
            <div key={food.id}>
              <Link to={`/food/${food.slug}`} className="space-y-1">
                <img
                  src={`${import.meta.env.VITE_API_BASE_URL}/${food.image}`}
                  alt=""
                  className="h-44 w-full object-cover rounded-xl"
                />
                <h4 className="font-bold capitalize">{food.name}</h4>

                <span className="price">{currencyFormat(food.price)}</span>
              </Link>
              <Link
                to={`/category/${food.category_slug}/`}
                className="block text-blue-500 font-bold w-fit py-1 rounded-md"
              >
                {food.category_name}
              </Link>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default RestaurantFoodPage;
