import React, { useRef, useState } from "react";
import { fetchFoodItems } from "../lib/fetchData";
import { useQuery } from "@tanstack/react-query";
import SectionTitle from "./SectionTitle";
import SliderContent from "./SliderContent";

const FeaturedItems = () => {

  const { data } = useQuery({
    queryKey: ["foods"],
    queryFn: fetchFoodItems,
  });

  return (
    <div className="pt-14 relative">
      <div className="xl:container m-auto px-8">
        <SectionTitle title={"Quick and affordable"} sliderId="affordable"/>
        <SliderContent data={data} tag_name="affordable" sliderId="affordable"/>
      </div>
    </div>
  );
};

export default FeaturedItems;
