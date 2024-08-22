import React from 'react'
import HeroSection from './HeroSection'
import FoodCategories from './FoodCategories'
import FeaturedItems from './FeaturedItems'

const Homepage = () => {
  return (
    <div className="w-full">
        <HeroSection/>
        <FoodCategories />
        <FeaturedItems />
    </div>
  )
}

export default Homepage