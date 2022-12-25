// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
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
