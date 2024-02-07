import { FC, useState } from "react";
import cn from "classnames";
import styles from "./tabs.module.scss";

export const Tabs: FC = () => {
  const [toggle, setToggle] = useState(1);

  const updateToggle = () => {};

  return (
    <div className={styles.wrapper}>
      <ul className={cn(styles.tabs, "custom-scrollbar-x")}>
        <li className={cn(styles["tabs-active"], "nav-link-text")}>Технические ХАРАКТЕРИСТИКИ</li>
        <li className={cn("nav-link-text")}>ПРИМЕНЕНИЕ</li>
        <li className={cn("nav-link-text")}>ФУНКЦИИ</li>
        <li className={cn("nav-link-text")}>ЛОГИСТИЧЕСКАЯ ИНФОРМАЦИЯ</li>
        <li className={cn("nav-link-text")}>ОБЪЕМ ПОСТАВКИ</li>
      </ul>
      <ul className={styles.content}>
        <li className="text-md">
          <p>КОЛИЧЕСТВО В ЯЩИКЕ</p>
          <p>5</p>
        </li>
        <li className="text-md">
          <p>РАЗМЕРЫ ЯЩИКА</p>
          <p>0,153 m³</p>
        </li>
        <li className="text-md">
          <p>ВЕС ЯЩИКА</p>
          <p>15,50 kg.</p>
        </li>
      </ul>
    </div>
  );
};

export default Tabs;
