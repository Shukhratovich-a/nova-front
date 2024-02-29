import cn from "classnames";
import { FC, useEffect, useRef, useState } from "react";
import styles from "./tabs.module.scss";
import { ITabsList } from "./tabs.props";

const tabs: ITabsList[] = [
  {
    id: 1,
    title: "Технические характеристики",
    content: [
      { name: "Разрешение", value: "1920x1080" },
      { name: "Частота обновления", value: "60 Гц" },
      { name: "Яркость", value: "250 кд/м²" },
      { name: "Яркость", value: "250 кд/м²" },
      { name: "Контрастность", value: "1000:1" },
      { name: "Контрастность", value: "1000:1" },
    ],
  },
  {
    id: 2,
    title: "Применение",
    content: [
      { name: "Офис", value: "Идеально подходит для рабочих пространств" },
      { name: "Игры", value: "Предлагает плавное изображение без задержек" },
      { name: "Развлечения", value: "Поддерживает качественное видео" },
      { name: "Творчество", value: "Точное воспроизведение цветов" },
    ],
  },
  {
    id: 3,
    title: "Функции",
    content: [
      { name: "Автоматическая подстройка яркости", value: "Для комфортного чтения при разных условиях освещения" },
      { name: "Автоматическая подстройка яркости", value: "Для комфортного чтения при разных условиях освещения" },
      { name: "Режим защиты глаз", value: "Минимизирует напряжение на глазах в течение долгого времени" },
      { name: "Специальные режимы цветопередачи", value: "Подходит для работы с графикой и фотографиями" },
      { name: "Встроенные динамики", value: "Для удобства прослушивания аудио" },
    ],
  },
  {
    id: 4,
    title: "Логистическая информация",
    content: [
      { name: "Размеры упаковки", value: "50x30x10 см" },
      { name: "Вес упаковки", value: "3 кг" },
      { name: "Количество в коробке", value: "1 шт." },
      { name: "Страна производства", value: "Китай" },
    ],
  },
  {
    id: 5,
    title: "Гарантия",
    content: [
      { name: "Срок", value: "24 месяца" },
      { name: "Условия", value: "По умолчанию" },
      { name: "Документация", value: "Сертификат" },
      { name: "Сервисные центры", value: "По всему миру" },
    ],
  },
  {
    id: 6,
    title: "Инструкции по установке",
    content: [
      { name: "Шаг 1", value: "Подключите устройство к питанию" },
      { name: "Шаг 2", value: "Установите необходимые драйвера" },
      { name: "Шаг 3", value: "Настройте параметры экрана" },
      { name: "Шаг 4", value: "Готово! Начните использование" },
    ],
  },
  {
    id: 7,
    title: "Руководство пользователя",
    content: [
      { name: "Начало работы", value: "Ознакомьтесь с основными функциями" },
      { name: "Настройки", value: "Подберите параметры под свои предпочтения" },
      { name: "Техническая поддержка", value: "Получите помощь при возникновении вопросов" },
      { name: "Отзывы", value: "Поделитесь своим мнением о продукте" },
    ],
  },
  {
    id: 8,
    title: "Техническая поддержка",
    content: [
      { name: "Контакты поддержки", value: "support@example.com" },
      { name: "Телефон", value: "+1234567890" },
      { name: "Онлайн-чат", value: "Доступен с 9:00 до 18:00 по будням" },
      { name: "Форум поддержки", value: "community.example.com" },
    ],
  },
  {
    id: 9,
    title: "FAQ",
    content: [
      { name: "Вопрос 1", value: "Ответ 1" },
      { name: "Вопрос 2", value: "Ответ 2" },
      { name: "Вопрос 3", value: "Ответ 3" },
      { name: "Вопрос 4", value: "Ответ 4" },
    ],
  },
  {
    id: 10,
    title: "Сертификации",
    content: [
      { name: "ISO", value: "Сертификат соответствия качеству" },
      { name: "CE", value: "Соответствие европейским стандартам" },
      { name: "RoHS", value: "Отсутствие вредных веществ" },
      { name: "FCC", value: "Соответствие стандартам безопасности" },
    ],
  },
];

const MORE_BTN_RESERVED_WIDTH = 90;

export const Tabs: FC = () => {
  const [activeTab, setActiveTab] = useState(tabs[0].id);

  const containerRef = useRef<HTMLDivElement>(null);

  const containerVisibleWidth = useRef<number>(0); //достаточно ли свободного места для видимых вкладок
  const actionElementsWidth = useRef<number[]>([]);

  const [actionsMoreList, setActionsMoreList] = useState<ITabsList[]>([]);
  const [isMoreOpen, setIsMoreOpen] = useState(false);

  const calculateVisibility = (actionElements: HTMLDivElement[]) => {
    let visibleElementsWidth = 0;

    const actionsMoreData: ITabsList[] = [];

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
  };

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
  }, []);

  const getActiveClass = (id: number) => {
    return id === activeTab ? styles.open : styles.close;
  };

  return (
    <div className={styles.wrapper}>
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
              className={cn(styles["more-btn"], actionsMoreList.length ? "" : styles.hidden, "nav-link-text")}
              onClick={() => setIsMoreOpen(!isMoreOpen)}
            >
              More...
            </div>
          </div>
        </div>

        <div className={cn(styles["more-options"], isMoreOpen ? "" : styles.close)}>
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

      <ul className={styles.list}>
        {tabs.map(({ id, title, content }) => {
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
                  {content.map(({ name, value }, iChild) => {
                    return (
                      <li key={iChild} className={styles.block}>
                        <p className={cn(styles.name, "text-md")}>{name}</p>
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