import { FC } from "react";
import { useTranslation } from "next-i18next";
import cn from "classnames";

import { EmptyListProps } from "./empty-list.props";

import styles from "./empty-list.module.scss";

export const EmptyList: FC<EmptyListProps> = ({ className, translateKey = "list", ...props }) => {
  const { t } = useTranslation();

  return (
    <span className={cn(styles.text, "subtitle-sm")} {...props}>
      {t(`empty.${translateKey}`)}
    </span>
  );
};
