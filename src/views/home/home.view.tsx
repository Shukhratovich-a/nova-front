import { FC } from "react";

import { HomeProps } from "./home.props";

import { ArticleSlide, HomeCategories, HomeIntro, PostCard, ProductCard } from "@/components";
import { SwiperSlide } from "swiper/react";

export const HomeView: FC<HomeProps> = ({ banners, categories, certificates, posts }) => {
  return (
    <>
      <section>
        <HomeIntro banners={banners} />
      </section>

      <section className="container">
        <HomeCategories categories={categories} />
      </section>

      <section className="container">
        <ArticleSlide anchor="certificate" title="Сертификаты">
          {certificates.map((item) => {
            return (
              <SwiperSlide key={item.id}>
                <ProductCard card="certificate" product={item} />
              </SwiperSlide>
            );
          })}
        </ArticleSlide>
      </section>
      <section className="container">
        {/* <ArticleSlide anchor="catalog" title="catalog">
          {catalog.map((item) => {
            return (
              <SwiperSlide key={item.id}>
                <ProductCard card="catalog" product={item} />
              </SwiperSlide>
            );
          })}
        </ArticleSlide> */}
      </section>
      <section className="container">
        <ArticleSlide anchor="certificate" title="Сертификаты">
          {posts.map((item) => {
            return (
              <SwiperSlide key={item.id}>
                <PostCard post={item} />
              </SwiperSlide>
            );
          })}
        </ArticleSlide>
      </section>
    </>
  );
};

export default HomeView;
