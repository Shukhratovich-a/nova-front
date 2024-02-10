import { Breadcrumbs } from "@/components";
import { FC } from "react";

export const NewsView: FC = () => {
  return (
    <div className="main-margin">
      <section className="container">
        <Breadcrumbs mb="30px" />
      </section>
    </div>
  );
};

export default NewsView;
