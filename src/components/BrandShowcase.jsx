import React, { useEffect, useState } from "react";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import brand2 from "../assets/images/brand2.png";
import brand3 from "../assets/images/brand3.png";
import brand4 from "../assets/images/brand4.png";
import brand5 from "../assets/images/brand5.png";
import brand6 from "../assets/images/brand6.png";
import brand7 from "../assets/images/brand7.png";
import brand8 from "../assets/images/brand8.png";
import brand9 from "../assets/images/brand9.png";

const BrandShowcase = () => {
  const brands = [
    {
      name: "Mc'd",
      logo: brand2,
    },
    {
      name: "Pizza Hut",
      logo: brand3,
    },
    {
      name: "Subway",
      logo: brand4,
    },
    {
      name: "KFC",
      logo: brand5,
    },
    {
      name: "Domino's",
      logo: brand6,
    },
    {
      name: "Burger King",
      logo: brand7,
    },
    {
      name: "Starbucks",
      logo: brand8,
    },
    {
      name: "Taco Bell",
      logo: brand9,
    },
  ];

  const settings = {
    infinite: false,
    speed: 500,
    slidesToShow: 7,
    slidesToScroll: 1,
    initialSlide: 1,

    responsive: [
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 4,
          slidesToScroll: 1,
          infinite: true,
          dots: true,
        },
      },
      {
        breakpoint: 768,
        settings: {
          slidesToShow: 3,
          slidesToScroll: 1,
          infinite: true,
          dots: true,
        },
      },
    ],
  };

  return (
    <div className="py-5">
      <div className="xl:container mx-auto px-8">
        <Slider {...settings}>
          {brands.map((brand, index) => (
            <div key={index} className="brand-box text-center cursor-pointer">
              <div className="food-brands block mb-2">
                <img
                  className="img-fluid brand-img w-24 h-24 mx-auto object-contain"
                  src={brand.logo}
                  alt={brand.name}
                />
              </div>
              <div className="text-gray-800 hover:text-blue-500 transition-colors duration-300">
                <h4 className="font-semibold">{brand.name}</h4>
              </div>
            </div>
          ))}
        </Slider>
      </div>
    </div>
  );
};

export default BrandShowcase;
