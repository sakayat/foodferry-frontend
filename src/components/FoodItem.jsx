import React from "react";
import TagFoodItemsPage from "../pages/TagFoodItemsPage";
import { useParams } from "react-router-dom";

const FoodItem = () => {
  const { tag } = useParams();

  const title =
    tag.charAt(0).toUpperCase() +
    tag.slice(1).toLowerCase().split("-").join(" ");

  return (
    <div className="pt-5">
      <div className="xl:container mx-auto px-8">
        <div className="py-5">
          <h1 className="text-3xl">{title}</h1>
        </div>
      
      </div>
    </div>
  );
};

export default FoodItem;
