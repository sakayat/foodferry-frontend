import React, { useEffect, useRef, useState } from "react";
import SectionTitle from "./SectionTitle";
import SliderContent from "./SliderContent";

const FeaturedItems = () => {
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
    <div className="pt-14 relative">
      <div className="xl:container m-auto px-8">
        <SectionTitle title={"Quick and affordable"} sliderId="affordable" />
        <SliderContent
          data={data}
          tag_name="affordable"
          sliderId="affordable"
        />
      </div>
    </div>
  );
};

export default FeaturedItems;
