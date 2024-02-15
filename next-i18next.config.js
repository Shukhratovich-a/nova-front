/** @type {import('next-i18next').UserConfig} */
module.exports = {
  i18n: {
    defaultLocale: "ru",
    locales: ["en", "ru", "tr", "ar"],
  },
  react: { useSuspense: true },

  defaultNS: "common",
  ns: ["common", "header", "inputs", "catalog", "errors", "product"],
};
