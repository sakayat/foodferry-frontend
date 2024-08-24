import React, { useEffect, useState } from "react";
import SectionTitle from "./SectionTitle";
import SliderContent from "./SliderContent";

const RushFood = () => {
  const [data, setData] = useState([]);

  useEffect(() => {
    fetchFoodItems();
  }, []);

  const fetchFoodItems = async () => {
    const res = await fetch(
      `${import.meta.env.VITE_API_BASE_URL}/api/restaurant/foods/`
    );
    const data = await res.json();
    setData(data);
  };

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
