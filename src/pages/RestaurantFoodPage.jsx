import React, { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { currencyFormat } from "../lib/utils";
import Pagination from "../components/Pagination";
import FoodDetailsSkeleton from "../components/FoodDetailsSkeleton";
import RestaurantFoodSkeleton from "../components/RestaurantFoodSkeleton";

const RestaurantFoodPage = () => {

  const { slug } = useParams();

  console.log(slug);
  

  const [data, setData] = useState([]);
  const [info, setInfo] = useState({});
  const [pagination, setPagination] = useState({});
  const [currentPage, setCurrentPage] = useState(1);

  useEffect(() => {
    fetchRestaurantFood();
    fetchInfo();
  }, [currentPage]);

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
      }/api/restaurant/restaurant-food-list/${slug}/?page=${currentPage}`,
      {
        method: "GET",
        headers: {
          "Content-type": "application/json",
        },
      }
    );

    const data = await res.json();

    setData(data.results);

    setPagination({
      count: data.count,
      next: data.next,
      prev: data.previous,
    });
  };

  const nextPage = (e) => {
    e.preventDefault();
    if (pagination.next) {
      setCurrentPage((currPage) => currPage + 1);
    }
  };

  const previousPage = (e) => {
    e.preventDefault();
    if (pagination.prev) {
      setCurrentPage((currPage) => currPage - 1);
    }
  };

  const totalPages = Math.ceil(pagination.count / 6);
  const pageNumbers = [];

  for (let i = 1; i <= totalPages; i++) {
    pageNumbers.push(i);
  }

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
        {data.length === 0 ? (
          <RestaurantFoodSkeleton />
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-5">
            {data.map((food) => (
              <div key={food.id}>
                <Link to={`/food/${food.slug}`} className="space-y-1">
                  <img
                    src={food.image}
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
        )}
        {data.length === 0 ? (
          <div className="h-6 bg-gray-200 animate-pulse my-5"></div>
        ) : (
          <div className="py-5">
            <Pagination
              pagination={pagination}
              previousPage={previousPage}
              nextPage={nextPage}
              pageNumbers={pageNumbers}
              currentPage={currentPage}
              setCurrentPage={setCurrentPage}
            />
          </div>
        )}
      </div>
    </div>
  );
};

export default RestaurantFoodPage;
