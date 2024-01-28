import type { AppProps } from "next/app";

import "@/styles/globals.scss";

// Import Swiper styles
import 'swiper/css';
import 'swiper/css/pagination';
import "@/styles/slider/slider.scss";

export default function App({ Component, pageProps }: AppProps) {
  return <Component {...pageProps} />;
}
