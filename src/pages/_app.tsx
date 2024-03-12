import type { AppProps } from "next/app";
import { appWithTranslation, useTranslation } from "next-i18next";
import { useEffect } from "react";

import "@/styles/globals.scss";

// Import Swiper styles
import "swiper/css";
import "swiper/css/pagination";
import "@/styles/slider/slider.scss";

const App = ({ Component, pageProps }: AppProps) => {
  const { i18n } = useTranslation();

  // Устанавливаем класс направления тела документа при изменении языка
  useEffect(() => {
    if (i18n.language === "ar") {
      document.body.classList.add("content-rtl");
    } else {
      document.body.classList.remove("content-rtl");
    }
  }, [i18n.language]);

  return <Component {...pageProps} />;
};

export default appWithTranslation(App);
