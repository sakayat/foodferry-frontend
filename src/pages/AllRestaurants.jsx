import React, { useEffect } from "react";
import { useRestaurantListStore } from "../lib/store/zustandStore";
import { Link } from "react-router-dom";

const AllRestaurants = () => {
  useEffect(() => {
    fetchRestaurants();
  }, []);

  const { restaurantData, fetchRestaurants } = useRestaurantListStore();

  return (
    <div className="py-5">
      <div className="xl:container mx-auto px-8">
        <div className="py-5">
          <h2 className="text-3xl capitalize">All restaurants</h2>
        </div>
        {restaurantData.length === 0 && (
          <div className="space-y-2 h-64">
            <div className="h-44 w-full bg-gray-200 rounded-xl animate-pulse" />
            <div className="h-6 w-full bg-gray-200 animate-pulse" />
          </div>
        )}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-5">
          {restaurantData.map((item) => (
            <Link key={item.id} to={`/restaurant/${item.slug}/`} className="">
              <img
                src={item.cover_image}
                alt=""
                className="h-72 lg:h-44 w-full object-cover rounded-xl"
              />
              <h4 className="font-bold capitalize">{item.name}</h4>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
};

export default AllRestaurants;
