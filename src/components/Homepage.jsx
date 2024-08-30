import React from "react";
import HeroSection from "./HeroSection";
import FoodCategories from "./FoodCategories";
import FeaturedItems from "./FeaturedItems";
import RushFood from "./RushFood";
import PopularFoodItem from "./PopularFoodItem";
import BudgetSpotsFoodItem from "./BudgetSpotsFoodItem";

const Homepage = () => {
  return (
    <div className="w-full">
      <HeroSection />
      <FoodCategories />
      <FeaturedItems />
      <PopularFoodItem />
      <BudgetSpotsFoodItem />
      <RushFood />
    </div>
  );
};

export default Homepage;
