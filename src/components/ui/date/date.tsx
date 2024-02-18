import { FC } from "react";
import cn from "classnames";
import { format } from "date-fns";
import { ar, enUS, ru, tr } from "date-fns/locale";
import { useTranslation } from "next-i18next";

import { DateProps } from "./date.props";

import styles from "./date.module.scss";

export const Date: FC<DateProps> = ({ className, date, size = "sm", ...props }) => {
  const { i18n } = useTranslation();
  const { language } = i18n;

  const locale = language === "ru" ? ru : language === "tr" ? tr : language === "ar" ? ar : enUS;

  return (
    <time
      className={cn(className, styles.date, {
        ["badge-text"]: size === "sm",
        ["text-md"]: size === "md",
      })}
      {...props}
    >
      {format(date, "dd MMMM yyyy", { locale })}
    </time>
  );
};
