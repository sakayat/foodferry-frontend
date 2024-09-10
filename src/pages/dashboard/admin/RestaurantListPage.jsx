import { Trash2 } from "lucide-react";
import React, { useEffect, useState } from "react";
import { useRestaurantListStore } from "../../../lib/store/zustandStore";


const RestaurantListPage = () => {
  const token = localStorage.getItem("authToken");

  useEffect(() => {
    fetchRestaurants();
  }, []);

  const { restaurants, fetchRestaurants } = useRestaurantListStore();

  const [showModal, setShowModal] = useState(false);
  const [restaurantInfo, setRestaurantInfo] = useState(null);

  const handleShowDeleteModal = (restaurant) => {
    setRestaurantInfo(restaurant);
    setShowModal(!showModal);
  };
  console.log(restaurantInfo);

  const handleDeleteRestaurant = async (id) => {
    const res = await fetch(
      `${import.meta.env.VITE_API_BASE_URL}/api/restaurant/delete/${id}/`,
      {
        method: "DELETE",
        headers: {
          "Content-type": "application/json",
          Authorization: `Token ${token}`,
        },
      }
    );

    if (res.ok) {
      setShowModal(!showModal);
    }
    fetchRestaurants();
  };

  return (
    <div className="max-w-6xl mx-auto px-8 py-5">
      <div className="py-5">
        <h2 className="text-3xl">Restaurant List</h2>
      </div>
      <div className="restaurant-list">
        <div className="relative overflow-x-auto">
          <table className="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
            <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
              <tr>
                <th scope="col" className="px-6 py-3">
                  Name
                </th>
                <th scope="col" className="px-6 py-3">
                  Address
                </th>
                <th scope="col" className="px-6 py-3">
                  Phone Number
                </th>
                <th scope="col" className="px-6 py-3">
                  Owner
                </th>
                <th scope="col" className="px-6 py-3">
                  Action
                </th>
              </tr>
            </thead>
            <tbody>
              {restaurants.map((restaurant) => (
                <tr
                  key={restaurant.id}
                  className="bg-white border-b dark:bg-gray-800 dark:border-gray-700"
                >
                  <td className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white">
                    {restaurant.name}
                  </td>
                  <td className="px-6 py-4">{restaurant.address}</td>
                  <td className="px-6 py-4">{restaurant.phone_number}</td>
                  <td className="px-6 py-4">{restaurant.owner}</td>
                  <td className="px-6 py-4 space-x-3">
                    <button
                      className="text-red-600 hover:text-red-800"
                      onClick={() => handleShowDeleteModal(restaurant)}
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
      {showModal && (
        <div className="fixed inset-0 flex items-center justify-center z-50 bg-black bg-opacity-50">
          <div className="bg-white p-6 shadow-lg">
            <h3 className="text-lg font-bold mb-4">Confirm Delete</h3>
            <p>
              Are you sure you want to delete{" "}
              <span className="text-rose-500">
                {restaurantInfo?.name} Restaurant?{" "}
              </span>
            </p>
            <div className="mt-4 flex justify-end space-x-4">
              <button
                className="px-4 py-2 bg-gray-300 hover:bg-gray-400"
                onClick={() => setShowModal(!showModal)}
              >
                Cancel
              </button>
              <button
                className="px-4 py-2 bg-red-500 text-white hover:bg-red-600"
                onClick={() => handleDeleteRestaurant(restaurantInfo.id)}
              >
                Delete
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default RestaurantListPage;
