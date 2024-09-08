import React from "react";

const FoodDetailsSkeleton = () => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-8 animate-pulse">
      <div className="image bg-gray-200 rounded-xl w-full"></div>
      <div className="flex flex-col gap-5">
        <div className="bg-gray-200 h-6 w-40 rounded"></div>
        <div className="bg-gray-200 h-10 w-3/4 rounded"></div>
        <div className="bg-gray-200 h-24 w-full rounded"></div>
        <div className="bg-gray-200 h-6 w-24 rounded"></div>
        <div className="bg-gray-200 h-6 w-20 rounded"></div>
        <div className="bg-gray-200 h-12 w-full rounded"></div>
      </div>
    </div>
  );
};

export default FoodDetailsSkeleton;
