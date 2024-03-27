import { FC } from "react";
import { useTranslation } from "next-i18next";
import { SwiperSlide } from "swiper/react";

import { HomeProps } from "./home.props";

import { ArticleSlide, HomeCategories, HomeIntro, PostCard, ProductCard } from "@/components";

export const HomeView: FC<HomeProps> = ({ banners, categories, certificates, posts, catalogs }) => {
  const { t } = useTranslation();

  return (
    <>
      <section>
        <HomeIntro banners={banners} />
      </section>

      {!!categories.length && (
        <section className="container">
          <HomeCategories categories={categories} />
        </section>
      )}

      {!!certificates.length && (
        <section className="container">
          <ArticleSlide anchor="certificate" title={t("certificates")}>
            {certificates.map((item) => {
              return (
                <SwiperSlide key={item.id}>
                  <ProductCard card="certificate" product={item} />
                </SwiperSlide>
              );
            })}
          </ArticleSlide>
        </section>
      )}

      {!!catalogs.length && (
        <section className="container">
          <ArticleSlide title={t("catalog")}>
            {catalogs.map((item) => {
              return (
                <SwiperSlide key={item.id}>
                  <ProductCard card="catalog" product={item} />
                </SwiperSlide>
              );
            })}
          </ArticleSlide>
        </section>
      )}

      {!!posts.length && (
        <section className="container">
          <ArticleSlide title={t("news")} page="news">
            {posts.map((item) => {
              return (
                <SwiperSlide key={item.id}>
                  <PostCard post={item} />
                </SwiperSlide>
              );
            })}
          </ArticleSlide>
        </section>
      )}
    </>
  );
};

export default HomeView;
