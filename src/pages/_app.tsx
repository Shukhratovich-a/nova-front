import { appWithTranslation } from "next-i18next";
import type { AppProps } from "next/app";

import i18nextConfig from "../../next-i18next.config.js";

import "@/styles/globals.scss";
// import "react-image-gallery/styles/css/image-gallery.css";

// Import Swiper styles
import "swiper/css";
import "swiper/css/pagination";
import "@/styles/slider/slider.scss";
import "@/styles/gallery/gallery.scss";

const App = ({ Component, pageProps }: AppProps) => {
  return <Component {...pageProps} />;
};

export default appWithTranslation(App, i18nextConfig);
