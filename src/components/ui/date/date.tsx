import cn from "classnames";
import { Locale, format } from "date-fns";
import { ar, enUS, ru, tr } from "date-fns/locale";
import { useTranslation } from "next-i18next";
import { FC } from "react";

import { DateTimeProps } from "./date.props";

import styles from "./date.module.scss";

export const DateTime: FC<DateTimeProps> = ({ className, date, size = "sm", ...props }) => {
  const { i18n } = useTranslation();
  const { language } = i18n;

  // const locale = language === "ru" ? ru : language === "tr" ? tr : language === "ar" ? ar : enUS;

  const locales: { [key: string]: Locale } = { ru, tr, ar };
  const locale = locales[language] || enUS;

  return (
    <time
      className={cn(className, styles.date, {
        ["badge-text"]: size === "sm",
        ["text-md"]: size === "md",
      })}
      {...props}
    >
      {format(new Date(date), "dd MMMM yyyy", { locale })}
    </time>
  );
};
