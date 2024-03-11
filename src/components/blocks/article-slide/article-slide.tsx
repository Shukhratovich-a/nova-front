import { IconArrowRight } from "@/assets/icons";
import { ProductCard, Button, Slider } from "@/components";
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
      <Slider mobile={true} width={1075} type="dynamic" quantity={3}></Slider>
      <div className={styles["button-mobile"]}>
        <Button className={"color-white"} appearance="yellow">
          Показать все <IconArrowRight />
        </Button>
      </div>
    </div>
  );
};

export default ArticleSlide;
