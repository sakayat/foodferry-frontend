import React, { useRef } from "react";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import SliderItem from "./SliderItem";
import { ChevronLeft, ChevronRight } from "lucide-react";

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
      title: "Delicious Disheswith",
      image: "src/assets/images/slider4.png",
    },
  ];

  let sliderRef = useRef(null);

  const next = () => {
    sliderRef.slickNext();
  };
  const previous = () => {
    sliderRef.slickPrev();
  };

  const settings = {
    fade: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    arrows: false,
    draggable: true,
  };

  return (
    <div className="home-banner">
      <div className="xl:container mx-auto px-8">
        <div className="py-10">
          <div className="slider-container">
            <Slider
              ref={(slider) => {
                sliderRef = slider;
              }}
              {...settings}
            >
              {data.map((item) => (
                <SliderItem key={item.id} item={item} />
              ))}
            </Slider>
            <div className="text-center space-x-10">
              <button
                className="button bg-black text-white py-2 px-4 rounded"
                onClick={previous}
              >
                <ChevronLeft />
              </button>
              <button
                className="button bg-black text-white py-2 px-4 rounded"
                onClick={next}
              >
                <ChevronRight />
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default HeroSection;
