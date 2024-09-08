import React from 'react'

const CategorySkeleton = () => {
  return (
    <div className="animate-pulse">
      <div className="hover:scale-100">
        <div className="h-36 w-full bg-gray-200 rounded-xl"></div>
      </div>
      <div className="h-6 bg-gray-200 rounded w-3/4 mt-2"></div>
    </div>
  )
}

export default CategorySkeleton