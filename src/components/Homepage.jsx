import React from 'react'
import HeroSection from './HeroSection'
import FoodCategories from './FoodCategories'

const Homepage = () => {
  return (
    <div className="w-full">
        <HeroSection/>
        <FoodCategories />
    </div>
  )
}

export default Homepage