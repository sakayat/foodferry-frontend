import React from 'react'
import HeroSection from './HeroSection'
import FoodCategories from './FoodCategories'
import FeaturedItems from './FeaturedItems'
import GreatPriceFood from './GreatPriceFood'

const Homepage = () => {
  return (
    <div className="w-full">
        <HeroSection/>
        <FoodCategories />
        <FeaturedItems />
        <GreatPriceFood />
    </div>
  )
}

export default Homepage