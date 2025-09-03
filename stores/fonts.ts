import { defineStore } from 'pinia'

interface FontState {
  isFontLoaded: boolean
  fontFamily: string
}

export const useFontStore = defineStore('fonts', {
  state: (): FontState => ({
    isFontLoaded: false,
    fontFamily: 'PT Root UI'
  }),

  actions: {
    setFontLoaded(loaded: boolean) {
      this.isFontLoaded = loaded
    },
    
    // Метод для проверки загрузки шрифта
    async checkFontLoad() {
      if (typeof document !== 'undefined') {
        await document.fonts.ready
        this.setFontLoaded(true)
      }
    }
  },

  getters: {
    getFontFamily: (state) => state.fontFamily,
    getIsFontLoaded: (state) => state.isFontLoaded
  }
})