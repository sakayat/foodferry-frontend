import React, { useEffect, useRef, useState } from "react";
import SectionTitle from "./SectionTitle";
import SliderContent from "./SliderContent";
import { useFoodItemsStore } from "../lib/store/zustandStore";

const FeaturedItems = () => {

  useEffect(() => {
    fetchFoodItems();
  }, []);

  const { data, fetchFoodItems } = useFoodItemsStore();

  return (
    <div className="pt-14 relative">
      <div className="xl:container m-auto px-8">
        <SectionTitle
          title={"Quick and affordable"}
          sliderId="quick-and-affordable" 
          tag="quick-and-affordable"
        />
        <SliderContent
          data={data}
          tag_name="quick-and-affordable"
          sliderId="quick-and-affordable"
        />
      </div>
    </div>
  );
};

export default FeaturedItems;
