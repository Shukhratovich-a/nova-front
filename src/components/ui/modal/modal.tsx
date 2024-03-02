import { FC, useRef } from "react";
import styles from "./modal.module.scss";
import { ModalProps } from "./modal.props";
import cn from "classnames";

export const Modal: FC<ModalProps> = ({ trigger, className, children }) => {
  const modalRef = useRef<HTMLDialogElement>(null);

  const toggleModal = () => {
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

  const closeModal = (event: React.MouseEvent<unknown>) => {
    if (modalRef.current === event.target) {
      document.body.style.overflow = "visible";
      modalRef.current.close();
    }
  };

  return (
    <>
      <button onClick={toggleModal} className={styles.btn}>
        {trigger}
      </button>
      <dialog onClick={closeModal} ref={modalRef} className={cn(styles.modal, className)}>
        {children}
      </dialog>
    </>
  );
};

export default Modal;
