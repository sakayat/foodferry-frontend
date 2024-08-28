import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useFoodCategories, useFoodTags } from "../lib/store/zustandStore";
import FoodItemForm from "../components/FoodItemForm";

const AddFoodItemPage = () => {
  const { categories, fetchFoodCategories } = useFoodCategories();

  const { foodTags, fetchFoodTags } = useFoodTags();

  console.log(foodTags);
  

  useEffect(() => {
    fetchFoodCategories();
    fetchFoodTags();
  }, []);

  return (
    <div className="max-w-6xl mx-auto px-8 py-5">
      
      <FoodItemForm categories={categories} foodTags={foodTags} />
    </div>
  );
};

export default AddFoodItemPage;
