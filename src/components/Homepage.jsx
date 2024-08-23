import React from 'react'
import HeroSection from './HeroSection'
import FoodCategories from './FoodCategories'
import FeaturedItems from './FeaturedItems'
import GreatPriceFood from './GreatPriceFood'
import RushFood from './RushFood'

const Homepage = () => {
  return (
    <div className="w-full">
        <HeroSection/>
        <FoodCategories />
        <FeaturedItems />
        <GreatPriceFood />
        <RushFood />
    </div>
  )
}

export default Homepage