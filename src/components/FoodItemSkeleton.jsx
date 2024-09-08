import React from "react";

const FoodItemSkeleton = () => {
  return (
    <div className="space-y-2 h-64">
      <div className="h-44 w-full bg-gray-200 rounded-xl animate-pulse" />
      <div className="h-6 w-full bg-gray-200 animate-pulse" />
      <div className="h-5 w-1/2 bg-gray-200 animate-pulse" />
    </div>
  );
};

export default FoodItemSkeleton;
