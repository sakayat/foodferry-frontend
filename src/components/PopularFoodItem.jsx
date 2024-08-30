import React, { useEffect } from "react";
import SectionTitle from "./SectionTitle";
import SliderContent from "./SliderContent";
import { useFoodItemsStore } from "../lib/store/zustandStore";

const PopularFoodItem = () => {
  useEffect(() => {
    fetchFoodItems();
  }, []);

  const { data, fetchFoodItems } = useFoodItemsStore();

  return (
    <div className="pt-14 relative">
      <div className="xl:container m-auto px-8">
        <SectionTitle
          title={"Most popular local restaurants"}
          sliderId="popular"
          tag="popular"
        />
        <SliderContent data={data} tag_name="popular" sliderId="popular" />
      </div>
    </div>
  );
};

export default PopularFoodItem;
