import React from "react";
import SectionTitle from "./SectionTitle";
import SliderContent from "./SliderContent";
import { useQuery } from "@tanstack/react-query";
import { fetchFoodItems } from "../lib/fetchData";

const GreatPriceFood = () => {
  const { data } = useQuery({
    queryKey: ["foods"],
    queryFn: fetchFoodItems,
  });

  return (
    <div className="pt-14">
      <div className="xl:container mx-auto px-8">
        <SectionTitle title={"Great meals, great prices"} sliderId="great-meals"/>
        <SliderContent data={data} tag_name="great meals" sliderId="great-meals"/>
      </div>
    </div>
  );
};

export default GreatPriceFood;
