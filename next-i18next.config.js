/** @type {import('next-i18next').UserConfig} */
module.exports = {
  i18n: {
    // Next's i18n.domains requires each locale to belong to exactly one
    // domain, which doesn't fit here — all 4 languages must be selectable
    // on every tenant domain. So the default locale is one global value,
    // not per-tenant; per-tenant defaults were a nice-to-have, not the
    // point of this migration (see tenant.config.js for what IS per-tenant:
    // API domain, WhatsApp phone).
    defaultLocale: process.env.DEFAULT_LOCALE || "ru",
    locales: ["en", "ru", "tr", "ar"],
    localeDetection: false,
  },

  react: { useSuspense: true },
  defaultNS: "translation",
  ns: ["translation", "countries"],
};
