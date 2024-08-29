import React, { useEffect, useState } from "react";
import FoodCategoryForm from "../components/FoodCategoryForm";
import { useFoodCategoriesStore } from "../lib/store/zustandStore";

const AddCategoryPage = () => {
  

  useEffect(() => {
    fetchCategories;
  }, []);

  const { categories, fetchCategories } = useFoodCategoriesStore();

  

  return (
    <div className="max-w-6xl mx-auto px-8">
      <FoodCategoryForm categories={categories}/>
    </div>
  );
};

export default AddCategoryPage;
