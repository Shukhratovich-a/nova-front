import { Breadcrumbs, NewsItem } from "@/components";
import { FC } from "react";

export const NewsItemView: FC = () => {
  return (
    <div className="main-margin container">
      <section>
        <Breadcrumbs mb="30px" />
      </section>
      <section>
        <NewsItem />
      </section>
    </div>
  );
};

export default NewsItemView;
