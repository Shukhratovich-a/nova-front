import { FC } from "react";
import Link from "next/link";
import cn from "classnames";
import { useTranslation } from "next-i18next";

import { ShowLinkProps } from "./show-link.props";

import { IconArrowRight } from "@/assets/icons";

import styles from "./show-link.module.scss";

export const ShowLink: FC<ShowLinkProps> = ({ className, children, ...props }) => {
  const { t, i18n } = useTranslation();
  const isArabic = i18n.language === "ar";

  return (
    <Link className={cn(className, styles.link, "color-accent", { [styles.rtl]: isArabic })} {...props}>
      <p>{children ? children : t("show")}</p> <IconArrowRight />
    </Link>
  );
};
