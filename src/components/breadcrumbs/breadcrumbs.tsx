import { FC } from "react";
import Link from "next/link";
import { useTranslation } from "next-i18next";
import cn from "classnames";

import { BreadcrumbsProps } from "./breadcrumbs.props";

import styles from "./breadcrumbs.module.scss";

export const Breadcrumbs: FC<BreadcrumbsProps> = ({ mb = "10px", urlList = [] }) => {
  const { t } = useTranslation();

  return (
    <nav className={styles.wrapper} style={{ marginBottom: mb }}>
      <ul className={styles.list}>
        <li className={styles.item}>
          <Link className={cn(styles.link, "nav-link-text", "color-accent")} href="/">
            <span>{t("menu.home")}</span>
          </Link>
        </li>

        {urlList.map(({ title, link }, index) => (
          <li className={styles.item} key={index}>
            <Link className={cn(styles.link, "nav-link-text", "color-accent")} href={link}>
              <span>{title}</span>
            </Link>
          </li>
        ))}
      </ul>
    </nav>
  );
};

export default Breadcrumbs;
