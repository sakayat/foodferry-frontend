import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useFoodCategories, useFoodTagStore } from "../lib/store/zustandStore";
import FoodItemForm from "../components/FoodItemForm";

const AddFoodItemPage = () => {
  useEffect(() => {
    fetchFoodCategories();
    fetchTags();
  }, []);

  const { categories, fetchFoodCategories } = useFoodCategories();

  const { tags, fetchTags } = useFoodTagStore();


  return (
    <div className="max-w-6xl mx-auto px-8 py-5">
      <FoodItemForm categories={categories} foodTags={tags} />
    </div>
  );
};

export default AddFoodItemPage;
