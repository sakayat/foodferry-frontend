import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { useFoodCategories, useFoodTags } from "../../../lib/store/zustandStore";
import FoodItemForm from "./components/FoodItemForm";


const UpdateRestaurantFoodPage = () => {
  const { id } = useParams();

  useEffect(() => {
    fetchFoodCategories();
    fetchFoodTags();
  }, []);

  const { categories, fetchFoodCategories } = useFoodCategories();

  const { foodTags, fetchFoodTags } = useFoodTags();


  return (
    <div className="px-4 py-6">
      <FoodItemForm categories={categories} foodTags={foodTags} id={id} />
    </div>
  );
};

export default UpdateRestaurantFoodPage;
