import React from "react";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import SliderItem from "./SliderItem";

const HeroSection = () => {
  const data = [
    {
      id: 1,
      text: "Hot Summer Offer!",
      sub_title: "Try brand new",
      title: "BIG MAMA BURGER!",
      image: "src/assets/images/slider1.png",
    },
    {
      id: 2,
      text: "Friday offer!",
      sub_title: "Making people happy",
      title: "Vincent pizza",
      image: "src/assets/images/slider2.png",
    },
    {
      id: 1,
      text: "Hot Summer Offer!",
      sub_title: "Try brand new",
      title: "Delicious Disheswith Koganic",
      image: "src/assets/images/slider4.png",
    },
  ];

  const settings = {
    dots: true,
    fade: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    arrows: false,
  };

  return (
    <div className="home-banner">
      <div className="xl:container mx-auto px-8">
        <div className="h-screen flex flex-col justify-center">
          <div className="slider-container">
            <Slider {...settings}>
              {data.map((item) => (
                <SliderItem key={item.id} item={item} />
              ))}
            </Slider>
          </div>
        </div>
      </div>
    </div>
  );
};

export default HeroSection;
