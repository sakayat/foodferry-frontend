import React, { useRef, useState } from "react";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import "swiper/css";
import "swiper/css/navigation";
import { Navigation, Mousewheel, Keyboard } from "swiper/modules";
import { Swiper, SwiperSlide } from "swiper/react";
import { useQuery } from "@tanstack/react-query";
import { currencyFormat } from "../lib/utils";
import { Link } from "react-router-dom";
import { ChevronLeft, ChevronRight } from "lucide-react";

const FeaturedItems = () => {
  const fetchFoodItems = async () => {
    const res = await fetch(
      `${import.meta.env.VITE_API_BASE_URL}/api/restaurant/foods/`
    );
    const data = await res.json();
    return data;
  };

  const { data } = useQuery({
    queryKey: ["foods"],
    queryFn: fetchFoodItems,
  });

  const swiperRef = useRef();

  return (
    <div className="pt-14 relative">
      <div className="xl:container m-auto px-8">
        <div className="py-5 flex justify-between items-center relative">
          <h1 className="text-2xl md:text-4xl font-semibold">
            Quick and affordable{" "}
          </h1>
          <div className="buttons flex items-center gap-5">
            <Link to={"/"} className="font-bold">
              See all
            </Link>
            <div className="slider-button">
              <button
                className="swiper-button-prev"
                onClick={() => swiperRef.current?.slidePrev()}
              >
           
              </button>
              <button
                className="swiper-button-next"
                onClick={() => swiperRef.current?.slideNext()}
              >
               
              </button>
            </div>
          </div>
        </div>

        <Swiper
          modules={[Navigation, Mousewheel, Keyboard]}
          spaceBetween={30}
          allowTouchMove={true}
          cssMode={true}
          onBeforeInit={(swiper) => {
            swiperRef.current = swiper;
          }}
          navigation={{
            nextEl: ".swiper-button-next",
            prevEl: ".swiper-button-prev",
          }}
          mousewheel={true}
          keyboard={true}
          pagination={{
            clickable: true,
          }}
          breakpoints={{
            1280: {
              slidesPerView: 5,
            },
            1024: {
              slidesPerView: 4,
            },
            768: {
              slidesPerView: 3,
            },
            576: {
              slidesPerView: 2,
            },
            480: {
              slidesPerView: 1,
            },
          }}
        >
          {data
            ?.filter((item) => item.price < 10)
            ?.map((food) => (
              <SwiperSlide key={food.id}>
                <Link to={`food/${food.name_slug}`} className="space-y-2 h-64">
                  <img
                    src={`${import.meta.env.VITE_API_BASE_URL}/${food.image}`}
                    alt={food.name}
                    className="rounded h-40 w-full"
                  />
                  <h4 className="font-bold">{food.name}</h4>
                  <span className="price">{currencyFormat(food.price)}</span>
                </Link>
              </SwiperSlide>
            ))}
        </Swiper>
      </div>
    </div>
  );
};

export default FeaturedItems;
