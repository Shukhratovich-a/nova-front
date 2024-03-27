import { FC } from "react";
import { useRouter } from "next/router";
import { useTranslation } from "next-i18next";
import cn from "classnames";

import { ArticleSlideProps } from "./article-slide.props";

import { Button, Slider } from "@/components";

import { IconArrowRight } from "@/assets/icons";

import styles from "./article-slide.module.scss";

export const ArticleSlide: FC<ArticleSlideProps> = ({ page = "media", anchor, title, className, children }) => {
  const { push } = useRouter();
  const { t } = useTranslation();
  const pushPath = anchor ? `/${page}/#${anchor}` : `/${page}`;

  const viewAllButton = (
    <Button className="color-white" appearance="yellow" onClick={() => push(pushPath)}>
      {t("show-all")} <IconArrowRight />
    </Button>
  );

  return (
    <div className={cn(styles.wrapper, className)}>
      <div className={styles.content}>
        <h2 className="color-accent">{title}</h2>
        {viewAllButton}
      </div>

      <Slider mobile={true} width={1075} type="dynamic" quantity={3}>
        {children}
      </Slider>

      <div className={styles["button-mobile"]}>{viewAllButton}</div>
    </div>
  );
};

export default ArticleSlide;
