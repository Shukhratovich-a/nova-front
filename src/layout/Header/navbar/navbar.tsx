import cn from "classnames";
import Link from "next/link";
import { FC } from "react";
import styles from "./navbar.module.scss";
import { NavbarProps } from "./navbar.props";
import cnBind from "classnames/bind";

const cx = cnBind.bind(styles);

const Navbar: FC<NavbarProps> = ({ className, active, onClick }) => {
  const classActive = active ? cx({ active: true }) : "";

  return (
    <nav onClick={onClick} className={cn(styles.nav, "color-white", className, classActive)}>
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
            Кантакты
          </Link>
        </li>
      </ul>
    </nav>
  );
};

export default Navbar;
