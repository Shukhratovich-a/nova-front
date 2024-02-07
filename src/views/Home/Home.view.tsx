import { ArticleSlide, HomeIntro, HomeProduct } from "@/components";
import { IBanner } from "@/types/banner.interface";
import { FC } from "react";

export const HomeView: FC<{ banner: IBanner[] }> = ({ banner }) => {
  return (
    <>
      <section>
        <HomeIntro banner={banner} />
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
