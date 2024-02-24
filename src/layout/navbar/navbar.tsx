import { FC } from "react";
import Link from "next/link";
import cn from "classnames";

import { NavbarProps } from "./navbar.props";

import styles from "./navbar.module.scss";

export const Navbar: FC<NavbarProps> = ({ className, ...props }) => {
  return (
    <nav className={cn(styles.nav, className)} {...props}>
      <ul className={styles.list}>
        <li className={styles.item}>
          <Link className={cn(styles.link, "nav-link-text")} href="/">
            Главная
          </Link>
        </li>
        <li className={styles.item}>
          <Link className={cn(styles.link, "nav-link-text")} href="/about">
            О нас
          </Link>
        </li>
        <li className={styles.item}>
          <Link className={cn(styles.link, "nav-link-text")} href="/product">
            Товары
          </Link>
        </li>
        <li className={styles.item}>
          <Link className={cn(styles.link, "nav-link-text")} href="/media">
            Медиа
          </Link>
        </li>
        <li className={styles.item}>
          <Link className={cn(styles.link, "nav-link-text")} href="/news">
            Новости
          </Link>
        </li>
        <li className={styles.item}>
          <Link className={cn(styles.link, "nav-link-text")} href="/contact">
            Контакты
          </Link>
        </li>
      </ul>
    </nav>
  );
};

export default Navbar;
