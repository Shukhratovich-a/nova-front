import i18next from "i18next";
import { initReactI18next } from "react-i18next";
import Backend from "i18next-http-backend";
// import I18nextBrowserLanguageDetector from "i18next-browser-languagedetector";

i18next
  .use(initReactI18next)
  .use(Backend)
  // .use(I18nextBrowserLanguageDetector)
  .init({
    fallbackLng: "ru",
    supportedLngs: ["en", "ru", "ar", "tr"],

    detection: {
      caches: ["cookie"],
      order: ["cookie"],
    },

    backend: {
      loadPath: "/locales/{{lng}}/{{ns}}.json",
      crossDomain: true,
    },
  });

export default i18next;
