import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import "swiper/css";
import "swiper/css/navigation";
import { Navigation, Mousewheel, Keyboard } from "swiper/modules";
import { Link } from "react-router-dom";
import { currencyFormat } from "../lib/utils";
import { useRef } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import FoodItemSkeleton from "./FoodItemSkeleton";

const SliderContent = ({ data, tag_name, sliderId }) => {
  const swiperRef = useRef();

  return (
    <Swiper
      modules={[Navigation, Mousewheel, Keyboard]}
      spaceBetween={30}
      allowTouchMove={true}
      cssMode={true}
      onBeforeInit={(swiper) => {
        swiperRef.current = swiper;
      }}
      navigation={{
        nextEl: `.button-next-${sliderId}`,
        prevEl: `.button-prev-${sliderId}`,
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
      {data.length === 0 ? (
        <FoodItemSkeleton />
      ) : (
        data
          ?.filter((item) => item.food_tag == tag_name)
          ?.map((food) => (
            <SwiperSlide key={food.id}>
              <Link to={`food/${food.slug}`} className="space-y-2 h-64 group ">
                <img
                  src={food.image}
                  alt={food.name}
                  className="h-44 w-full object-cover transform group-hover:scale-110 transition duration-500 ease-in-out rounded-xl"
                />
                <h4 className="font-bold">{food.name}</h4>
                <span className="price">{currencyFormat(food.price)}</span>
              </Link>
            </SwiperSlide>
          ))
      )}
    </Swiper>
  );
};

export default SliderContent;
