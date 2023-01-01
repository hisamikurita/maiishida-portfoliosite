const { API_KEY, SERVICE_URL } = process.env;

// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  runtimeConfig: {
    serviceUrl: SERVICE_URL,
    apiKey: API_KEY,
    public: {
      serviceUrl:
        process.env.NODE_ENV !== "production" ? SERVICE_URL : undefined,
      apiKey: process.env.NODE_ENV !== "production" ? API_KEY : undefined,
    },
  },
  // global css
  css: ["/assets/scss/global.scss"],
  // single css
  vite: {
    css: {
      preprocessorOptions: {
        scss: {
          additionalData: '@import "@/assets/scss/single.scss";',
        },
      },
    },
  },
  app: {
    head: {
      title: "Mai Ishida Portfolio",
      meta: [{ name: "description", content: "Nuxt 3 for beginners" }],
      link: [{ rel: "icon", href: "/favicon.ico" }],
    },
  },
  modules: ["@nuxtjs/google-fonts", "nuxt-icons"],
  googleFonts: {
    families: {
      Almarai: [400],
    },
  },
});
