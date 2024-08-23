import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import "swiper/css";
import "swiper/css/navigation";
import { Navigation, Mousewheel, Keyboard } from "swiper/modules";
import { Link } from "react-router-dom";
import { currencyFormat } from "../lib/utils";
import { useRef } from "react";
import { Swiper, SwiperSlide } from "swiper/react";

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
      {data
        ?.filter((item) => item.tags.find((tag) => tag.name == tag_name))
        ?.map((food) => (
          <SwiperSlide key={food.id}>
            <Link to={`food/${food.slug}`} className="space-y-2 h-64">
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
  );
};

export default SliderContent;
