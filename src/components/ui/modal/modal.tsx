import cn from "classnames";
import { FC, useEffect, useRef } from "react";
import styles from "./modal.module.scss";
import { ModalProps } from "./modal.props";

export const Modal: FC<ModalProps> = ({ trigger, className, children }) => {
  const modalRef = useRef<HTMLDialogElement>(null);

  const toggleModal = () => {
    const modalElem = modalRef.current;
    if (!modalElem) return;

    const method = modalElem.hasAttribute("open") ? "visible" : "hidden";
    document.body.style.overflow = method;

    modalElem.hasAttribute("open") ? modalElem.close() : modalElem.showModal();
  };

  const closeModalOnClickOutside = (event: React.MouseEvent) => {
    if (modalRef.current === event.target) {
      closeModal();
    }
  };

  const closeModalOnEsc = (event: KeyboardEvent) => {
    if (event.key === "Escape") {
      closeModal();
    }
  };

  const closeModal = () => {
    document.body.classList.remove("scroll-hidden");
    document.body.style.overflow = "visible";
    modalRef.current?.close();
  };

  useEffect(() => {
    document.addEventListener("keydown", closeModalOnEsc);

    return () => {
      document.removeEventListener("keydown", closeModalOnEsc);
    };
  }, []);

  return (
    <>
      <button onClick={toggleModal} className={styles.btn}>
        {trigger}
      </button>
      <dialog onClick={closeModalOnClickOutside} ref={modalRef} className={cn(styles.modal, className)}>
        {children}
      </dialog>
    </>
  );
};

export default Modal;
