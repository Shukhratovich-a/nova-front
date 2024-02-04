import { IconArrowBottom } from "@/assets/icons";
import { Button, Slider } from "@/components";
import cn from "classnames";
import Image from "next/image";
import { FC } from "react";
import { SwiperSlide } from "swiper/react";
import styles from "./product-intro.module.scss";
import { ProductIntroProps } from "./product-intro.props";

export const ProductIntro: FC<ProductIntroProps> = ({ className }) => {
  return (
    <>
      <div className={cn(styles.wrapper, className)}>
        <div className={styles.content}>
          <div className={styles.text}>
            <h1 className="color-accent">1010</h1>
            <h2>Сифон для умывальника с механизмом click-cluck</h2>
            <p className={cn(styles.description, "subtitle-md", "custom-scrollbar")}>
              Sed eu elementum ex. Quisque at venenatis sapien. Nulla facilisi. Proin sit amet placerat urna. Praesent
              sit amet justo a sapien finibus varius. Ut non sodales erat. Suspendisse lacinia placerat mi a rhoncus.
              Mauris eget vehicula massa, dignissim gravida mauris. Cras ac dui commodo augue elementum sollicitudin.
              Lorem ipsum dolor, sit amet consectetur adipisicing elit. Ipsa sunt voluptatem eligendi hic incidunt eaque
              laudantium ducimus numquam aperiam accusamus, explicabo praesentium cum necessitatibus quo fugit sapiente
              tempore facilis perspiciatis.
            </p>
          </div>
          <div className={styles.buttons}>
            <Button appearance="yellow">
              Скачать <IconArrowBottom />
            </Button>
            <Button appearance="outlined">Смотреть</Button>
          </div>
        </div>
        {/* <div className={styles.gallery}> */}
          <Slider type="dynamic" quantity={1}>
            <SwiperSlide>
              <Image
                className={cn(styles.image, "swiper-slide-image")}
                width={800}
                height={500}
                alt=""
                src="https://picsum.photos/800/500"
              />
            </SwiperSlide>
            <SwiperSlide>
              <Image
                className={cn(styles.image, "swiper-slide-image")}
                width={800}
                height={500}
                alt=""
                src="https://picsum.photos/800/500"
              />
            </SwiperSlide>
            <SwiperSlide>
              <Image
                className={cn(styles.image, "swiper-slide-image")}
                width={800}
                height={500}
                alt=""
                src="https://picsum.photos/800/500"
              />
            </SwiperSlide>
          </Slider>
        {/* </div> */}
      </div>
    </>
  );
};

export default ProductIntro;
