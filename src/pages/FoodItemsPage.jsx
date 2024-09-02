import { Edit, Trash2 } from "lucide-react";
import React, { useEffect } from "react";
import { useRestaurantFoodItem } from "../lib/store/zustandStore";
import { currencyFormat } from "../lib/utils";
import { Link } from "react-router-dom";

const FoodItemsPage = () => {
  const token = localStorage.getItem("authToken");

  const { restaurantFoods, fetchRestaurantFoodItem } = useRestaurantFoodItem();

  useEffect(() => {
    fetchRestaurantFoodItem();
  }, []);

  const handleDelete = async (id) => {
    await fetch(
      `${
        import.meta.env.VITE_API_BASE_URL
      }/api/restaurant/delete-food-item/${id}/`,
      {
        method: "DELETE",
        headers: {
          Authorization: `Token ${token}`,
        },
      }
    );
    fetchRestaurantFoodItem();
  };

  return (
    <div className="max-w-6xl mx-auto px-8 py-5">
      <div className="py-5">
        <h2 className="text-3xl">All Food Items</h2>
      </div>

      <div class="relative overflow-x-auto">
        <table class="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
          <thead class="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
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
            {restaurantFoods?.map((item) => (
              <tr class="bg-white border-b dark:bg-gray-800 dark:border-gray-700">
                <th
                  scope="row"
                  class="px-6 py-4 font-medium text-gray-900 dark:text-white space-x-5"
                >
                  {item.name}
                </th>
                <td class="px-6 py-4">{item.category_name}</td>
                <td class="px-6 py-4">{currencyFormat(item.price)}</td>
                <td class="px-6 py-4">
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
                <td class="px-6 py-4">{item.food_tag}</td>
                <td className="px-6 py-4 space-x-3 flex">
                  <button
                    onClick={() => handleEdit(item.id)}
                    className="mr-2 text-blue-600 hover:text-blue-800"
                  >
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
                    <Trash2 size={18} />
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default FoodItemsPage;
