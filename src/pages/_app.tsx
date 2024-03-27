import type { AppProps } from "next/app";
import { appWithTranslation, useTranslation } from "next-i18next";
import { useEffect } from "react";

import i18nextConfig from "../../next-i18next.config.js";

import "@/styles/globals.scss";

// Import Swiper styles
import "swiper/css";
import "swiper/css/pagination";
import "@/styles/slider/slider.scss";

const App = ({ Component, pageProps }: AppProps) => {
  return <Component {...pageProps} />;
};

export default appWithTranslation(App, i18nextConfig);
