import { FC, MouseEvent, useEffect, useRef, useState } from "react";
import styles from "./tabs.module.scss";
import cn from "classnames";

interface IActionsList {
  key: number;
  name: string;
}

const tabsTitle: string[] = [
  "Технические ХАРАКТЕРИСТИКИ",
  "ПРИМЕНЕНИЕ",
  "ФУНКЦИИ",
  "ЛОГИСТИЧЕСКАЯ ИНФОРМАЦИЯ",
  "ОБЪЕМ ПОСТАВКИ",
];

export const ACTION_BTNS_GAP = 16;
export const MORE_BTN_RESERVED_WIDTH = 90;
export const ACTIONS_LIST: IActionsList[] = [
  {
    key: 1,
    name: "Технические ХАРАКТЕРИСТИКИ",
  },
  {
    key: 2,
    name: "ПРИМЕНЕНИЕ",
  },
  {
    key: 3,
    name: "ФУНКЦИИ",
  },
  {
    key: 4,
    name: "ЛОГИСТИЧЕСКАЯ ИНФОРМАЦИЯ",
  },
  {
    key: 5,
    name: "ОБЪЕМ ПОСТАВКИ",
  },
  // {
  //   key: 6,
  //   name: "Six",
  // },
  // {
  //   key: 7,
  //   name: "Seven",
  // },
  // {
  //   key: 8,
  //   name: "Eight",
  // },
  // {
  //   key: 9,
  //   name: "Nine",
  // },
  // {
  //   key: 10,
  //   name: "Ten",
  // },
];

export const Tabs: FC = () => {
  const containerRef = useRef<HTMLDivElement>(null);

  const containerVisibleWidth = useRef<number>(0); //достаточно ли свободного места для видимых вкладок
  const actionElementsWidth = useRef<number[]>([]);
  const moreBtnLeftPosition = useRef<number>(0); //помогут нам постоянно обновлять положение кнопки

  const [actionsMoreList, setActionsMoreList] = useState<IActionsList[]>([]);
  const [isMoreOpen, setIsMoreOpen] = useState(false);

  const calculateVisibility = (actionElements: HTMLDivElement[]) => {
    // variable for actual visible tabs width + gaps between tabs calculations
    // to define if the next tab has a free space to be visible or not
    let visibleElementsWidth = 0;

    // variable for the list of hidden tabs which will be put to react state
    const actionsMoreData: IActionsList[] = [];

    // variable which works as a flag and changes to false with the
    // first hidden tab during actionElements iteration
    let isVisible = true;

    [...actionElements].forEach((actionEl, i) => {
      // necessary gap after the tab

      // const gapWidth = i === actionElements.length - 1 ? 0 : ACTION_BTNS_GAP;

      // visibleElementsWidth will be increased by
      // the corresponding width of the element + gapWidth

      visibleElementsWidth += actionElementsWidth.current[i];
      //  + gapWidth;

      // calculates how much space is necessary for all the previous
      // tabs + the next tab or button "More"
      const visibleSpaceWidth =
        i !== actionElements.length - 1 ? visibleElementsWidth + MORE_BTN_RESERVED_WIDTH : visibleElementsWidth;

      // compare if container's actual width is enough to show all
      // the elements that need space equal to visibleSpaceWidth width
      if (visibleSpaceWidth <= containerVisibleWidth.current && isVisible) {
        // add classNames for visible tabs
        actionEl.className = `${styles.action} ${styles.visible}`;
      } else {
        if (isVisible) {
          // calculate left property for button "More" which has
          // absolute position
          moreBtnLeftPosition.current = actionElementsWidth.current.slice(0, i).reduce((acc, item) => item + acc, 0);
          // + ACTION_BTNS_GAP * i;

          // set isVisible to false for the first hidden tab
          isVisible = false;
        }
        // add classNames for hidden tabs
        actionEl.className = `${styles.action} ${styles.hidden}`;

        // update actionsMoreData with the new hidden tab's data
        actionsMoreData.push(ACTIONS_LIST[i]);
      }
    });

    // update React state with the list of hidden tabs
    setActionsMoreList([...actionsMoreData]);
  };

  useEffect(() => {
    if (actionElementsWidth?.current && containerRef?.current) {
      const actionElements: HTMLDivElement[] | [] =
        (Array.from(containerRef.current.children) as HTMLDivElement[]) || [];

      // defining the actual width of each tab
      const actionsListWidth: number[] = [];
      [...actionElements].forEach((actionEl) => {
        actionsListWidth.push(actionEl.offsetWidth);
      });

      // update the array with all the tabs width numbers,
      // stored inside actionElementsWidth ref
      actionElementsWidth.current = [...actionsListWidth];

      const resizeObserver = new ResizeObserver((entries) => {
        for (const entry of entries) {
          if (entry.contentBoxSize) {
            const contentBoxSize = entry.contentBoxSize[0];

            // Math.ceil is necessary to round up and return
            // the smallest integer for the size of observed element
            containerVisibleWidth.current = Math.ceil(contentBoxSize.inlineSize);

            // invoke the functions which calculates tabs visibility
            // and sets data to the list of hidden tabs
            calculateVisibility(actionElements);
          }
        }
      });

      // adding ResizeObserver to the observed container
      resizeObserver.observe(containerRef.current);
    }
  }, []);

  return (
    <div className={styles.wrapper}>
      <div className={styles["actions-wrapper"]}>
        <div
          className={styles["main-actions"]}
          // style={{ gap: ACTION_BTNS_GAP }}
          ref={containerRef}
        >
          {ACTIONS_LIST.map((action) => (
            <div key={action.key} className={styles.action}>
              {action.name}
            </div>
          ))}
        </div>

        <div
          className={cn(styles["more-btn"], actionsMoreList.length ? styles.visible : styles.hidden)}
          style={{ left: moreBtnLeftPosition.current }}
          onClick={() => setIsMoreOpen(!isMoreOpen)}
        >
          More...
        </div>
      </div>

      <div
        className={cn(styles["more-options"], isMoreOpen ? styles.visible : styles.hidden)}
      >
        {actionsMoreList.map((action) => (
          <div className={styles.action} key={action.key}>
            {action.name}
          </div>
        ))}
      </div>
    </div>
  );
};

