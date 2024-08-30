import React from "react";
import HeroSection from "./HeroSection";
import FoodCategories from "./FoodCategories";
import FeaturedItems from "./FeaturedItems";
import PopularFoodItem from "./PopularFoodItem";
import BudgetSpotsFoodItem from "./BudgetSpotsFoodItem";
import HealthyFoodItem from "./HealthyFoodItem";
import HomeChefsFoodItem from "./HomechefsFoodItem";

const Homepage = () => {
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

export default Homepage;
