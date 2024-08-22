import React from "react";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

const FoodCategories = () => {
  const settings = {
    dots: true,
    infinite: false,
    speed: 500,
    slidesToShow: 4,
    slidesToScroll: 4,
    initialSlide: 0,

    responsive: [
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 3,
          slidesToScroll: 3,
          infinite: true,
          dots: true,
        },
      },
      {
        breakpoint: 600,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 2,
          initialSlide: 2,
        },
      },
      {
        breakpoint: 480,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
        },
      },
    ],
  };

  return (
    <div className="pt-10">
      <div className="xl:container mx-auto px-8">
        <div className="py-3">
          <h1 className="text-4xl font-semibold">Food categories</h1>
        </div>
        <div className="">
          <Slider {...settings}>
            <div className="categories">
              <div className="category-info hover:scale-100">
                <img src="src/assets/images/s1.png" alt="" />
              </div>
              <span className="text-xl font-bold">Burger</span>
            </div>
 
          </Slider>
        </div>
      </div>
    </div>
  );
};

export default FoodCategories;
