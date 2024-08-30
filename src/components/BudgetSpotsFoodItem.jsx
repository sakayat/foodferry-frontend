import React, { useEffect } from "react";
import SectionTitle from "./SectionTitle";
import SliderContent from "./SliderContent";
import { useFoodItemsStore } from "../lib/store/zustandStore";

const BudgetSpotsFoodItem = () => {
  useEffect(() => {
    fetchFoodItems();
  }, []);

  const { data, fetchFoodItems } = useFoodItemsStore();
  return (
    <div className="pt-14 relative">
      <div className="xl:container m-auto px-8">
        <SectionTitle
          title={"Budget friendly spots"}
          sliderId="budget-spots"
          tag="budget-friendly-spots"
        />
        <SliderContent
          data={data}
          tag_name="budget-friendly-spots"
          sliderId="budget-spots"
        />
      </div>
    </div>
  );
};

export default BudgetSpotsFoodItem;
