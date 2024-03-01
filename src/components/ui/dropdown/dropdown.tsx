import { FC, useRef } from "react";
import styles from "./dropdown.module.scss";
import { DropdownProps } from "./dropdown.props";
import cn from "classnames";

export const Dropdown: FC<DropdownProps> = ({ trigger, className, children }) => {
  const modalRef = useRef<HTMLDialogElement>(null);

  const toggleDropdown = () => {
    const modalElem = modalRef.current;
    if (!modalElem) return;

    if (!modalElem.hasAttribute("open")) {
      document.body.style.overflow = "hidden";
      modalElem.showModal();
    } else {
      document.body.style.overflow = "visible";
      modalElem.close();
    }
  };

  const closeDropdown = (event: React.MouseEvent<unknown>) => {
    if (modalRef.current === event.target) {
      document.body.style.overflow = "visible";
      modalRef.current.close();
    }
  };

  return (
    <>
      <button onClick={toggleDropdown} className={styles.btn}>
        {trigger}
      </button>
      <dialog onClick={closeDropdown} ref={modalRef} className={cn(styles.modal, className)}>
        {children}
      </dialog>
    </>
  );
};

export default Dropdown;
