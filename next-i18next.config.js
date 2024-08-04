/** @type {import('next-i18next').UserConfig} */
module.exports = {
  i18n: {
    defaultLocale: "ru",
    locales: [
      "en",
      "ru",
      "tr",
      // ar-off
      "ar",
    ],
  },
  react: { useSuspense: true },

  defaultNS: "translation",
  ns: ["translation", "countries"],
};
