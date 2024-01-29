import { Autoplay, Pagination } from "swiper/modules";
import { IBreakpoints, IGetBreakpoints, SliderProps } from "./slider.props";

const getBreakpoints = ({ quantity, width }: IGetBreakpoints) => {
  // calculate breakpoint
  const minimalWidth = [0, 800, 560, 450][quantity - 1];
  const breakpointCount = quantity - 1;

  const breakpointWidth = (width - minimalWidth) / breakpointCount;

  const breakpoints: IBreakpoints = {
    0: {
      slidesPerView: 1,
      slidesPerGroup: 1,
    },
  };

  // add breakpoint
  for (let i = 0; i < quantity - 1; i++) {
    const breakpointKey = width - breakpointWidth * (i + 1);
    const elementCount = quantity - i;

    breakpoints[breakpointKey] = {
      slidesPerView: elementCount,
      slidesPerGroup: elementCount,
    };
  }

  return breakpoints;
};

export const getSwiperConfig = ({ type, quantity = 1, width = 1440 }: SliderProps) => {
  // create Swiper attributes
  const singleSwiperAttr = {
    slidesPerView: 1,
    slidesPerGroup: 1,
    className: "mySwiper swiper-full-screen",
    // autoplay: { delay: 5000 },
  };

  const multipleSwiperAttr = {
    slidesPerView: quantity,
    slidesPerGroup: quantity,
    spaceBetween: 20,
    className: "mySwiper swiper-dynamic",
    breakpoints: {},
  };

  if (quantity > 1) {
    const breakpoints = getBreakpoints({ quantity, width });
    multipleSwiperAttr.breakpoints = breakpoints;
  }

  const swiperAttr = {
    speed: 1200,
    loop: true,
    pagination: { clickable: true },
    modules: [Pagination, Autoplay],
    ...(type === "dynamic" ? multipleSwiperAttr : singleSwiperAttr),
  };

  return swiperAttr;
};
