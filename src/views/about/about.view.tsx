import { FC } from "react";
import cn from "classnames";

import { AboutProps } from "./about.props";

import { AboutContent } from "@/components";

export const AboutView: FC<AboutProps> = ({ className, abouts, ...props }) => {
  return (
    <div className={cn("main-margin", "container", className)} {...props}>
      <section>
        <AboutContent abouts={abouts} />
      </section>
    </div>
  );
};

export default AboutView;
