import React, { useEffect, useState } from "react";

import cn from "classnames";
import cnBind from "classnames/bind";
import Link from "next/link";
import { HeaderProps } from "./Header.props";

import { IconSearch } from "@/assets/icons";
import LogoBlue from "@/assets/images/Logo-blue.png";
import LogoWhite from "@/assets/images/Logo-white.png";
import Image from "next/image";
import { useRouter } from "next/router";
import styles from "./header.module.scss";
import Navbar from "./navbar/navbar";
const cx = cnBind.bind(styles);

export const Header: React.FC<HeaderProps> = ({ className, children, ...rest }) => {
  const [burgerActive, setBurgerActive] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  // style controller
  const { pathname } = useRouter();
  const headerStyleHome = pathname === "/" && styles.headerHome;
  const getLogoByPath = pathname === "/" || scrolled || burgerActive ? LogoWhite : LogoBlue;

  const menuController = () => {
    setBurgerActive(!burgerActive);
  };

  // scroll controller
  useEffect(() => {
    const handleScroll = () => {
      // Проверьте, прокручена ли страница больше, чем scrollThreshold
      const scrollThreshold = 20;
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
    <header className={cn(className, styles.wrapper, headerStyleHome, scrolled ? styles.scrolled : "")} {...rest}>
      <div className="container">
        <div className={styles.wrap}>
          <Link className={styles.logo} href="/">
            <Image src={getLogoByPath} alt="nova logo" width={220} height={62} />
          </Link>
          <Navbar onClick={menuController} active={burgerActive} />
          <div className={cn(styles.additions, cx({ active: burgerActive }))}>
            <IconSearch />
            <div>
              <select name="" id="">
                <option value="ru">uz</option>
                <option value="en">en</option>
                <option value="kr">ru</option>
              </select>
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
