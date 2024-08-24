import React, { useEffect, useState } from "react";
import SectionTitle from "./SectionTitle";
import SliderContent from "./SliderContent";

const GreatPriceFood = () => {
  
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
        <SectionTitle title={"Great meals, great prices"} sliderId="great-meals"/>
        <SliderContent data={data} tag_name="great meals" sliderId="great-meals"/>
      </div>
    </div>
  );
};

export default GreatPriceFood;
