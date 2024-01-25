import { FC, HTMLAttributes } from "react";
import { arrow, facebook, search, vk, youtube } from "./icons";

const iconList: { [key: string]: JSX.Element } = {
  arrow: arrow,
  search: search,
  facebook: facebook,
  youtube: youtube,
  vk: vk,
};

interface IconProps extends HTMLAttributes<HTMLDivElement> {
  name: string; //keyof typeof iconList;
}

const Icon: FC<IconProps> = ({ name, className, ...rest }: IconProps) => {
  return (
    (
      <div className={className} {...rest}>
        {iconList[name]}
      </div>
    ) || null
  );
};

export default Icon;
