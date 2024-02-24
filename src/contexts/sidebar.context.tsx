import { FC, PropsWithChildren, createContext, useEffect, useState } from "react";

interface ISideBarContext {
  isOpen: boolean;
  setIsOpen?: (isOpen: boolean) => void;
}

export const SideBarContext = createContext<ISideBarContext>({ isOpen: false });

export const SideBarProvider: FC<PropsWithChildren<ISideBarContext>> = ({ isOpen, children }) => {
  const [isOpenState, setIsOpenState] = useState<boolean>(isOpen);

  const setIsOpen = () => {
    setIsOpenState((prev) => !prev);
  };

  useEffect(() => {
    if (isOpenState) window.document.body.style.overflow = "hidden";
    else window.document.body.style.overflow = "visible";
  }, [isOpenState]);

  return <SideBarContext.Provider value={{ isOpen: isOpenState, setIsOpen }}>{children}</SideBarContext.Provider>;
};
