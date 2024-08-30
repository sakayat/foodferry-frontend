import React, { useEffect, useState } from "react";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { Link } from "react-router-dom";

const FoodCategories = () => {

  const [data, setData] = useState([])

  const settings = {
    dots: true,
    infinite: false,
    speed: 500,
    slidesToShow: 5,
    slidesToScroll: 5,
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
        breakpoint: 768,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 2,
          infinite: true,
          dots: true,
        },
      },
      {
        breakpoint: 576,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
          infinite: true,
          dots: true,
        },
      },
    ],
  };

  useEffect(() => {
    fetchCategories()
  }, [])

  const fetchCategories = async () => {
    const res = await fetch(
      `${import.meta.env.VITE_API_BASE_URL}/api/restaurant/food-categories/`
    );
    const data = await res.json();
    setData(data)
  };

  return (
    <div className="pt-10">
      <div className="xl:container mx-auto px-8">
        <div className="py-3">
          <h1 className="text-4xl font-semibold">Food categories</h1>
        </div>
        <div className="h-52">
          <Slider {...settings}>
            {data?.map((category) => (
              <Link to={category.slug} className="categories" key={category.id}>
                <div className="category-info hover:scale-100">
                  <img
                    src={`${import.meta.env.VITE_API_BASE_URL}/${
                      category.image
                    }`}
                    className="h-36 w-full rounded-xl"
                    alt=""
                  />
                </div>
                <span className="text-md font-bold">{category.name}</span>
              </Link>
            ))}
          </Slider>
        </div>
      </div>
    </div>
  );
};

export default FoodCategories;
