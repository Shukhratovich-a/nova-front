import cn from "classnames";
import React from "react";

import { FooterProps } from "./Footer.props";

import { IconFacebook, IconVk, IconYoutube } from "@/assets/icons";
import Image from "next/image";
import Link from "next/link";
import styles from "./footer.module.scss";

export const Footer: React.FC<FooterProps> = ({ className }) => {
  return (
    <footer className={cn(className, styles.wrapper)}>
      <div className={styles.social}>
        <Link href={""}>
          <IconFacebook className="color-accent" width={40} height={40} />
        </Link>

        <Link href={""}>
          <IconYoutube className="color-accent" width={40} height={40} />
        </Link>

        <Link href={""}>
          <IconVk className="color-accent" width={40} height={40} />
        </Link>
      </div>
      <div className={cn(styles.wrap, "container")}>
        <Image src="" alt="" width={142} height={40} />
        <p className={cn(styles["copyright-info"], "text-md color-gray")}>© NOVA Plastic 2024. Все права защищены.</p>
        <nav>
          <ul className={cn(styles["nav-list"], "color-gray")}>
            <li>
              <Link href="/about">О нас</Link>
            </li>
            <li>
              <Link href="/career">Карьера</Link>
            </li>
            <li>
              <Link href="/certificate">Сертификаты</Link>
            </li>
            <li>
              <Link href="/contact">Конакты</Link>
            </li>
          </ul>
        </nav>
      </div>
    </footer>
  );
};
