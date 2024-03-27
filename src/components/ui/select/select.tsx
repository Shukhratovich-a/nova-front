import cn from "classnames";
import { FC, useState } from "react";
import styles from "./select.module.scss";
import { SelectProps } from "./select.props";

const Select: FC<SelectProps> = ({ select = "ru", options }) => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div
      className={cn(styles.wrapper, { [styles.open]: isOpen })}
      onClick={() => {
        setIsOpen(!isOpen);
      }}
    >
      <button data-name="select" className={styles.button}>
        {select || "open"}
      </button>
      <div className={cn(styles.options)}>
        {options.map(({ option, optionOnClick }) => {
          return (
            <div key={option} onClick={() => optionOnClick()} className={styles.option}>
              {option}
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default Select;
