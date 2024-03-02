import { FC, useCallback, useEffect, useRef, useState } from "react";
import cn from "classnames";

import { TabsProps } from "./tabs.props";

import { IDetailCategory } from "@/types/product.interface";

import styles from "./tabs.module.scss";

const MORE_BTN_RESERVED_WIDTH = 90;

export const Tabs: FC<TabsProps> = ({ className, tabs, ...props }) => {
  const [activeTab, setActiveTab] = useState(tabs[0].id);

  const containerRef = useRef<HTMLDivElement>(null);

  const containerVisibleWidth = useRef<number>(0); //достаточно ли свободного места для видимых вкладок
  const actionElementsWidth = useRef<number[]>([]);

  const [actionsMoreList, setActionsMoreList] = useState<IDetailCategory[]>([]);
  const [isMoreOpen, setIsMoreOpen] = useState(false);

  const calculateVisibility = useCallback(
    (actionElements: HTMLDivElement[]) => {
      let visibleElementsWidth = 0;

      const actionsMoreData: IDetailCategory[] = [];

      let isVisible = true;

      [...actionElements].forEach((actionEl, i) => {
        visibleElementsWidth += actionElementsWidth.current[i];

        const visibleSpaceWidth =
          i !== actionElements.length - 1 ? visibleElementsWidth + MORE_BTN_RESERVED_WIDTH : visibleElementsWidth;

        if (visibleSpaceWidth <= containerVisibleWidth.current && isVisible) {
          actionEl.style.display = "flex";
        } else {
          if (isVisible) {
            isVisible = false;
          }

          actionEl.style.display = "none";

          actionsMoreData.push(tabs[i]);
        }
      });

      setActionsMoreList([...actionsMoreData]);
    },
    [tabs]
  );

  useEffect(() => {
    if (actionElementsWidth?.current && containerRef?.current) {
      const actionElements: HTMLDivElement[] | [] =
        (Array.from(containerRef.current.children) as HTMLDivElement[]) || [];
      actionElements.splice(-1, 1);

      const actionsListWidth: number[] = [];

      [...actionElements].forEach((actionEl) => {
        actionsListWidth.push(actionEl.offsetWidth);
      });
      actionElementsWidth.current = [...actionsListWidth];

      const resizeObserver = new ResizeObserver((entries) => {
        for (const entry of entries) {
          if (entry.contentBoxSize) {
            const contentBoxSize = entry.contentBoxSize[0];
            containerVisibleWidth.current = Math.ceil(contentBoxSize.inlineSize);

            calculateVisibility(actionElements);
          }
        }
      });

      resizeObserver.observe(containerRef.current);
    }
  }, [calculateVisibility]);

  const getActiveClass = (id: number) => {
    return id === activeTab ? styles.open : styles.close;
  };

  return (
    <div className={(styles.wrapper, className)} {...props}>
      <div className={styles.tabs}>
        <div className={styles["actions-wrapper"]}>
          <div className={styles["main-actions"]} ref={containerRef}>
            {tabs.map(({ id, title }) => (
              <div
                key={id}
                onClick={() => {
                  setActiveTab(id);
                  setIsMoreOpen(false);
                }}
                className={cn(styles.action, getActiveClass(id), "color-gray nav-link-text")}
              >
                {title}
              </div>
            ))}

            <div
              className={cn(
                styles["more-btn"],
                styles.action,
                actionsMoreList.length ? "" : styles.hidden,
                "nav-link-text"
              )}
              onClick={() => setIsMoreOpen(!isMoreOpen)}
            >
              More...
            </div>
          </div>
        </div>

        <div className={cn(styles["more-options"], isMoreOpen ? styles.open : "")}>
          <div style={{ minHeight: 0 }}>
            {actionsMoreList.map(({ id, title }) => (
              <div
                key={id}
                onClick={() => {
                  setActiveTab(id);
                  setIsMoreOpen(false);
                }}
                className={cn(styles.action, getActiveClass(id), "color-gray nav-link-text")}
              >
                {title}
              </div>
            ))}
          </div>
        </div>
      </div>

      <ul className={styles.list}>
        {tabs.map(({ id, title, details }) => {
          return (
            <li key={id} className={cn(styles.item)}>
              <p
                className={cn(styles.action, styles["action-mobile"], getActiveClass(id), "color-gray nav-link-text")}
                onClick={() => setActiveTab((prev) => (prev === id ? -1 : id))}
              >
                {title}
              </p>
              <div className={cn(styles.content, getActiveClass(id))}>
                <ul style={{ minHeight: 0 }}>
                  {details.map(({ id, title, value }) => {
                    return (
                      <li key={id} className={styles.block}>
                        <p className={cn(styles.name, "text-md")}>{title}</p>
                        <p className={cn(styles.value, "text-md")}>{value}</p>
                      </li>
                    );
                  })}
                </ul>
              </div>
            </li>
          );
        })}
      </ul>
    </div>
  );
};

export default Tabs;
