import React, { useEffect, useState } from "react";

import cn from "classnames";
import cnBind from "classnames/bind";
import Link from "next/link";
import { HeaderProps } from "./Header.props";

import { IconArrowBottom, IconSearch } from "@/assets/icons";
import Image from "next/image";
import styles from "./header.module.scss";
import Navbar from "./navbar/navbar";

const cx = cnBind.bind(styles);

export const Header: React.FC<HeaderProps> = ({ className, children, ...rest }) => {
  const [burgerActive, setBurgerActive] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  const menuController = () => {
    setBurgerActive(!burgerActive);
  };

  // scroll controller
  useEffect(() => {
    console.log("scrolling");
    const handleScroll = () => {
      // Проверьте, прокручена ли страница больше, чем scrollThreshold
      const scrollThreshold = 200;
      const isScrolled = window.scrollY > scrollThreshold;

      // Обновите состояние только если произошли изменения
      if (isScrolled !== scrolled) {
        setScrolled(isScrolled);
      }
    };

    // Добавьте обработчик события прокрутки
    window.addEventListener("scroll", handleScroll);

    // Уберите обработчик события при размонтировании компонента
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, [scrolled]);

  return (
    <header className={cn(className, styles.wrapper, scrolled ? styles.scrolled : "")} {...rest}>
      <div className="container">
        <div className={styles.wrap}>
          <Link className={styles.logo} href="/">
            <Image src={""} alt="nova logo" width={220} height={62} />
          </Link>
          <Navbar onClick={menuController} active={burgerActive} />
          <div className={cn(styles.additions, "color-white")}>
            <IconSearch />
            <div>
              ru
              <IconArrowBottom />
            </div>
          </div>
          <button className={cn(styles.burger, burgerActive && cx({ active: true }))} onClick={menuController}>
            {/* ▤ */}
            <span></span>
          </button>
        </div>
      </div>
    </header>
  );
};

export default Header;
