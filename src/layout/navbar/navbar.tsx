import { FC } from "react";
import Link from "next/link";
import { useTranslation } from "next-i18next";
import cn from "classnames";

import { NavbarProps } from "./navbar.props";

import { menu } from "@/helpers/menu.helper";

import styles from "./navbar.module.scss";

export const Navbar: FC<NavbarProps> = ({ className, ...props }) => {
  const { t } = useTranslation();

  return (
    <nav className={cn(styles.nav, className)} {...props}>
      <ul className={styles.list}>
        {menu.length &&
          menu.map((item) => (
            <li className={styles.item} key={item.id}>
              <Link className={cn(styles.link, "nav-link-text")} href={item.route}>
                {t(item.title)}
              </Link>
            </li>
          ))}
      </ul>
    </nav>
  );
};

export default Navbar;
