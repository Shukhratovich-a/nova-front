import { FC } from "react";

import { HomeProps } from "./home.props";

import { ArticleSlide, HomeIntro, HomeProduct } from "@/components";

export const HomeView: FC<HomeProps> = ({ banners }) => {
  return (
    <>
      <section>
        <HomeIntro banners={banners} />
      </section>

      <section className="container">
        <HomeProduct />
      </section>

      <section className="container">
        <ArticleSlide />
      </section>
    </>
  );
};

export default HomeView;
