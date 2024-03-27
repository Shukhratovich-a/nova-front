import cn from "classnames";
import { motion } from "framer-motion";
import Image from "next/image";
import { FC, RefObject, useEffect, useRef, useState } from "react";

import { AboutContentProps } from "./about-content.props";

import { Button } from "@/components";

import styles from "./about-content.module.scss";

export const AboutContent: FC<AboutContentProps> = ({ className, abouts, ...props }) => {
  const [isOpenArray, setIsOpenArray] = useState<boolean[]>([]);
  const descriptionRefs = useRef<Array<RefObject<HTMLDivElement>>>([]);

  const textVariants = {
    open: { height: "auto" },
    closed: { height: "5em" },
  };

  const toggleOpen = (index: number) => {
    const newIsOpenArray = [...isOpenArray];
    newIsOpenArray[index] = !newIsOpenArray[index];
    setIsOpenArray(newIsOpenArray);
  };

  useEffect(() => {
    const isDescriptionWithinLimit = () => {
      descriptionRefs.current.forEach(({ current: blockContent }, index) => {
        if (!blockContent) return;
        const DESCRIPTION_PADDING = 90;

        // DOM elements Target
        const imageTarget = blockContent.children[0];
        const textTarget = blockContent.children[1];
        const descriptionTarget = textTarget.children[1];

        // Elements Height
        const scrollHeight = descriptionTarget.scrollHeight + DESCRIPTION_PADDING;
        const imageHeight = imageTarget.clientHeight;

        // проверяет превышает ли description высоту картинки в 2 раза
        const maxDescriptionHeight = scrollHeight > imageHeight * 2;

        if (maxDescriptionHeight) {
          blockContent.classList.add(styles["block-column"]);
        }

        if (scrollHeight < imageHeight && !blockContent.classList.contains(styles["block-column"])) {
          textTarget.classList.add(styles["text-within-limit"]);
        }
      });
    };

    isDescriptionWithinLimit();
  }, []);

  return (
    <div className={styles.wrapper} {...props}>
      {abouts.map(({ title, description, poster }, index) => {
        // eslint-disable-next-line react-hooks/rules-of-hooks
        const ref = useRef<HTMLDivElement>(null);
        descriptionRefs.current[index] = ref;
        return (
          <div ref={ref} key={index} className={styles.block}>
            <div className={styles.image}>
              <Image src={`${poster}`} alt={title} width={650} height={365} priority />
            </div>

            <div className={styles.text}>
              <h2 className={cn(styles.title, "color-accent")}>{title}</h2>

              <motion.div
                className={cn(styles.description, "subtitle-md", { [styles.open]: isOpenArray[index] })}
                variants={textVariants}
                initial="closed"
                animate={isOpenArray[index] ? "open" : "closed"}
                dangerouslySetInnerHTML={{ __html: description }}
              />

              <Button className={styles.button} onClick={() => toggleOpen(index)}>
                {isOpenArray[index] ? "Скрыть" : "Подробнее"}
              </Button>
            </div>
          </div>
        );
      })}
    </div>
  );
};

export default AboutContent;
