import React, { useEffect } from "react";
import SectionTitle from "./SectionTitle";
import SliderContent from "./SliderContent";

const PopularFoodItem = ({data}) => {

  return (
    <div className="pt-14 relative">
      <div className="xl:container m-auto px-8">
        <SectionTitle
          title={"Most popular"}
          sliderId="popular"
          tag="popular"
        />
        <SliderContent data={data} tag_name="popular" sliderId="popular" />
      </div>
    </div>
  );
};

export default PopularFoodItem;
