import { ArticleSlide, Breadcrumbs } from "@/components";
import MediaIntro from "@/components/blocks/media-intro/media-intro";
import { FC } from "react";

export const MediaView: FC = () => {
  return (
    <div className="main-margin">
      <section className="container">
        <Breadcrumbs mb="30px" />
      </section>
      <section>
        <MediaIntro />
      </section>
      <section className="container">
        <ArticleSlide />
      </section>
      <section className="container">
        <ArticleSlide />
      </section>
    </div>
  );
};

export default MediaView;
