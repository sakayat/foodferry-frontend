import React, { useEffect } from "react";
import SectionTitle from "./SectionTitle";
import SliderContent from "./SliderContent";

const HomeChefsFoodItem = ({data}) => {

  return (
    <div className="pt-14 relative">
      <div className="xl:container m-auto px-8">
        <SectionTitle title={"HomeChefs"} sliderId="homechefs" tag="homechefs" />
        <SliderContent data={data} tag_name="homechefs" sliderId="homechefs" />
      </div>
    </div>
  )
}

export default HomeChefsFoodItem