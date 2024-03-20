import { FC } from "react";
import cn from "classnames";

import { AboutProps } from "./about.props";

import { Breadcrumbs, AboutContent } from "@/components";

export const AboutView: FC<AboutProps> = ({ className, abouts, ...props }) => {
  return (
    <div className={cn("main-margin", "container", className)} {...props}>
      <section>
        <Breadcrumbs mb="30px" urlList={["about"]} />
      </section>

      <section>
        <AboutContent abouts={abouts} />
      </section>
    </div>
  );
};

export default AboutView;
