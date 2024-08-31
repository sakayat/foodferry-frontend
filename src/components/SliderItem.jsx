import React from "react";

const SliderItem = ({ item }) => {
  return (
    <div className="slider-content">
      <div className="grid grid-cols-12 gap-5">
        <div className="col-span-12 md:col-span-7 flex flex-col items-center md:items-start space-y-6">
          <span className="text-sm uppercase font-semibold">{item.text}</span>
          <h5 className="home-subtitle text-3xl text-center md:text-start">
            {item.sub_title}
          </h5>
          <h1 className="home-title text-5xl lg:text-8xl text-center md:text-start tracking-[0.5rem] uppercase font-bold">
            {item.title}
          </h1>
          <button className="order-now-btn">Order now!</button>
        </div>
        <div className="slider-image col-span-12 md:col-span-5 flex justify-end items-end text-end">
          <img
            src={item.image}
            alt=""
            className="w-96 md:w-full mx-auto md:ml-auto h-full"
          />
        </div>
      </div>
    </div>
  );
};

export default SliderItem;
