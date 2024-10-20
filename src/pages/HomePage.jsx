import React, { useEffect, useState } from "react";
import FoodCategories from "../components/FoodCategories";
import FeaturedItems from "../components/FeaturedItems";
import PopularFoodItem from "../components/PopularFoodItem";
import BudgetSpotsFoodItem from "../components/BudgetSpotsFoodItem";
import HealthyFoodItem from "../components/HealthyFoodItem";
import HomeChefsFoodItem from "../components/HomeChefsFoodItem";
import HomeBanner from "../components/HomeBanner";
import FAQContent from "../components/FAQContent";
import BrandShowcase from "../components/BrandShowcase";

const HomePage = () => {
  const [data, setData] = useState([]);

  useEffect(() => {
    fetchFoodItems();
  }, []);

  const fetchFoodItems = async () => {
    try {
      const res = await fetch(
        `${import.meta.env.VITE_API_BASE_URL}/api/restaurant/items/`
      );
      const data = await res.json();
      setData(data);
    } catch (error) {
      console.log("something went wrong");
    }
  };

  return (
    <div className="w-full">
      <HomeBanner />
      <FoodCategories />
      <FeaturedItems data={data}/>
      <PopularFoodItem data={data} />
      <HomeChefsFoodItem data={data} />
      <BudgetSpotsFoodItem data={data} />
      <HealthyFoodItem data={data} />
      <FAQContent />
      <BrandShowcase />
    </div>
  );
};

export default HomePage;
