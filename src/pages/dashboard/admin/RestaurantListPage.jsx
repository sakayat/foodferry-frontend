import { MapPin, Mail, Phone, Trash } from "lucide-react";
import React, { useEffect, useState } from "react";
import { useRestaurantListStore } from "../../../lib/store/zustandStore";
import RestaurantCard from "../restaurant/components/RestaurantCard";

const RestaurantListPage = () => {
  const token = localStorage.getItem("authToken");

  useEffect(() => {
    fetchRestaurants();
  }, []);

  const { restaurantData: restaurants, fetchRestaurants } =
    useRestaurantListStore();

  const [showModal, setShowModal] = useState(false);
  const [restaurantInfo, setRestaurantInfo] = useState(null);

  console.log(restaurants);

  const handleShowDeleteModal = (restaurant) => {
    setRestaurantInfo(restaurant);
    setShowModal(!showModal);
  };

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
        <div className="grid gap-5 grid-cols-3 md:grid-cols-2">
          {restaurants.map((restaurant) => (
            <RestaurantCard
              key={restaurant.id}
              restaurant={restaurant}
              handleShowDeleteModal={handleShowDeleteModal}
            />
          ))}
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
