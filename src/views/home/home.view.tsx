import { useTranslation } from "next-i18next";
import { FC } from "react";
import { SwiperSlide } from "swiper/react";

import { HomeProps } from "./home.props";

import { ArticleSlide, CategoryCard, HomeIntro, PostCard, ProductCard } from "@/components";

export const HomeView: FC<HomeProps> = ({ banners, categories, certificates, posts, catalogs }) => {
  const { t } = useTranslation();

  //ставит ограничение на количество элементов
  // if (categories.length > 9) categories.length = 9;
  // if (certificates.length > 9) certificates.length = 9;
  // if (posts.length > 9) posts.length = 9;
  // if (catalogs.length > 9) catalogs.length = 9;

  return (
    <>
      <section>
        <HomeIntro banners={banners} />
      </section>

      {/* {!!categories.length && (
        <section className="container">
          <ArticleSlide page="category" title={t("products")}>
            {categories.length &&
              categories.map((category) => (
                <SwiperSlide key={category.id}>
                  <CategoryCard category={category} />
                </SwiperSlide>
              ))}
          </ArticleSlide>
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
          <ArticleSlide title={t("catalogs")}>
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
      )} */}
    </>
  );
};

export default HomeView;
