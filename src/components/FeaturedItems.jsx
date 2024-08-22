import React from "react";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import "swiper/css";
import "swiper/css/pagination";
import { Pagination } from "swiper/modules";
import { Swiper, SwiperSlide } from "swiper/react";
import { useQuery } from "@tanstack/react-query";
import { currencyFormat } from "../lib/utils";
import { Link } from "react-router-dom";

const FeaturedItems = () => {
  const fetchFoodItems = async () => {
    const res = await fetch(
      `${import.meta.env.VITE_API_BASE_URL}/api/restaurant/foods/`
    );
    const data = await res.json();
    return data;
  };

  const { data, loading, error } = useQuery({
    queryKey: ["foods"],
    queryFn: fetchFoodItems,
  });

  console.log(data);
  

  return (
    <div className="pt-14">
      <div className="xl:container m-auto px-8">
        <div className="py-5 flex justify-between items-center">
          <h1 className="text-4xl font-semibold">Quick and affordable </h1>
          <button className=" default-btn py-2 px-6 rounded">See all</button>
        </div>
        <Swiper
          spaceBetween={30}
          allowTouchMove={true}
          pagination={{
            clickable: true,
          }}
          modules={[Pagination]}
          style={{
            "--swiper-navigation-color": "#000",
            "--swiper-pagination-color": "#000",
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
