import Slider from "@/components/slider/slider";
import cn from "classnames";
import { FC } from "react";
import { SwiperSlide } from "swiper/react";
import styles from "./intro.module.scss";
import { IntroProps } from "./intro.props";
import Image from "next/image";

const Intro: FC<IntroProps> = (props) => {
  const { title, subtitle, caption } = props;

  return (
    <Slider type={"full-screen"}>
      <SwiperSlide>
        <Image className="swiper-slide-image" width={1200} height={800} alt="" src="https://picsum.photos/1200/900" />
        <div className={cn(styles.wrap, "container")}>
          <div className={styles.content}>
            <h1 className={cn("color-white")}>Nova – секрет беспроблемной кухни</h1>
            <p className={cn("subtitle-lg color-white")}>
              Внедрение инновационных сантехнических решений для вашего удобства
            </p>
            <p className={cn("subtitle-md color-white")}>Продукция Nova поставляется в 61 страну Мира</p>
          </div>
        </div>
      </SwiperSlide>
      <SwiperSlide>
        <Image className="swiper-slide-image" width={1200} height={800} alt="" src="https://picsum.photos/1200/900" />
        <div className={cn(styles.wrap, "container")}>
          <div className={styles.content}>
            <h1 className={cn("color-white")}>Nova – секрет беспроблемной кухни</h1>
            <p className={cn("subtitle-lg color-white")}>
              Внедрение инновационных сантехнических решений для вашего удобства
            </p>
            <p className={cn("subtitle-md color-white")}>Продукция Nova поставляется в 61 страну Мира</p>
          </div>
        </div>
      </SwiperSlide>
      <SwiperSlide>
        <Image className="swiper-slide-image" width={1200} height={800} alt="" src="https://picsum.photos/1200/900" />
        <div className={cn(styles.wrap, "container")}>
          <div className={styles.content}>
            <h1 className={cn("color-white")}>Nova – секрет беспроблемной кухни</h1>
            <p className={cn("subtitle-lg color-white")}>
              Внедрение инновационных сантехнических решений для вашего удобства
            </p>
            <p className={cn("subtitle-md color-white")}>Продукция Nova поставляется в 61 страну Мира</p>
          </div>
        </div>
      </SwiperSlide>
    </Slider>
  );
};

export default Intro;
