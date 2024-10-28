import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useFoodCategories, useFoodTagStore } from "../../../lib/store/zustandStore";
import FoodItemForm from "./components/FoodItemForm";


const AddFoodItemPage = () => {
  useEffect(() => {
    fetchFoodCategories();
    fetchTags();
  }, []);

  const { categories, fetchFoodCategories } = useFoodCategories();

  const { tags, fetchTags } = useFoodTagStore();


  return (
    <div className="px-4 py-5">
      <FoodItemForm categories={categories} foodTags={tags} />
    </div>
  );
};

export default AddFoodItemPage;
