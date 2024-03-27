import cn from "classnames";
import { useTranslation } from "next-i18next";
import { useRouter } from "next/router";
import { FC } from "react";

import { getTags } from "@/api/tag.api";

import { LanguageProps } from "./language.props";

import { languages } from "@/helpers/languages.helper";

import Select from "../ui/select/select";
import styles from "./language.module.scss";

export const Language: FC<LanguageProps> = ({ className, isScrolled = false, ...props }) => {
  const { i18n } = useTranslation();
  let { replace, query, pathname, reload } = useRouter();

  const locales = languages.filter((language) => language.locale !== i18n.language);

  const handleChange = async (locale: string) => {
    let currentQuery = { ...query };

    const isArabicLocale = i18n.language === "ar" || locale === "ar";

    if (query.tags) {
      const { data } = await getTags(typeof query.tags === "string" ? [query.tags] : [...query.tags], {
        language: locale,
      });

      currentQuery = { ...query, tags: data };
    }

    await replace({ pathname, query: currentQuery }, "", { locale, scroll: false });
    if (isArabicLocale) reload();
  };

  const options = locales.map(({ locale }) => ({
    option: locale,
    optionOnClick: () => handleChange(locale),
  }));

  return (
    <div
      className={cn(styles["language"], "button", className, {
        [styles["language--scrolled"]]: isScrolled,
      })}
      {...props}
    >
      <Select select={i18n.language} options={options} />
    </div>
  );
};
