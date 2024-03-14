import { Button } from "@/components";
import cn from "classnames";
import { motion } from "framer-motion";
import Image from "next/image";
import { FC, RefObject, useEffect, useRef, useState } from "react";
import styles from "./about-content.module.scss";
import { AboutContentProps } from "./about-content.props";

interface IAboutData {
  title: string;
  description: string;
  imageUrl: string;
}

export const AboutContent: FC<AboutContentProps> = ({ className, children, ...props }) => {
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
    <div className={styles.wrapper}>
      {dataArray.map(({ title, description, imageUrl }, index) => {
        // eslint-disable-next-line react-hooks/rules-of-hooks
        const ref = useRef<HTMLDivElement>(null);
        descriptionRefs.current[index] = ref;
        return (
          <div ref={ref} key={index} className={styles.block}>
            <div className={styles.image}>
              <Image width={650} height={365} alt="" src={imageUrl} />
            </div>
            <div className={styles.text}>
              <h2 className={cn(styles.title, "color-accent")}>{title}</h2>
              <motion.div
                className={cn(styles.description, "subtitle-md", { [styles.open]: isOpenArray[index] })}
                variants={textVariants}
                initial="closed"
                animate={isOpenArray[index] ? "open" : "closed"}
              >
                {description}
              </motion.div>
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

const dataArray: IAboutData[] = [
  {
    title: "НАША ФАБРИКА",
    description: `NOVA была основана в 1988 году Ахметом Шерефом Йылмазом беем. С момента своего создания она сыграла важную роль в керамической промышленности для ванных комнат и кухонь. Производство Nova началось со смывов для раковин и сидений для унитазов в небольшой мастерской в ​​Топчуларе. Сегодня производство продолжается на современных заводах площадью 18 500 квадратных метров в Турции, Египте и Узбекистане.`,
    imageUrl: "https://api.novaplastik.uz/uploads/about/factory.png",
  },
  {
    title: "ПРОИЗВОДСТВО",
    description: `Благодаря использованию новейших технологий производства и соблюдению международных стандартов для керамической продукции, NOVA стала предпочтительной компанией для клиентов со штатом более 500 сотрудников. Наши мощности по производству сливов, бачков и смывных механизмов, сидений для унитазов и другой продукции составляют в среднем 2 000 000 штук в месяц. Продукция NOVA экспортируется в более чем 60 стран мира.`,
    imageUrl: "https://api.novaplastik.uz/uploads/about/proiz.png",
  },
  {
    title: "30 ЛЕТ NOVA",
    description: `Отмечая свое 35-летие, NOVA прошла процесс ребрендинга и приняла новый логотип. С новым брендом и логотипом «Nova Plumbing Solutions» наша компания стремится еще больше подчеркнуть наш традиционный подход в керамической промышленности. Мы можем принять этот подход как свою миссию: решать проблемы клиентов и достигать 100% удовлетворенности клиентов путем производства прочных, простых в сборке продуктов.`,
    imageUrl: "https://api.novaplastik.uz/uploads/about/year.png",
  },
  {
    title: "НАШ ОСНОВАТЕЛЬ",
    description: `Мы вспоминаем нашего основателя Ахмета Шерефа Йылмаза с тоской и уважением. Наш уважаемый основатель, покойный Ахмет Шереф Йылмаз, родился в Эрзинджане в 1942 году. Окончив факультет политических наук (Mekteb-i Mülkiee), он решил заняться деловой жизнью и сначала работал в Tübsan Tic. Он основал Акционерное общество (TUBSAN TAŞ), а затем Акционерное общество Nova Plastic Industry and Trade. Наш основатель, который всю свою жизнь посвятил себя индустриализму, внес большой вклад в свою страну, создав рабочие места в Стамбуле и Кыркларели Visa. Компания Nova Plastik, его творение, продолжает управляться и служить своей стране его детьми, Мехметом Ойтуном Йылмазом и Зейнеп Зерен Йылмаз Юджель.`,
    imageUrl: "https://api.novaplastik.uz/uploads/about/founder.png",
  },
];

export default AboutContent;
