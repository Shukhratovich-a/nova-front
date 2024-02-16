import { FC, useState } from "react";
import { useRouter } from "next/router";
import { useTranslation } from "next-i18next";
import cn from "classnames";

import { LanguageProps } from "./language.props";

import { languages } from "@/helpers/languages.helper";

import { IconArrowBottom } from "@icons";

import styles from "./language.module.scss";

export const Language: FC<LanguageProps> = ({ className, isScrolled = false, ...props }) => {
  const { i18n } = useTranslation();
  const { push, asPath, query, pathname } = useRouter();

  const [isOpen, setIsOpen] = useState<boolean>(false);

  const locales = languages.filter((language) => language.locale !== i18n.language);

  const handleOpenClose = () => {
    setIsOpen((prev) => !prev);
  };

  const handleChange = (locale: string) => {
    setIsOpen(false);

    push({ pathname, query }, asPath, { locale, scroll: false });
  };

  return (
    <div
      className={cn(styles["language"], "button", className, {
        [styles["language--scrolled"]]: isScrolled,
      })}
      {...props}
    >
      <span className={cn(styles["language--selected"])} onClick={handleOpenClose}>
        <span>{i18n.language}</span>
        <IconArrowBottom />
      </span>

      <ul
        className={cn(styles["language__list"], {
          [styles["language__list--open"]]: isOpen,
        })}
      >
        {locales.map(({ locale }) => (
          <li className={cn(styles.language__list__item)} key={locale} onClick={() => handleChange(locale)}>
            {locale}
          </li>
        ))}
      </ul>
    </div>
  );
};
