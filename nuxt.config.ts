export default defineNuxtConfig({
  app: {
    head: {
      title: 'Kelnik-test',
      titleTemplate: '%s | Flats',
      charset: 'utf-8',
      viewport: 'width=device-width, initial-scale=1',
      link: []
    }
  },

  // Добавьте эти настройки
  experimental: {
    payloadExtraction: false // Отключает автоматическое извлечение payload
  },
  
  // Отключаем resource hints
  render: {
    resourceHints: false // Полностью отключает prefetch/preload подсказки
  },

  // Уберите или закомментируйте features, так как они не работают как ожидается
  // features: {
  //   preload: false,
  //   prefetch: false
  // },

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
  }
})