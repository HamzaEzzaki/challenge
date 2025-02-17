// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  compatibilityDate: '2024-11-01',
  devtools: { enabled: true },
  css: ['@/assets/css/main.css'],
  modules: ['@nuxt/icon', '@nuxtjs/tailwindcss','@pinia/nuxt'],
  tailwindcss: {
    exposeConfig: true,
  },
  nitro: {
    devProxy: {
      '/api': {
        target: 'https://jsonplaceholder.leadsbounty.com',
        changeOrigin: true,
        prependPath: true,
      }
    }
  },
  app: {
    head: {
      link: [
        {
          rel: 'stylesheet',
          href: 'https://fonts.googleapis.com/css2?family=Avenir:wght@100;300;400;500;700&display=swap',
        },
      ],
    },
  },
  build: {
    transpile: ['vue3-apexcharts']
  },
  plugins: [
    { src: '~/plugins/apexcharts.js', mode: 'client' }
  ]
  
})
