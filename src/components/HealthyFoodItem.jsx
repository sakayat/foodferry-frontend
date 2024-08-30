import React, { useEffect } from "react";
import SectionTitle from "./SectionTitle";
import SliderContent from "./SliderContent";
import { useFoodItemsStore } from "../lib/store/zustandStore";

const HealthyFoodItem = () => {
  useEffect(() => {
    fetchFoodItems();
  }, []);

  const { data, fetchFoodItems } = useFoodItemsStore();

  return (
    <div className="pt-14 relative">
      <div className="xl:container m-auto px-8">
        <SectionTitle
          title={"Healthy food to explore"}
          sliderId="healthy"
          tag="healthy-food-to-explore"
        />
        <SliderContent data={data} tag_name="healthy-food-to-explore" sliderId="healthy" />
      </div>
    </div>
  );
};

export default HealthyFoodItem;
