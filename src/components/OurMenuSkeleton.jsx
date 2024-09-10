import React from "react";

const OurMenuSkeleton = () => {
  return (
    <div className="space-y-8">
      <div className="flex border-b border-gray-200">
        <div className="h-8 w-full bg-gray-200 animate-pulse rounded-md" />
      </div>
      <div className="space-y-2">
        <div className="block bg-white shadow-lg">
          <div className="relative">
            <div className="w-full h-48 bg-gray-200 animate-pulse rounded-xl" />
            <div className="absolute inset-0 flex items-end bg-gradient-to-t from-gray-800 to-transparent opacity-75 rounded-xl">
              <div className="w-full space-y-2 p-6">
                <div className="h-8 bg-gray-200 animate-pulse rounded-md w-96" />
                <div className="h-6 bg-gray-200 animate-pulse rounded-md w-28" />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default OurMenuSkeleton;
