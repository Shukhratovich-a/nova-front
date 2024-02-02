import { IconArrowRight } from "@/assets/icons";
import Button from "@/components/button/button";
import ArticleCard from "@/components/cards/article/article-card";
import Slider from "@/components/slider/slider";
import cn from "classnames";
import { FC } from "react";
import { SwiperSlide } from "swiper/react";
import styles from "./article-slide.module.scss";
import { ArticleSlideProps } from "./article-slide.props";

export const ArticleSlide: FC<ArticleSlideProps> = ({ className, children }) => {
  return (
    <div className={cn(styles.wrapper, className)}>
      <div className={styles.content}>
        <h2 className="color-accent">Видеоинструкция по монтажу</h2>
        <Button className="color-white" appearance="yellow">
          Показать все <IconArrowRight />
        </Button>
      </div>
      <Slider mobile={true} width={1075} type="dynamic" quantity={3}>
        <SwiperSlide>
          <ArticleCard productCode={5190} text={""} imageUrl={""} link={""} />
        </SwiperSlide>
        <SwiperSlide>
          <ArticleCard productCode={5190} text={""} imageUrl={""} link={""} />
        </SwiperSlide>
        <SwiperSlide>
          <ArticleCard productCode={5190} text={""} imageUrl={""} link={""} />
        </SwiperSlide>
        <SwiperSlide>
          <ArticleCard productCode={5190} text={""} imageUrl={""} link={""} />
        </SwiperSlide>
        <SwiperSlide>
          <ArticleCard productCode={5190} text={""} imageUrl={""} link={""} />
        </SwiperSlide>
        <SwiperSlide>
          <ArticleCard productCode={5190} text={""} imageUrl={""} link={""} />
        </SwiperSlide>
      </Slider>
      <Button className={cn(styles['button-mobile'],"color-white")} appearance="yellow">
        Показать все <IconArrowRight />
      </Button>
    </div>
  );
};

export default ArticleSlide;
