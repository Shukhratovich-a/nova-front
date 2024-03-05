import { FC, useState } from "react";
import styles from "./about-content.module.scss";
import { AboutContentProps } from "./about-content.props";
import Image from "next/image";
import cn from "classnames";
import { motion } from "framer-motion";
import { Button } from "@/components";

interface IAboutData {
  title: string;
  description: string;
  imageUrl: string;
}

export const AboutContent: FC<AboutContentProps> = ({ className, children, ...props }) => {
  const [isOpenArray, setIsOpenArray] = useState<boolean[]>([]);

  const textVariants = {
    open: { height: "auto" },
    closed: { height: "8em" },
  };

  const toggleOpen = (index: number) => {
    const newIsOpenArray = [...isOpenArray];
    newIsOpenArray[index] = !newIsOpenArray[index];
    setIsOpenArray(newIsOpenArray);
  };

  return (
    <div className={styles.wrapper}>
      {dataArray.map(({ title, description, imageUrl }, index) => {
        return (
          <div key={index} className={styles.block}>
            <div className={styles.image}>
              <Image width={650} height={465} alt="" src={imageUrl} />
            </div>
            <div className={styles.text}>
              <h2 className={cn(styles.title, "color-accent")}>{title}</h2>
              <motion.p
                className={cn(styles.description, "subtitle-md", { [styles.open]: isOpenArray[index] })}
                variants={textVariants}
                initial="closed"
                animate={isOpenArray[index] ? "open" : "closed"}
              >
                {description}
              </motion.p>
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
    title: "Наша фабрика 1",
    description: `Lorem, ipsum dolor sit amet consectetur adipisicing elit. Facere repellat maxime accusamus ipsum laboriosam
    voluptate? Omnis libero eaque sed dicta saepe maiores accusamus reiciendis quo, quis sint magni facilis? Id,
    delectus labore earum ab ea pariatur eum modi magni minus necessitatibus omnis deserunt blanditiis sed
    ratione. Dolore placeat modi repellat maiores nulla doloremque? Vero, nihil corporis impedit officiis, vitae
    labore, eligendi eaque cumque voluptatibus neque sequi? Illum, natus? Possimus dolor placeat et sint illo
    labore, quas minus nihil eius, explicabo molestias iusto veniam eligendi natus aliquam velit ducimus, rem
    magnam aperiam fuga. Repellendus vitae asperiores autem, soluta tempora quia quisquam, sapiente cum
    laboriosam adipisci ullam veniam? Magni distinctio labore in voluptas reprehenderit maxime sunt commodi
    provident incidunt? Sed accusamus ipsum, officiis quis qui ab consequatur dicta aliquid, voluptatum
    consequuntur similique. Molestiae provident tempore natus voluptatum dolorum blanditiis mollitia a officia
    incidunt nobis! Dicta, doloremque vel. Id magni quaerat possimus ratione quasi laudantium dicta incidunt,
    labore optio pariatur reprehenderit. Velit molestias accusantium consequuntur doloremque ullam. Unde
    voluptatibus illo a, inventore enim amet, similique est voluptates tempore numquam perspiciatis. Maxime
    laboriosam adipisci obcaecati officiis illo tempora, ex commodi beatae corrupti recusandae aliquid modi.
    Error ratione, nesciunt cupiditate porro autem similique aliquid illo.`,
    imageUrl: "https://picsum.photos/650/465",
  },
  {
    title: "Наша фабрика 2",
    description: `Lorem, ipsum dolor sit amet consectetur adipisicing elit. Facere repellat maxime accusamus ipsum laboriosam
    voluptate? Omnis libero eaque sed dicta saepe maiores accusamus reiciendis quo, quis sint magni facilis? Id,
    delectus labore earum ab ea pariatur eum modi magni minus necessitatibus omnis deserunt blanditiis sed
    ratione. Dolore placeat modi repellat maiores nulla doloremque? Vero, nihil corporis impedit officiis, vitae
    labore, eligendi eaque cumque voluptatibus neque sequi? Illum, natus? Possimus dolor placeat et sint illo
    labore, quas minus nihil eius, explicabo molestias iusto veniam eligendi natus aliquam velit ducimus, rem
    magnam aperiam fuga. Repellendus vitae asperiores autem, soluta tempora quia quisquam, sapiente cum
    laboriosam adipisci ullam veniam? Magni distinctio labore in voluptas reprehenderit maxime sunt commodi
    provident incidunt? Sed accusamus ipsum, officiis quis qui ab consequatur dicta aliquid, voluptatum
    consequuntur similique. Molestiae provident tempore natus voluptatum dolorum blanditiis mollitia a officia
    incidunt nobis! Dicta, doloremque vel. Id magni quaerat possimus ratione quasi laudantium dicta incidunt,
    labore optio pariatur reprehenderit. Velit molestias accusantium consequuntur doloremque ullam. Unde
    voluptatibus illo a, inventore enim amet, similique est voluptates tempore numquam perspiciatis. Maxime
    laboriosam adipisci obcaecati officiis illo tempora, ex commodi beatae corrupti recusandae aliquid modi.
    Error ratione, nesciunt cupiditate porro autem similique aliquid illo.`,
    imageUrl: "https://picsum.photos/650/465",
  },
  {
    title: "Наша фабрика 3",
    description: `Lorem, ipsum dolor sit amet consectetur adipisicing elit. Facere repellat maxime accusamus ipsum laboriosam
    voluptate? Omnis libero eaque sed dicta saepe maiores accusamus reiciendis quo, quis sint magni facilis? Id,
    delectus labore earum ab ea pariatur eum modi magni minus necessitatibus omnis deserunt blanditiis sed
    ratione. Dolore placeat modi repellat maiores nulla doloremque? Vero, nihil corporis impedit officiis, vitae
    labore, eligendi eaque cumque voluptatibus neque sequi? Illum, natus? Possimus dolor placeat et sint illo
    labore, quas minus nihil eius, explicabo molestias iusto veniam eligendi natus aliquam velit ducimus, rem
    magnam aperiam fuga. Repellendus vitae asperiores autem, soluta tempora quia quisquam, sapiente cum
    laboriosam adipisci ullam veniam? Magni distinctio labore in voluptas reprehenderit maxime sunt commodi
    provident incidunt? Sed accusamus ipsum, officiis quis qui ab consequatur dicta aliquid, voluptatum
    consequuntur similique. Molestiae provident tempore natus voluptatum dolorum blanditiis mollitia a officia
    incidunt nobis! Dicta, doloremque vel. Id magni quaerat possimus ratione quasi laudantium dicta incidunt,
    labore optio pariatur reprehenderit. Velit molestias accusantium consequuntur doloremque ullam. Unde
    voluptatibus illo a, inventore enim amet, similique est voluptates tempore numquam perspiciatis. Maxime
    laboriosam adipisci obcaecati officiis illo tempora, ex commodi beatae corrupti recusandae aliquid modi.
    Error ratione, nesciunt cupiditate porro autem similique aliquid illo.`,
    imageUrl: "https://picsum.photos/650/465",
  },
  {
    title: "Наша фабрика 4",
    description: `Lorem, ipsum dolor sit amet consectetur adipisicing elit. Facere repellat maxime accusamus ipsum laboriosam
    voluptate? Omnis libero eaque sed dicta saepe maiores accusamus reiciendis quo, quis sint magni facilis? Id,
    delectus labore earum ab ea pariatur eum modi magni minus necessitatibus omnis deserunt blanditiis sed
    ratione. Dolore placeat modi repellat maiores nulla doloremque? Vero, nihil corporis impedit officiis, vitae
    labore, eligendi eaque cumque voluptatibus neque sequi? Illum, natus? Possimus dolor placeat et sint illo
    labore, quas minus nihil eius, explicabo molestias iusto veniam eligendi natus aliquam velit ducimus, rem
    magnam aperiam fuga. Repellendus vitae asperiores autem, soluta tempora quia quisquam, sapiente cum
    laboriosam adipisci ullam veniam? Magni distinctio labore in voluptas reprehenderit maxime sunt commodi
    provident incidunt? Sed accusamus ipsum, officiis quis qui ab consequatur dicta aliquid, voluptatum
    consequuntur similique. Molestiae provident tempore natus voluptatum dolorum blanditiis mollitia a officia
    incidunt nobis! Dicta, doloremque vel. Id magni quaerat possimus ratione quasi laudantium dicta incidunt,
    labore optio pariatur reprehenderit. Velit molestias accusantium consequuntur doloremque ullam. Unde
    voluptatibus illo a, inventore enim amet, similique est voluptates tempore numquam perspiciatis. Maxime
    laboriosam adipisci obcaecati officiis illo tempora, ex commodi beatae corrupti recusandae aliquid modi.
    Error ratione, nesciunt cupiditate porro autem similique aliquid illo.`,
    imageUrl: "https://picsum.photos/650/465",
  },
  {
    title: "Наша фабрика 5",
    description: `Lorem, ipsum dolor sit amet consectetur adipisicing elit. Facere repellat maxime accusamus ipsum laboriosam
    voluptate? Omnis libero eaque sed dicta saepe maiores accusamus reiciendis quo, quis sint magni facilis? Id,
    delectus labore earum ab ea pariatur eum modi magni minus necessitatibus omnis deserunt blanditiis sed
    ratione. Dolore placeat modi repellat maiores nulla doloremque? Vero, nihil corporis impedit officiis, vitae
    labore, eligendi eaque cumque voluptatibus neque sequi? Illum, natus? Possimus dolor placeat et sint illo
    labore, quas minus nihil eius, explicabo molestias iusto veniam eligendi natus aliquam velit ducimus, rem
    magnam aperiam fuga. Repellendus vitae asperiores autem, soluta tempora quia quisquam, sapiente cum
    laboriosam adipisci ullam veniam? Magni distinctio labore in voluptas reprehenderit maxime sunt commodi
    provident incidunt? Sed accusamus ipsum, officiis quis qui ab consequatur dicta aliquid, voluptatum
    consequuntur similique. Molestiae provident tempore natus voluptatum dolorum blanditiis mollitia a officia
    incidunt nobis! Dicta, doloremque vel. Id magni quaerat possimus ratione quasi laudantium dicta incidunt,
    labore optio pariatur reprehenderit. Velit molestias accusantium consequuntur doloremque ullam. Unde
    voluptatibus illo a, inventore enim amet, similique est voluptates tempore numquam perspiciatis. Maxime
    laboriosam adipisci obcaecati officiis illo tempora, ex commodi beatae corrupti recusandae aliquid modi.
    Error ratione, nesciunt cupiditate porro autem similique aliquid illo.`,
    imageUrl: "https://picsum.photos/650/465",
  },
];

export default AboutContent;