// const [toggle, setToggle] = useState("");
// const tabsRef = useRef<HTMLUListElement>(null);
// const [isMobile, setIsMobile] = useState(false);
// console.log(isMobile);

// useEffect(() => {
//   const checkMobile = window.innerWidth > 500 ? false : true;
//   setIsMobile(checkMobile);
// }, []);

// let isMouseDown: boolean = false;
// let startX: number = 0;
// let scrollLeft: number = 0;

// const handleMouseDown = (event: MouseEvent<HTMLUListElement>) => {
//   isMouseDown = true;
//   if (!tabsRef.current) return;
//   startX = event.pageX - tabsRef.current.offsetLeft;
//   scrollLeft = tabsRef.current.scrollLeft;
//   console.log(scrollLeft);
// };

// const handleMouseUp = () => {
//   isMouseDown = false;
// };

// const handleMouseMove = (event: MouseEvent<HTMLUListElement>) => {
//   if (!isMouseDown || !tabsRef.current) return;
//   event.preventDefault();
//   const x = event.pageX - tabsRef.current.offsetLeft;
//   const walk = x - startX; // Задаем скорость прокрутки, умножая разницу на коэффициент
//   tabsRef.current.scrollLeft = scrollLeft - walk;
// };

// const getTabHandles = () => {
//   if (!isMobile) {
//     return {
//       onMouseDown: handleMouseDown,
//       onMouseUp: handleMouseUp,
//       onMouseLeave: handleMouseUp,
//       onMouseMove: handleMouseMove,
//     };
//   } else return {};
// };

// return (
//   <div className={styles.wrapper}>
//     <ul ref={tabsRef} className={cn(styles.tabs)} {...getTabHandles()}>
//       {tabsTitle.map((text, index) => {
//         return (
//           <li key={index} onClick={() => setToggle(text)} className={toggle === text ? styles["tabs-active"] : ""}>
//             <p className="nav-link-text">{text}</p>
//           </li>
//         );
//       })}
//     </ul>
//     <ul className={styles.content}>
//       <li className="text-md">
//         <p>КОЛИЧЕСТВО В ЯЩИКЕ</p>
//         <p>5</p>
//       </li>
//       <li className="text-md">
//         <p>РАЗМЕРЫ ЯЩИКА</p>
//         <p>0,153 m³</p>
//       </li>
//       <li className="text-md">
//         <p>ВЕС ЯЩИКА</p>
//         <p>15,50 kg.</p>
//       </li>
//     </ul>
//   </div>
// )

export default Tabs;
