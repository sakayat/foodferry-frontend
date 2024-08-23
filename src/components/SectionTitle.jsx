import { ArrowLeft, ArrowRight } from "lucide-react";
import { useRef } from "react";
import { Link } from "react-router-dom";

const SectionTitle = ({ title, sliderId }) => {
  return (
    <div className="py-5 flex justify-between items-center relative">
      <h1 className="text-2xl md:text-4xl font-semibold">{title}</h1>
      <div className="buttons flex items-center gap-5">
        <Link to={"/"} className="font-bold">
          See all
        </Link>
        <div className="slider-button">
          <button
            className={`swiper-button-prev button-prev-${sliderId} bg-gray-300 w-8 h-8 rounded-full`}
          >
            <ArrowLeft />
          </button>
          <button
            className={`swiper-button-next button-next-${sliderId} bg-gray-300 w-8 h-8 rounded-full`}
          >
            <ArrowRight />
          </button>
        </div>
      </div>
    </div>
  );
};

export default SectionTitle;
