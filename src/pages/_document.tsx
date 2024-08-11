import Document, { DocumentContext, DocumentInitialProps, Head, Html, Main, NextScript } from "next/document";

import i18nextConfig from "../../next-i18next.config.js";

class MyDocument extends Document {
  static getInitialProps = async (ctx: DocumentContext): Promise<DocumentInitialProps> => {
    const initialProps = await Document.getInitialProps(ctx);
    return { ...initialProps };
  };

  render(): JSX.Element {
    const currentLocale = this.props.__NEXT_DATA__.locale || i18nextConfig.i18n.defaultLocale;

    // Устанавливает класс направления тела документа при изменении языка
    const isRtl = currentLocale === "ar" ? "content-rtl" : "";

    return (
      <Html lang={currentLocale}>
        <Head>
          <link rel="apple-touch-icon" sizes="180x180" href="/apple-touch-icon.png" />
          <link rel="icon" type="image/png" sizes="32x32" href="/favicon-32x32.png" />
          <link rel="icon" type="image/png" sizes="192x192" href="/android-chrome-192x192.png" />
          <link rel="icon" type="image/png" sizes="16x16" href="/favicon-16x16.png" />
          <link rel="manifest" href="/site.webmanifest" />
          <link rel="mask-icon" href="/safari-pinned-tab.svg" color="#2176ea" />
          <meta name="apple-mobile-web-app-title" content="Nova Plastik" />
          <meta name="application-name" content="Nova Plastik" />
          <meta name="msapplication-TileColor" content="#2d89ef" />
          <meta name="msapplication-TileImage" content="/mstile-144x144.png" />
          <meta name="theme-color" content="#ffffff" />

          {/* <!-- Primary Meta Tags --> */}
          <meta name="title" content="Nova Plastik - Ваш надежный поставщик сантехники" />
          <meta
            name="description"
            content="Ознакомьтесь с широким ассортиментом высококачественной сантехники и приспособлений по выгодным ценам. Покупайте смесители, раковины, трубы и многое другое от ведущих брендов. Быстрая доставка и отличное обслуживание клиентов."
          />

          {/* <!-- Open Graph / Facebook --> */}
          <meta property="og:type" content="website" />
          <meta property="og:url" content="https://novaplastik.uz" />
          <meta property="og:title" content="Nova Plastik - Ваш надежный поставщик сантехники" />
          <meta
            property="og:description"
            content="Ознакомьтесь с широким ассортиментом высококачественной сантехники и приспособлений по выгодным ценам. Покупайте смесители, раковины, трубы и многое другое от ведущих брендов. Быстрая доставка и отличное обслуживание клиентов."
          />
          <meta property="og:image" content="https://i.ibb.co/vBDgkb0/novaplastik-1440x1700-rounded-minify.webp" />

          {/* <!-- Twitter --> */}
          <meta property="twitter:card" content="summary_large_image" />
          <meta property="twitter:domain" content="novaplastik.uz" />
          <meta property="twitter:url" content="https://novaplastik.uz" />
          <meta property="twitter:title" content="Nova Plastik - Ваш надежный поставщик сантехники" />
          <meta
            property="twitter:description"
            content="Ознакомьтесь с широким ассортиментом высококачественной сантехники и приспособлений по выгодным ценам. Покупайте смесители, раковины, трубы и многое другое от ведущих брендов. Быстрая доставка и отличное обслуживание клиентов."
          />
          <meta property="twitter:image" content="https://i.ibb.co/vBDgkb0/novaplastik-1440x1700-rounded-minify.webp" />

          <meta
            name="keywords"
            content="сантехника, сантехнические изделия, nova, nova plastik, трубы, фитинги, смесители, ванны, унитазы, аксессуары для ванной комнаты, кухонные мойки, водонагреватели, дренажные системы"
          />

          <meta name="robots" content="index, follow" />
          <meta httpEquiv="Content-Type" content="text/html; charset=utf-8" />
          <meta name="language" content="Russian" />
        </Head>
        <body className={isRtl}>
          <Main />
          <NextScript />
        </body>
      </Html>
    );
  }
}

export default MyDocument;
