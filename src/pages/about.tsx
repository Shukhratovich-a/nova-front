import Icon from "@/components/icon/icon-list";
import { FC } from "react";

const About: FC = () => {
  return (
    <div>
      <h1>about</h1>
      <h2>h2</h2>
      <button className="button button-blue">button</button>
      <button className="button button-yellow">button</button>
      <button className="button button-border">button</button>
      <Icon name="arrow" className="color-yellow" />
    </div>
  );
};

export default About;
