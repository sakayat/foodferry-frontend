import React, { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { currencyFormat } from "../lib/utils";
import Pagination from "../components/Pagination";
import notFoundImg from "../assets/images/not-found.png";
import FoodItemSkeleton from "../components/FoodItemSkeleton";

const CategoryFoodPage = () => {
  const { slug } = useParams();

  const [pagination, setPagination] = useState({});
  const [currentPage, setCurrentPage] = useState(1);

  useEffect(() => {
    fetchFoodData();
  }, [currentPage]);

  const [foodData, setFoodData] = useState([]);

  const fetchFoodData = async () => {
    const res = await fetch(
      `${
        import.meta.env.VITE_API_BASE_URL
      }/api/restaurant/category-foods/${slug}/?page=${currentPage}`
    );
    const data = await res.json();

    setFoodData(data.results);

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

  const totalPages = Math.ceil(pagination.count / 10);
  const pageNumbers = [];

  for (let i = 1; i <= totalPages; i++) {
    pageNumbers.push(i);
  }

  return (
    <div className="py-5">
      <div className="xl:container mx-auto px-8">
        <div className="py-5">
          <h2 className="text-3xl capitalize">{slug}</h2>
        </div>
        {foodData.length === 0 ? (
          <FoodItemSkeleton />
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-5">
            {foodData.map((food) => (
              <Link
                to={`/food/${food.slug}`}
                className="space-y-1"
                key={food.id}
              >
                <img
                  src={food.image}
                  alt=""
                  className="h-44 w-full object-cover rounded-xl"
                />
                <h4 className="font-bold capitalize">{food.name}</h4>
                <span className="price">{currencyFormat(food.price)}</span>
              </Link>
            ))}
          </div>
        )}
        {pagination.count === 0 && <p className="text-gray-500">No Data Found</p>}
        {foodData.length > 0 && (
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

export default CategoryFoodPage;
