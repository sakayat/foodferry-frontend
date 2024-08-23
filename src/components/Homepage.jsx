import React from 'react'
import HeroSection from './HeroSection'
import FoodCategories from './FoodCategories'
import FeaturedItems from './FeaturedItems'
import GreatMeals from './GreatMeals'

const Homepage = () => {
  return (
    <div className="w-full">
        <HeroSection/>
        <FoodCategories />
        <FeaturedItems />
        <GreatMeals />
    </div>
  )
}

export default Homepage