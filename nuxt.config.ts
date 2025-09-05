export default defineNuxtConfig({
  app: {
    head: {
      htmlAttrs: {
        lang: 'ru',
        dir: 'ltr' // направление текста (ltr - слева направо)
      },
      title: 'Kelnik-test',
      titleTemplate: '%s | Flats',
      charset: 'utf-8',
      viewport: 'width=device-width, initial-scale=1',
      meta: [
        { charset: 'utf-8' },
        { name: 'viewport', content: 'width=device-width, initial-scale=1' },
        { name: 'description', content: 'Описание вашего сайта' }
      ],
      link: [
        { rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' }
      ],
    }, 
  }, 
  
  experimental: {
    payloadExtraction: false
  },
  
  render: {
    resourceHints: false
  },

  css: [
    '@vueform/slider/themes/default.css',
    '@/assets/scss/main.scss',
    '@/assets/css/fonts.css',
  ],

  vite: {
    css: {
      preprocessorOptions: {
        scss: {
          additionalData: `
            @use "@/assets/scss/variables" as *;
            @use "@/assets/scss/mixins" as *;
            @use "@/assets/scss/grid" as *;
          `
        }
      }
    }
  },
  
  typescript: {
    typeCheck: false,
    shim: false
  },
  
  modules: [
    '@pinia/nuxt',
  ],
  
  pinia: {
    autoImports: [
      'defineStore',
      'storeToRefs'
    ]
  },

  imports: {
    dirs: ['./stores']
  },

  build: {
    transpile: ['@vueform/slider']
  },
  
  components: [
    {
      path: '~/components',
      pathPrefix: false,
    },
  ]
})