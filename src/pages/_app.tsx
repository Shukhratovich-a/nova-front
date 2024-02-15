import type { AppProps } from "next/app";
import { appWithTranslation } from "next-i18next";

import "@/styles/globals.scss";

// Import Swiper styles
import "swiper/css";
import "swiper/css/pagination";
import "@/styles/slider/slider.scss";

import "@/utils/i18n";

const App = ({ Component, pageProps }: AppProps) => {
  return <Component {...pageProps} />;
};

export default appWithTranslation(App);
