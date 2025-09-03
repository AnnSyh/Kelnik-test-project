import { defineStore } from 'pinia'

export interface Apartment {
id: number
  title: string
  price: number
  area: number
  rooms: number
  floor: number
  image: string
}

export const useApartmentsStore = defineStore('apartments', {
  state: () => ({
    apartments: [] as Apartment[],
    visibleCount: 5,
    loading: false,
    error: null as string | null,
    filters: {
      price: { min: null as number | null, max: null as number | null },
      area: { min: null as number | null, max: null as number | null },
      floor: { min: null as number | null, max: null as number | null },
      rooms: null as number | null
    },
  }),

  getters: {
    visibleApartments: (state) => {
      return state.apartments.slice(0, state.visibleCount)
    },
    hasMoreApartments: (state) => {
      return state.visibleCount < state.apartments.length
    }
  },

  actions: {
    async loadApartments() {
      if (this.apartments.length > 0) return
      
      this.loading = true
      this.error = null
      
      try {
        const data = await import('../data/apartments.json')
        this.apartments = data.default
      } catch (err) {
        this.error = 'Failed to load apartments'
        console.error('Load error:', err)
      } finally {
        this.loading = false
      }
    },

    async loadMore() {
      if (this.loading || !this.hasMoreApartments) return

      this.loading = true
      this.error = null

      try {
        await new Promise(resolve => setTimeout(resolve, 1000))
        this.visibleCount += 5
      } catch (error) {
        this.error = 'Ошибка загрузки'
      } finally {
        this.loading = false
      }
    },

    setPriceFilter(priceFilter: { min: number | null; max: number | null }) {
      this.filters.price = priceFilter
    },
  }
})