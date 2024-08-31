import React, { useEffect } from "react";
import { useRestaurantListStore } from "../lib/store/zustandStore";
import { Link } from "react-router-dom";

const AllRestaurants = () => {
  useEffect(() => {
    fetchRestaurants();
  }, []);

  const { restaurants, fetchRestaurants } = useRestaurantListStore();  

  return (
    <div className="py-5">
      <div className="xl:container mx-auto px-8">
        <div className="py-5">
          <h2 className="text-3xl capitalize">All restaurants</h2>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-5">
          {restaurants?.map((restaurant) => (
            <Link
              to={`/restaurant/${restaurant.slug}/`}
              className=""
              key={restaurant.id}
            >
              <img
                src={`${import.meta.env.VITE_API_BASE_URL}/${
                  restaurant.cover_image
                }`}
                alt=""
                className="h-72 lg:h-44 w-full object-cover rounded-xl"
              />
              <h4 className="font-bold capitalize">{restaurant.name}</h4>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
};

export default AllRestaurants;
