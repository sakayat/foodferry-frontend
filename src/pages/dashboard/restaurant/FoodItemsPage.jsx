import { Edit, Loader, Trash2 } from "lucide-react";
import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { currencyFormat } from "../../../lib/utils";
import Pagination from "../../../components/Pagination";

const FoodItemsPage = () => {
  const userData = localStorage.getItem("user");
  const parseData = userData ? JSON.parse(userData) : {};
  const token = parseData.token;

  const [data, setData] = useState([]);

  const [pagination, setPagination] = useState({});
  const [currentPage, setCurrentPage] = useState(1);
  const [itemId, setItemId] = useState(null);

  useEffect(() => {
    fetchRestaurantFoodItem();
  }, [currentPage]);

  const fetchRestaurantFoodItem = async () => {
    const res = await fetch(
      `${
        import.meta.env.VITE_API_BASE_URL
      }/api/restaurant/foods/?page=${currentPage}`,
      {
        method: "GET",
        headers: {
          "Content-type": "application/json",
          Authorization: `Token ${token}`,
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

  const handleDelete = async (id) => {
    setItemId(id);
    const res = await fetch(
      `${import.meta.env.VITE_API_BASE_URL}/api/restaurant/food/delete/${id}/`,
      {
        method: "DELETE",
        headers: {
          Authorization: `Token ${token}`,
        },
      }
    );

    if (res.ok) {
      setItemId(null);
    }
    fetchRestaurantFoodItem();
  };

  return (
    <div className="max-w-6xl mx-auto px-8 py-5">
      <div className="py-5">
        <h2 className="text-3xl">All Food Items</h2>
      </div>

      <div className="relative overflow-x-auto">
        <table className="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
          <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
            <tr>
              <th scope="col" className="px-6 py-3">
                Name
              </th>
              <th scope="col" className="px-6 py-3">
                Category
              </th>
              <th scope="col" className="px-6 py-3">
                Price
              </th>
              <th scope="col" className="px-6 py-3">
                Available
              </th>
              <th scope="col" className="px-6 py-3">
                Tag
              </th>
              <th scope="col" className="px-6 py-3">
                Actions
              </th>
            </tr>
          </thead>
          <tbody>
            {pagination.count === 0 && (
              <p className="pt-5 text-xl">No Data Found</p>
            )}
            {data.length === 0
              ? Array.from({ length: 10 }).map((_, id) => (
                  <tr
                    key={id}
                    className="bg-white border-b dark:bg-gray-800 dark:border-gray-700"
                  >
                    <th scope="row" className="px-6 py-4">
                      <div className="w-full bg-gray-200 h-8" />
                    </th>
                    <td className="px-6 py-4">
                      <div className="w-full bg-gray-200 h-8" />
                    </td>
                    <td className="px-6 py-4">
                      <div className="w-full bg-gray-200 h-8" />
                    </td>
                    <td className="px-6 py-4">
                      <div className="w-full bg-gray-200 h-8" />
                    </td>
                    <td className="px-6 py-4">
                      <div className="w-full bg-gray-200 h-8" />
                    </td>
                    <td className="px-6 py-4">
                      <div className="w-full bg-gray-200 h-8" />
                    </td>
                  </tr>
                ))
              : data.map((item) => (
                  <tr
                    className="bg-white border-b dark:bg-gray-800 dark:border-gray-700"
                    key={item.id}
                  >
                    <th
                      scope="row"
                      className="px-6 py-4 font-medium text-gray-900 dark:text-white space-x-5"
                    >
                      {item.name}
                    </th>
                    <td className="px-6 py-4">{item.category_name}</td>
                    <td className="px-6 py-4">{currencyFormat(item.price)}</td>
                    <td className="px-6 py-4">
                      <span
                        className={`py-1 px-4 rounded ${
                          item.is_available
                            ? "bg-green-200 text-green-800"
                            : "bg-red-200 text-red-800"
                        }`}
                      >
                        {item.is_available ? "Yes" : "No"}
                      </span>
                    </td>
                    <td className="px-6 py-4">{item.food_tag}</td>
                    <td className="px-6 py-4 space-x-3 flex">
                      <button className="mr-2 text-blue-600 hover:text-blue-800">
                        <Link
                          to={`/restaurant/dashboard/update-food-item/${item.id}/`}
                        >
                          <Edit size={18} />
                        </Link>
                      </button>
                      <button
                        onClick={() => handleDelete(item.id)}
                        className="text-red-600 hover:text-red-800"
                      >
                        {itemId == item.id ? (
                          <Loader size={18} />
                        ) : (
                          <Trash2 size={18} />
                        )}
                      </button>
                    </td>
                  </tr>
                ))}
          </tbody>
        </table>
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
      </div>
    </div>
  );
};

export default FoodItemsPage;
