import React, { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { currencyFormat } from "../lib/utils";
import NotFound from "../components/Notfound";


const CategoryFoodPage = () => {
  const { slug } = useParams();

  useEffect(() => {
    fetchFoodData();
  }, []);

  const [foodData, setFoodData] = useState([]);

  const fetchFoodData = async () => {
    const res = await fetch(
      `${
        import.meta.env.VITE_API_BASE_URL
      }/api/restaurant/category-food-list/${slug}/`
    );
    const data = await res.json();
    setFoodData(data);
  };

  return (
    <div className="py-5">
      <div className="xl:container mx-auto px-8">
        <div className="py-5">
          {foodData.length > 0 && (
            <h2 className="text-3xl capitalize">{slug}</h2>
          )}
        </div>
        {foodData.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-5">
            {foodData?.map((food) => (
              <Link
                to={`/food/${food.slug}`}
                className="space-y-1"
                key={food.id}
              >
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
        ) : (
          <NotFound />
        )}
      </div>
    </div>
  );
};

export default CategoryFoodPage;
