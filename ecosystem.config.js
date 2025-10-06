module.exports = {
  apps: [
    {
      name: "novaplastik-uz",
      script: "node_modules/next/dist/bin/next",
      args: "start -p 4001",
      env: {
        NODE_ENV: "production",
        APP_ENV: "uz",
        NEXT_PUBLIC_DOMAIN: "uz",
        DEFAULT_LANG: "https://api.novaplastik.com/v2/uz",
        NEXT_PUBLIC_WHATSAPP_PHONE: "+998933883042",
      },
    },
    {
      name: "novaplastik-tr",
      script: "node_modules/next/dist/bin/next",
      args: "start -p 4002",
      env: {
        NODE_ENV: "production",
        APP_ENV: "tr",
        NEXT_PUBLIC_DOMAIN: "tr",
        DEFAULT_LANG: "https://api.novaplastik.com/v2/tr",
        NEXT_PUBLIC_WHATSAPP_PHONE: "+905494886682",
      },
    },
    {
      name: "novaplastik-eg",
      script: "node_modules/next/dist/bin/next",
      args: "start -p 4003",
      env: {
        NODE_ENV: "production",
        APP_ENV: "eg",
        NEXT_PUBLIC_DOMAIN: "eg",
        DEFAULT_LANG: "https://api.novaplastik.com/v2/eg",
      },
    },
  ],
};
