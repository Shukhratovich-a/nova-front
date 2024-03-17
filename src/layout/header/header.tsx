import cn from "classnames";
import Link from "next/link";
import { useRouter } from "next/router";
import React, { useCallback, useContext, useEffect, useState } from "react";
import { useMediaQuery } from "react-responsive";

import { HeaderProps } from "./header.props";

import { SideBarContext } from "@/contexts/sidebar.context";

import { Burger, Language, Logo, Search } from "@/components";
import { Navbar } from "../navbar/navbar";

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

  const headerClasses = cn(className, styles.header, {
    [styles["header--home"]]: pathname === "/",
    [styles["header--scroll"]]: scrolled,
  });

  return (
    <header className={headerClasses} {...props}>
      <div className="container">
        <div className={styles.wrap}>
          <Link href="/">
            <Logo className={styles.logo} color={scrolled || pathname === "/" ? "custom" : "default"} />
          </Link>

          {!isTable && <Navbar />}

          <div className={cn(styles.additions)}>
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
