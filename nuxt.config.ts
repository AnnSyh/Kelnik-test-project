export default defineNuxtConfig({
// CSS/SCSS файлы
  css: [
    '@vueform/slider/themes/default.css',
    '@/assets/scss/main.scss',
    '@/assets/css/fonts.css',
  ],

    // Дополнительная конфигурация для Vite
  vite: {
    css: {
      preprocessorOptions: {
        scss: {
          // Здесь можно указать дополнительные переменные и миксины,
          // которые будут доступны во всех Vue-компонентах без явного импорта
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