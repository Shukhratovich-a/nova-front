import { FC } from "react";

import { HomeProps } from "./home.props";

import { ArticleSlide, HomeIntro, HomeCategories } from "@/components";

export const HomeView: FC<HomeProps> = ({ banners, categories }) => {
  return (
    <>
      <section>
        <HomeIntro banners={banners} />
      </section>

      <section className="container">
        <HomeCategories categories={categories} />
      </section>

      <section className="container">
        <ArticleSlide />
      </section>
    </>
  );
};

export default HomeView;
