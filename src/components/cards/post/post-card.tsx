import cn from "classnames";
import Image from "next/image";
import { useRouter } from "next/router";
import { FC } from "react";

import { PostCardProps } from "./post-card.props";

import { DateTime, ShowLink, Tag } from "@/components";

import styles from "./post-card.module.scss";

export const PostCard: FC<PostCardProps> = ({ className, post, ...props }) => {
  const { poster, title, subtitle, body, alias, tags, createAt } = post;

  const { push } = useRouter();

  const handleNavigation = () => {
    push(`/news/${alias}`);
  };

  return (
    <div className={cn(className, styles.card)} {...props}>
      <div className={cn(styles.head)}>
        <div className={cn(styles.image)} onClick={handleNavigation}>
          <Image src={`${poster}`} alt={`${title}`} width={350} height={200} priority />
        </div>

        <div className={cn(styles.captions)}>
          <DateTime className={cn(styles.date)} date={createAt} />

          {!!tags.length && (
            <Tag href={{ pathname: "/news", query: { tags: tags[0] } }} replace>
              {tags[0]}
            </Tag>
          )}
        </div>
      </div>

      <div className={cn(styles.content)}>
        <h3 className={cn(styles.name)}>{title}</h3>

        <div className={cn(styles.description, "text-md")} dangerouslySetInnerHTML={{ __html: subtitle || body }} />

        <ShowLink className={cn(styles.link, "color-accent")} href={`/news/${alias}`} />
      </div>
    </div>
  );
};
