import React, { useEffect, useState } from "react";
import FoodCategories from "../components/FoodCategories";
import FeaturedItems from "../components/FeaturedItems";
import PopularFoodItem from "../components/PopularFoodItem";
import BudgetSpotsFoodItem from "../components/BudgetSpotsFoodItem";
import HealthyFoodItem from "../components/HealthyFoodItem";
import HomeChefsFoodItem from "../components/HomeChefsFoodItem";
import HomeBanner from "../components/HomeBanner";

const HomePage = () => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(false)

  useEffect(() => {
    fetchFoodItems();
  }, []);

  const fetchFoodItems = async () => {
    try {
      const res = await fetch(
        `${import.meta.env.VITE_API_BASE_URL}/api/restaurant/foods/`
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
    </div>
  );
};

export default HomePage;
