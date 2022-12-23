// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  css: ["/assets/css/style.css"],
  app: {
    head: {
      title: "Nuxt 3 basic",
      meta: [{ name: "description", content: "Nuxt 3 for beginners" }],
      link: [{ rel: "icon", href: "/favicon.ico" }],
    },
  },
});
