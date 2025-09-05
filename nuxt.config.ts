export default defineNuxtConfig({
  app: {
    head: {
      title: 'Kelnik-test',
      titleTemplate: '%s | Flats',
      charset: 'utf-8',
      viewport: 'width=device-width, initial-scale=1',
      link: [],
      lang: 'ru' 
    }
  },
  
  experimental: {
    payloadExtraction: false // Отключает автоматическое извлечение payload
  },
  
  render: {
    resourceHints: false // Полностью отключает prefetch/preload подсказки
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