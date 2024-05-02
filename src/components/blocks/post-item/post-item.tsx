import cn from "classnames";
import Image from "next/image";
import { FC } from "react";

import { PostItemProps } from "./post-item.props";

import { DateTime } from "@/components";

import { DOMAIN } from "@/helpers/api.helper";
import styles from "./post-item.module.scss";

export const PostItem: FC<PostItemProps> = ({ post }) => {
  const { title, subtitle, body, image, createAt, type } = post;

  return (
    <div className={cn(styles.wrapper, styles[`wrapper--${type}`])}>
      <div className={cn(styles.head)}>
        <h2 className={cn(styles.title, "subtitle-lg")}>{title}</h2>

        <DateTime date={createAt} size="md" />
      </div>

      {type !== "none" && (
        <Image className={cn(styles.image)} width={1000} height={480} alt="" src={`${DOMAIN}${image}`} priority />
      )}

      <div className={cn(styles.content)}>
        {subtitle && <p className={cn(styles.subtitle, "subtitle-sm")}>{subtitle}</p>}

        <div className={cn(styles.body, "text-lg")} dangerouslySetInnerHTML={{ __html: body }} />
      </div>
    </div>
  );
};
