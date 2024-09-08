import React from "react";

const RestaurantFoodSkeleton = () => {
  return (
    <div className="space-y-1 animate-pulse">
      <div className="h-44 w-full bg-gray-200 rounded-xl"></div>
      <div className="h-6 bg-gray-200 rounded w-3/4"></div>
      <div className="h-5 bg-gray-200 rounded w-1/4"></div>
      <div className="h-6 bg-gray-200 rounded w-20 mt-2"></div>
    </div>
  );
};

export default RestaurantFoodSkeleton;
