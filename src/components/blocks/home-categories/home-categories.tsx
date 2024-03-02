import cn from "classnames";
import { useTranslation } from "next-i18next";
import Link from "next/link";
import { FC } from "react";

import { HomeCategoriesProps } from "./home-categories.props";

import { Button, CategoryCard, Slider } from "@/components";

import styles from "./home-categories.module.scss";
import { SwiperSlide } from "swiper/react";

export const HomeCategories: FC<HomeCategoriesProps> = ({ className, categories, ...props }) => {
  const { t } = useTranslation();

  return (
    <div className={cn(styles.wrapper, className)} {...props}>
      <h2>{t("products")}</h2>

      {/* <ul className={cn(styles.list)}>
        {categories.length &&
          categories.map((category) => (
            <li className={cn(styles.item)} key={category.id}>
              <CategoryCard category={category} />
            </li>
          ))}
      </ul> */}
      <Slider mobile={true} type="dynamic" quantity={5}>
        {categories.length &&
          categories.map((category) => (
            <SwiperSlide className={cn(styles.item)} key={category.id}>
              <CategoryCard category={category} />
            </SwiperSlide>
          ))}
      </Slider>

      <div className={cn(styles.button)}>
        <Link href="/category">
          <Button>{t("show-more")}</Button>
        </Link>
      </div>
    </div>
  );
};

export default HomeCategories;
