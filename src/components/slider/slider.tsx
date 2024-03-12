import { FC, useRef } from "react";

// Swiper
import { Swiper } from "swiper/react";

import { SliderProps } from "./slider.props";
import { getSwiperConfig } from "./swiper.config";

export const Slider: FC<SliderProps> = ({ mobile = false, type, quantity, width, children, className, ...rest }) => {
  // className="swiper-slide-image"
  const { current: swiperConfig } = useRef(getSwiperConfig({ mobile, type, quantity, width, className }));

  return (
    <Swiper {...swiperConfig} style={{ maxWidth: width }}>
      {children}
    </Swiper>
  );
};
export default Slider;
