export default defineNuxtConfig({
  modules: [
    '@pinia/nuxt',
  ],
  
  // Автоимпорты
  imports: {
    dirs: [
      'stores',
      'composables',
      'types'
    ]
  },
  
  // Алиасы (не обязательны, но удобны)
  alias: {
    '@': '.',
    '~': '.'
  },
  
  typescript: {
    strict: true
  }
})