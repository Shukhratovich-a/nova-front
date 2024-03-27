import cn from "classnames";
import { useTranslation } from "next-i18next";
import Link from "next/link";
import { FC } from "react";

import { NavbarProps } from "./navbar.props";

import { headerMenu } from "@/helpers/menu.helper";

import { useRouter } from "next/router";
import styles from "./navbar.module.scss";

export const Navbar: FC<NavbarProps> = ({ className, headerIsScrolled, ...props }) => {
  const { t } = useTranslation();
  const { pathname } = useRouter();

  const navbarClasses = cn(className, styles.nav, {
    [styles["nav-home"]]: pathname === "/",
    [styles["nav-scroll"]]: headerIsScrolled,
  });

  return (
    <nav className={navbarClasses} {...props}>
      <ul className={styles.list}>
        {headerMenu.length &&
          headerMenu.map((item) => (
            <li className={cn(styles.item, { [styles["item-active"]]: pathname === item.route })} key={item.id}>
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
