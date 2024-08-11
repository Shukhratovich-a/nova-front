/** @type {import('next-i18next').UserConfig} */
module.exports = {
  i18n: {
    defaultLocale: process.env.DEFAULT_LANG || "en",
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
