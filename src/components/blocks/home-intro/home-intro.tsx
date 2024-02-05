import { Slider } from "@/components";
import cn from "classnames";
import Image from "next/image";
import { FC } from "react";
import { SwiperSlide } from "swiper/react";
import styles from "./home-intro.module.scss";
import { HomeIntroProps } from "./home-intro.props";

export const HomeIntro: FC<HomeIntroProps> = (props) => {
  // const { title, subtitle, caption } = props;

  return (
    <div className={styles.wrapper}>
      <Slider type={"full-screen"}>
        <SwiperSlide>
          <Image
            className="swiper-slide-image"
            width={1200}
            height={800}
            alt=""
            src="https://picsum.photos/2600/1500"
          />
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
          <Image
            className="swiper-slide-image"
            width={1200}
            height={800}
            alt=""
            src="https://picsum.photos/2600/1500"
          />
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
          <Image
            className="swiper-slide-image"
            width={1200}
            height={800}
            alt=""
            src="https://picsum.photos/2600/1500"
          />
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
    </div>
  );
};

export default HomeIntro;
