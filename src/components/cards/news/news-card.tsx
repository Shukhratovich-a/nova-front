import { IconArrowRight } from "@/assets/icons";
import newsImageSrc from "@/assets/images/news.jpg";
import cn from "classnames";
import Image from "next/image";
import Link from "next/link";
import { FC } from "react";
import styles from "./news-card.module.scss";
import { NewsCardProps } from "./news-card.props";

const NewsCard: FC<NewsCardProps> = (props) => {
  const { title, text, imageUrl, link, date, ...rest } = props;

  return (
    <div className={styles.card} {...rest}>
      <div className={styles.head}>
        <Image className={styles.image} src={newsImageSrc} alt="" width={350} height={200} />
        <div className={styles.captions}>
          <span className={cn(styles.date, "badge")}>24 November 2023</span>
          <span className={cn(styles.label, "badge")}>Новости</span>
        </div>
      </div>

      <div className={styles.content}>
        <h3 className={styles.name}>Элементы канализации для подключения унитаза</h3>
        <p className={cn(styles.description, "text-md")}>
          Best of Realty is synonymous for success in the real estate business. The competition for the best development
          project was
        </p>
        <Link href={""} className={cn(styles.link, "color-accent")}>
          Посмотреть <IconArrowRight />
        </Link>
      </div>
    </div>
  );
};

export default NewsCard;