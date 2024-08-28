import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { useFoodCategories, useFoodTags } from "../lib/store/zustandStore";
import FoodItemForm from "../components/FoodItemForm";

const UpdateRestaurantFood = () => {
  const { categories, fetchFoodCategories } = useFoodCategories();

  const { foodTags, fetchFoodTags } = useFoodTags();

  const {id} = useParams()

  useEffect(() => {
    fetchFoodCategories();
    fetchFoodTags();
  }, []);
  return (
    <div className="max-w-6xl mx-auto px-8 py-5">
      <FoodItemForm categories={categories} foodTags={foodTags} id={id}/>
    </div>
  );
};

export default UpdateRestaurantFood;
