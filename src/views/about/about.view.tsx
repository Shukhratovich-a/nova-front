import { FC } from "react";

import { Breadcrumbs, AboutContent } from "@/components";

export const AboutView: FC = (props) => {
  return (
    <div className="main-margin container">
      <section>
        <Breadcrumbs mb="30px" urlList={["about"]} />
      </section>
      <section>
        <AboutContent />
      </section>
    </div>
  );
};

export default AboutView;
