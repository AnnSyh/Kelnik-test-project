// plugins/pinia.ts
import { defineNuxtPlugin } from '#app'
import pinia from '../stores'

export default defineNuxtPlugin((nuxtApp) => {
  nuxtApp.vueApp.use(pinia)
})