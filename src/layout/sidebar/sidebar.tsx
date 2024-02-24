import { useContext } from "react";
import Link from "next/link";
import { useMediaQuery } from "react-responsive";
import { motion } from "framer-motion";
import { useTranslation } from "next-i18next";
import cn from "classnames";

import { SideBarContext } from "@/contexts/sidebar.context";

import { menu } from "@/helpers/menu.helper";

import { Burger, Language, Logo } from "@/components";

import { IconSearch } from "@/assets/icons";

import styles from "./sidebar.module.scss";

export const Sidebar = () => {
  const isTable = useMediaQuery({ maxWidth: 800 });
  const { t } = useTranslation();
  const { isOpen, setIsOpen } = useContext(SideBarContext);

  const menuController = () => {
    if (setIsOpen) setIsOpen(!isOpen);
  };

  const variants = {
    hidden: { x: "100%" },

    visible: { x: 0 },
  };

  return (
    isTable && (
      <motion.div
        className={cn(styles.sidebar)}
        variants={variants}
        initial={"hidden"}
        animate={isOpen ? "visible" : "hidden"}
        transition={{ ease: "backIn", x: { duration: 0.4 } }}
      >
        <div className="container">
          <div className={cn(styles.header)}>
            <div className={styles.wrap}>
              <Link className={styles.logo} href="/">
                <Logo color="custom" />
              </Link>

              <div className={cn(styles.additions)}>
                <IconSearch />

                <Language />

                <Burger isActive={true} onClick={menuController} />
              </div>
            </div>
          </div>

          <nav className={cn(styles.nav)}>
            <ul className={cn(styles.nav__list)}>
              {menu.length &&
                menu.map((item) => (
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
