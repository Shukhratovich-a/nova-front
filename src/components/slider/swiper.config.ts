import { Autoplay, Pagination } from "swiper/modules";
import { IBreakpoints, IGetBreakpoints, SliderProps } from "./slider.props";

const getBreakpoints = ({ mobile, quantity, width }: IGetBreakpoints) => {
  // calculate breakpoint
  const minimalWidth = [0, 800, 560, 450][quantity - 1 && 3] + (1440 - width);
  const mobileBreakpoints = {
    550: {
      slidesPerView: 2,
      slidesPerGroup: 2,
    },
  };
  const breakpointCount = quantity - 1;

  const breakpointWidth = (1440 - minimalWidth) / breakpointCount;

  const breakpoints: IBreakpoints = {
    0: {
      slidesPerView: 1,
      slidesPerGroup: 1,
    },
  };

  // add breakpoint
  for (let i = 0; i < quantity - 1; i++) {
    const breakpointKey = 1440 - breakpointWidth * (i + 1);
    const elementCount = quantity - i;

    breakpoints[breakpointKey] = {
      slidesPerView: elementCount,
      slidesPerGroup: elementCount,
    };
  }

  return mobile ? { ...breakpoints, ...mobileBreakpoints } : breakpoints;
};

export const getSwiperConfig = ({ mobile, type, quantity = 1, width = 1440, className }: SliderProps) => {
  // create Swiper attributes
  const singleSwiperAttr = {
    loop: true,
    slidesPerView: 1,
    slidesPerGroup: 1,
    className: `mySwiper swiper-full-screen ${className}`,
    // autoplay: { delay: 5000 },
  };

  const multipleSwiperAttr = {
    slidesPerView: quantity,
    slidesPerGroup: quantity,
    spaceBetween: 20,
    className: `mySwiper swiper-dynamic ${className}`,
    breakpoints: {},
  };

  if (quantity > 1) {
    const breakpoints = getBreakpoints({ mobile, quantity, width });
    multipleSwiperAttr.breakpoints = breakpoints;
  }

  const swiperAttr = {
    speed: 600,
    pagination: { clickable: true },
    modules: [Pagination, Autoplay],
    ...(type === "dynamic" ? multipleSwiperAttr : singleSwiperAttr),
  };

  return swiperAttr;
};
