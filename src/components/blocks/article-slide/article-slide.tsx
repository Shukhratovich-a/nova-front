import { IconArrowRight } from "@/assets/icons";
import { Button, Slider } from "@/components";
import cn from "classnames";
import { FC } from "react";
import styles from "./article-slide.module.scss";
import { ArticleSlideProps } from "./article-slide.props";
import { useRouter } from "next/router";

export const ArticleSlide: FC<ArticleSlideProps> = ({ anchor, title, className, children }) => {
  const { push } = useRouter();

  const viewAllButton = (
    <Button className="color-white" appearance="yellow" onClick={() => push(`/media/#${anchor}`)}>
      Показать все <IconArrowRight />
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
