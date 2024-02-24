import { FC } from "react";
import { useRouter } from "next/router";
import Image from "next/image";
import { useTranslation } from "next-i18next";
import cn from "classnames";

import { CategoryCardProps } from "./category-card.props";

import { DOMAIN } from "@/helpers/api.helper";

import { ShowLink } from "@/components/ui/show-link/show-link";

import styles from "./category-card.module.scss";

export const CategoryCard: FC<CategoryCardProps> = ({ className, category, href, ...props }) => {
  const { alias, title, poster } = category;

  const { t } = useTranslation();
  const { push } = useRouter();

  const handleNavigation = () => {
    push(href ? href : `/category/${alias}`);
  };

  return (
    <div className={cn(styles.card, className)} onClick={() => handleNavigation()} {...props}>
      <Image className={cn(styles.image)} src={`${DOMAIN}${poster}`} alt={title} width={300} height={300} priority />

      <div className={cn(styles.content)}>
        <h3 className={cn(styles.title)} title={title}>
          {title}
        </h3>

        <ShowLink className={cn(styles.link)} href={href ? href : `/category/${alias}`}>
          {t("show")}
        </ShowLink>
      </div>
    </div>
  );
};

export default CategoryCard;
