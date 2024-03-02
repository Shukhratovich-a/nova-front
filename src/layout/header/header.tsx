import React, { useCallback, useContext, useEffect, useState } from "react";
import { useRouter } from "next/router";
import Link from "next/link";
import { useMediaQuery } from "react-responsive";
import cn from "classnames";

import { HeaderProps } from "./header.props";

import { SideBarContext } from "@/contexts/sidebar.context";

import { Navbar } from "../navbar/navbar";
import { Burger, Language, Logo, Search } from "@/components";

import { IconLogo, IconSearch } from "@/assets/icons";

import styles from "./header.module.scss";

export const Header: React.FC<HeaderProps> = ({ className, children, ...props }) => {
  const isBrowser = typeof window !== undefined;
  const scrollThreshold = 20;

  const { isOpen, setIsOpen } = useContext(SideBarContext);
  const [scrolled, setScrolled] = useState(false);
  const isTable = useMediaQuery({ maxWidth: 800 });
  const { pathname } = useRouter();

  const menuController = () => {
    if (setIsOpen) setIsOpen(!isOpen);
  };

  const handleScroll = useCallback(() => {
    if (!isBrowser) return;

    const isScrolled = window.scrollY > scrollThreshold;

    setScrolled(isScrolled);
  }, [isBrowser]);

  useEffect(() => {
    if (!isBrowser) return;

    return handleScroll();
  }, [handleScroll, isBrowser]);

  useEffect(() => {
    if (!isBrowser) return;

    window.addEventListener("scroll", handleScroll);

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, [handleScroll, isBrowser]);

  return (
    <header
      className={cn(className, styles.header, {
        [styles["header--home"]]: pathname === "/",
        [styles["header--scroll"]]: scrolled,
      })}
      {...props}
    >
      <div className="container">
        <div className={styles.wrap}>
          <Link className={styles.logo} href="/">
            <Logo color={scrolled || pathname === "/" ? "custom" : "default"} />
          </Link>

          {!isTable && <Navbar onClick={menuController} />}

          <div className={cn(styles.additions)}>
            {/* <IconSearch /> */}
            <Search />

            <Language />

            {isTable && <Burger isActive={false} onClick={menuController} />}
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;
