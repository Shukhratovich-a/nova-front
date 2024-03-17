import { FC } from "react";

import { HomeProps } from "./home.props";

import { ArticleSlide, HomeCategories, HomeIntro, ProductCard } from "@/components";
import { SwiperSlide } from "swiper/react";

export const HomeView: FC<HomeProps> = ({ banners, categories, certificate }) => {
  return (
    <>
      <section>
        <HomeIntro banners={banners} />
      </section>

      <section className="container">
        <HomeCategories categories={categories} />
      </section>

      <section className="container">
        <ArticleSlide title="Сертификаты">
          {certificate.map((item) => {
            return (
              <SwiperSlide key={item.id}>
                <ProductCard card="certificate" product={item} />
              </SwiperSlide>
            );
          })}
        </ArticleSlide>
      </section>
    </>
  );
};

export default HomeView;
