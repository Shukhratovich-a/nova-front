import { FC } from "react";
import Link from "next/link";
import { useTranslation } from "next-i18next";
import cn from "classnames";

import { FooterProps } from "./Footer.props";

import { footerMenu } from "@/helpers/menu.helper";

import { Logo } from "@/components";

import { IconFacebook, IconVk, IconYoutube } from "@/assets/icons";

import styles from "./footer.module.scss";

export const Footer: FC<FooterProps> = ({ className }) => {
  const { t } = useTranslation();

  return (
    <footer className={cn(styles.wrapper, className)}>
      <div className={styles.social}>
        <Link href={""} target="_blank">
          <IconFacebook className="color-accent" width={40} height={40} />
        </Link>

        <Link href={""} target="_blank">
          <IconYoutube className="color-accent" width={40} height={40} />
        </Link>

        <Link href={""} target="_blank">
          <IconVk className="color-accent" width={40} height={40} />
        </Link>
      </div>
      <div className={cn(styles.wrap, "container")}>
        <Logo width={142} height={40} />

        <p className={cn(styles["copyright-info"], "text-md color-gray")}>© NOVA Plastic 2024. Все права защищены.</p>

        <nav>
          <ul className={cn(styles["nav-list"], "color-gray")}>
            {!!footerMenu.length &&
              footerMenu.map((item) => (
                <li key={item.id}>
                  <Link href={item.route}>{t(item.title)}</Link>
                </li>
              ))}
          </ul>
        </nav>
      </div>
    </footer>
  );
};
