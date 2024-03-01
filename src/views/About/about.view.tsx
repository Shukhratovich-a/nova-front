import { Breadcrumbs } from "@/components";
import AboutContent from "@/components/blocks/about-content/about-content";
import { FC } from "react";

export const AboutView: FC = (props) => {
  return (
    <div className="main-margin container">
      <section>
        <Breadcrumbs mb="30px" urlList={['about']}/>
      </section>
      <section>
        <AboutContent />
      </section>
    </div>
  );
};

export default AboutView;
