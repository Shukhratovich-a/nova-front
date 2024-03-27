import cn from "classnames";
import { motion } from "framer-motion";
import { useTranslation } from "next-i18next";
import Link from "next/link";
import { useContext } from "react";
import { useMediaQuery } from "react-responsive";

import { SidebarProps } from "./sidebar.props";

import { SideBarContext } from "@/contexts/sidebar.context";

import { headerMenu } from "@/helpers/menu.helper";

import { Burger, Language, Logo, Search } from "@/components";

import styles from "./sidebar.module.scss";

export const Sidebar = ({ className, ...props }: SidebarProps) => {
  const isTable = useMediaQuery({ maxWidth: 900 });
  const { t } = useTranslation();
  const { isOpen, setIsOpen } = useContext(SideBarContext);

  const menuController = () => {
    if (setIsOpen) setIsOpen(!isOpen);
  };

  const variants = {
    hidden: { x: "100%", opacity: 0 },
    visible: { x: 0, opacity: 1 },
  };
  if (document.body.classList.contains("content-rtl")) {
    variants.hidden = { x: "-100%", opacity: 0 };
  }

  return (
    isTable && (
      <motion.div
        className={cn(styles.sidebar, className)}
        variants={variants}
        initial={"hidden"}
        animate={isOpen ? "visible" : "hidden"}
        transition={{ ease: "backIn", x: { duration: 0.4 } }}
        {...props}
      >
        <div className="container">
          <div className={cn(styles.header)}>
            <div className={styles.wrap}>
              <Link className={styles.logo} href="/">
                <Logo color="custom" />
              </Link>

              <div className={cn(styles.additions)}>
                <Search />

                <Language />

                <Burger isActive={true} onClick={menuController} />
              </div>
            </div>
          </div>

          <nav className={cn(styles.nav)}>
            <ul className={cn(styles.nav__list)}>
              {headerMenu.length &&
                headerMenu.map((item) => (
                  <li className={cn(styles.nav__item)} key={item.id}>
                    <Link className={cn(styles.nav__link, "nav-link-text")} href={item.route}>
                      {t(item.title)}
                    </Link>
                  </li>
                ))}
            </ul>
          </nav>
        </div>
      </motion.div>
    )
  );
};

export default Sidebar;
