import { FC } from "react";

// Swiper
import { Swiper } from "swiper/react";

import NewsCard from "../cards/news/news-card";
import { SliderProps } from "./slider.props";
import { getSwiperConfig } from "./swiper.config";

const Slider: FC<SliderProps> = ({ type, quantity, width, children, ...rest }) => {
  // className="swiper-slide-image"

  return <Swiper {...getSwiperConfig({ type, quantity, width })}>{children}</Swiper>;
};

export default Slider;
