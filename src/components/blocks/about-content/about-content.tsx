import { FC } from "react";
import styles from "./about-content.module.scss";
import { AboutContentProps } from "./about-content.props";
import Image from "next/image";
import cn from "classnames";

export const AboutContent: FC<AboutContentProps> = ({ className, children, ...props }) => {
  return (
    <div className={styles.wrapper}>
      <div className={styles.block}>
        <div className={styles.image}>
          <Image width={650} height={465} alt="" src="https://picsum.photos/650/465" />
        </div>
        <div className={styles.text}>
          <h2 className={cn(styles.title, "color-accent")}>НАША ФАБРИКА</h2>
          <p className={cn(styles.description, "subtitle-md", "custom-scrollbar")}>
            NOVA была основана в 1988 году Ахметом Шерефом Йылмазом беем. С момента своего создания она сыграла важную
            роль в керамической промышленности для ванных комнат и кухонь. Производство Nova началось со смывов для
            раковин и сидений для унитазов в небольшой мастерской в ​​Топчуларе. Сегодня производство продолжается на
            современных заводах площадью 18 500 квадратных метров в Турции, Египте и Узбекистане. Lorem ipsum dolor sit
            amet, consectetur adipisicing elit. Hic provident distinctio soluta molestias vero enim tenetur est
            necessitatibus ad quisquam. Consequuntur neque ipsam praesentium non dicta possimus quas maiores
            facere?Lorem ipsum dolor sit amet consectetur adipisicing elit. Explicabo enim eum natus, alias minus sunt
            non at quam deleniti dolorum cumque, porro asperiores. Nostrum vel, excepturi recusandae sequi similique
            sapiente!
          </p>
        </div>
      </div>
      <div className={styles.block}>
        <div className={styles.image}>
          <Image width={650} height={465} alt="" src="https://picsum.photos/650/465" />
        </div>
        <div className={styles.text}>
          <h2 className={cn(styles.title, "color-accent")}>НАША ФАБРИКА</h2>
          <p className={cn(styles.description, "subtitle-md", "custom-scrollbar")}>
            NOVA была основана в 1988 году Ахметом Шерефом Йылмазом беем. С момента своего создания она сыграла важную
            роль в керамической промышленности для ванных комнат и кухонь. Производство Nova началось со смывов для
            раковин и сидений для унитазов в небольшой мастерской в ​​Топчуларе. Сегодня производство продолжается на
            современных заводах площадью 18 500 квадратных метров в Турции, Египте и Узбекистане. Lorem ipsum dolor sit
            amet, consectetur adipisicing elit. Hic provident distinctio soluta molestias vero enim tenetur est
            necessitatibus ad quisquam. Consequuntur neque ipsam praesentium non dicta possimus quas maiores
            facere?Lorem ipsum dolor sit amet consectetur adipisicing elit. Explicabo enim eum natus, alias minus sunt
            non at quam deleniti dolorum cumque, porro asperiores. Nostrum vel, excepturi recusandae sequi similique
            sapiente!
          </p>
        </div>
      </div>
      <div className={styles.block}>
        <div className={styles.image}>
          <Image width={650} height={465} alt="" src="https://picsum.photos/650/465" />
        </div>
        <div className={styles.text}>
          <h2 className={cn(styles.title, "color-accent")}>НАША ФАБРИКА</h2>
          <p className={cn(styles.description, "subtitle-md", "custom-scrollbar")}>
            NOVA была основана в 1988 году Ахметом Шерефом Йылмазом беем. С момента своего создания она сыграла важную
            роль в керамической промышленности для ванных комнат и кухонь. Производство Nova началось со смывов для
            раковин и сидений для унитазов в небольшой мастерской в ​​Топчуларе. Сегодня производство продолжается на
            современных заводах площадью 18 500 квадратных метров в Турции, Египте и Узбекистане. Lorem ipsum dolor sit
            amet, consectetur adipisicing elit. Hic provident distinctio soluta molestias vero enim tenetur est
            necessitatibus ad quisquam. Consequuntur neque ipsam praesentium non dicta possimus quas maiores
            facere?Lorem ipsum dolor sit amet consectetur adipisicing elit. Explicabo enim eum natus, alias minus sunt
            non at quam deleniti dolorum cumque, porro asperiores. Nostrum vel, excepturi recusandae sequi similique
            sapiente!
          </p>
        </div>
      </div>
    </div>
  );
};

export default AboutContent;
