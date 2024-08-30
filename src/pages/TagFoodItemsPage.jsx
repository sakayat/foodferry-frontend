import React, { useEffect } from "react";
import { Link } from "react-router-dom";
import { currencyFormat } from "../lib/utils";
import { useFoodItemsStore } from "../lib/store/zustandStore";

const TagFoodItemsPage = ({ tag }) => {

  useEffect(() => {
    fetchFoodItems();
  }, []);

  const { data, fetchFoodItems } = useFoodItemsStore();

  return (
    <div>
      <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-5">
        {data
          ?.filter((item) => item.food_tag == tag)
          ?.map((food) => (
            <Link to={`/food/${food.slug}`} className="space-y-1" key={food.id}>
              <img
                src={`${import.meta.env.VITE_API_BASE_URL}/${food.image}`}
                alt=""
                className="h-44 w-full object-cover rounded-xl"
              />
              <h4 className="font-bold capitalize">{food.name}</h4>
              <span className="price">{currencyFormat(food.price)}</span>
            </Link>
          ))}
      </div>
    </div>
  );
};

export default TagFoodItemsPage;
