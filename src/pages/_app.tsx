import { appWithTranslation } from "next-i18next";
import type { AppProps } from "next/app";

import i18nextConfig from "../../next-i18next.config.js";
import type { DEFAULT_TENANT } from "../../tenant.config";

import { TenantProvider } from "@/contexts/tenant.context";

import "@/styles/globals.scss";
// import "react-image-gallery/styles/css/image-gallery.css";

// Import Swiper styles
import "swiper/css";
import "swiper/css/pagination";
import "@/styles/slider/slider.scss";
import "@/styles/gallery/gallery.scss";

interface AppPagePropsWithTenant {
  tenant?: typeof DEFAULT_TENANT;
}

const App = ({ Component, pageProps }: AppProps) => {
  const { tenant } = pageProps as AppPagePropsWithTenant;

  return (
    <TenantProvider tenant={tenant}>
      <Component {...pageProps} />
    </TenantProvider>
  );
};

export default appWithTranslation(App, i18nextConfig);
