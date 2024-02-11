import { Breadcrumbs } from "@/components";
import NewsList from "@/components/blocks/news-list/news-list";
import { FC } from "react";

export const NewsView: FC = () => {
  return (
    <div className="main-margin container">
      <section>
        <Breadcrumbs mb="30px" />
      </section>
      <section>
        <NewsList />
      </section>
    </div>
  );
};

export default NewsView;
