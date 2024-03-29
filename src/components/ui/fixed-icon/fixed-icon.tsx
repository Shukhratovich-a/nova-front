import { FC } from "react";

import { IconVk } from "@/assets/icons";

import styles from "./fixed-icon.module.scss";

export const FixedIcon: FC<{ url?: string }> = ({ url }) => {
  const handleNavigate = (url: string) => {
    window.open(url, "_blank");
  };

  return (
    <div className={styles.wrapper}>
      <div onClick={() => handleNavigate(url || "https://vk.com/novaplastik")} className={styles.icon}>
        <IconVk />
      </div>
    </div>
  );
};

export default FixedIcon;
