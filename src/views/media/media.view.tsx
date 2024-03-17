import { FC } from "react";

import { ArticleSlide, Breadcrumbs, MediaIntro } from "@/components";

export const MediaView: FC = () => {
  return (
    <div className="main-margin">
      <section className="container">
        <Breadcrumbs mb="30px" urlList={["media"]} />
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
