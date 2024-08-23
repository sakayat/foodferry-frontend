import React from "react";
import SectionTitle from "./SectionTitle";
import { fetchFoodItems } from "../lib/fetchData";
import { useQuery } from "@tanstack/react-query";
import SliderContent from "./SliderContent";

const RushFood = () => {
  const { data } = useQuery({
    queryKey: ["foods"],
    queryFn: fetchFoodItems,
  });

  return (
    <div className="pt-14">
      <div className="xl:container mx-auto px-8">
        <SectionTitle title={"In a rush?"} sliderId="rush" />
        <SliderContent data={data} tag_name="rush" sliderId="rush" />
      </div>
    </div>
  );
};

export default RushFood;
