import { FC } from "react";
import { arrow, facebook, search, vk, youtube } from "./icons";

const iconList: { [key: string]: JSX.Element } = {
  arrow: arrow,
  search: search,
  facebook: facebook,
  youtube: youtube,
  vk: vk,
};


interface IconProps {
  name: string;//keyof typeof iconList;
}

const Icon: FC<IconProps> = ({ name }: IconProps) => {
  return iconList[name] || null;
};

export default Icon;
