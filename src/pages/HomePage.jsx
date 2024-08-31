import React from "react";
import HeroSection from "../components/HeroSection";
import FoodCategories from "../components/FoodCategories";
import FeaturedItems from "../components/FeaturedItems";
import PopularFoodItem from "../components/PopularFoodItem";
import BudgetSpotsFoodItem from "../components/BudgetSpotsFoodItem";
import HealthyFoodItem from "../components/HealthyFoodItem";
import HomeChefsFoodItem from "../components/HomeChefsFoodItem";

const HomePage = () => {
  return (
    <div className="w-full">
      <HeroSection />
      <FoodCategories />
      <FeaturedItems />
      <PopularFoodItem />
      <HomeChefsFoodItem />
      <BudgetSpotsFoodItem />
      <HealthyFoodItem />
    </div>
  );
};

export default HomePage;
