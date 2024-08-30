import React from "react";
import TagFoodItemsPage from "../pages/TagFoodItemsPage";
import { useParams } from "react-router-dom";

const QuickFoodItem = () => {
  const { tag } = useParams();
  
  return (
    <div className="pt-5">
      <div className="xl:container mx-auto px-8">
        <div className="py-5">
          <h1 className="text-3xl">Quick and affordable</h1>
        </div>
        <TagFoodItemsPage tag={tag} />
      </div>
    </div>
  );
};

export default QuickFoodItem;
