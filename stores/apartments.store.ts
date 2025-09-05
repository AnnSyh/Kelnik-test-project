import { defineStore } from 'pinia'

export interface Apartment {
  id: number
  title: string
  price: number
  area: number
  rooms: number
  floor: string
  image: string
}

interface Filters {
  price: { min: number | null; max: number | null }
  area: { min: number | null; max: number | null }
  rooms: number | null
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
      rooms: null as number | null
    },
    isBlocked: false, // Блокировка интерфейса
    filterLoading: false, // Загрузка фильтрации
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
        
        // Восстанавливаем фильтры после загрузки данных
        this.restoreFilters()
      } catch (err) {
        this.error = 'Failed to load apartments'
        console.error('Load error:', err)
      } finally {
        this.loading = false
      }
    },

    // Сохраняем фильтры в localStorage
    saveFilters() {
      if (process.client) {
        localStorage.setItem('apartments-filters', JSON.stringify(this.filters))
      }
    },

    // Восстанавливаем фильтры из localStorage
    restoreFilters() {
      if (process.client) {
        const savedFilters = localStorage.getItem('apartments-filters')
        if (savedFilters) {
          this.filters = JSON.parse(savedFilters)
        }
      }
    },

    // Основной метод обновления фильтра с блокировкой
    async updateFilter(payload: Partial<Filters>) {
      // Блокируем если уже идет запрос
      if (this.isBlocked) return
      
      this.isBlocked = true
      this.filterLoading = true
      
      // Обновляем состояние фильтров
      Object.assign(this.filters, payload)
      this.saveFilters()

      try {
        // Отправляем запрос на сервер
        await this.sendFilterRequest()
        
      } catch (error) {
        console.error('Filter request failed:', error)
        this.error = 'Ошибка фильтрации'
      } finally {
        // Разблокируем через небольшой таймаут
        setTimeout(() => {
          this.isBlocked = false
          this.filterLoading = false
        }, 500)
      }
    },

    // Метод отправки запроса на сервер
    async sendFilterRequest() {
      // Имитация запроса к API
      await new Promise(resolve => setTimeout(resolve, 1000))
      
      // Здесь будет реальный запрос к серверу:
      /*
      const { data, error } = await useFetch('/api/filter', {
        method: 'POST',
        body: JSON.stringify(this.filters),
        headers: {
          'Content-Type': 'application/json'
        }
      })

      if (error.value) {
        throw new Error(error.value.message)
      }

      return data.value
      */
      
      console.log('Filter request sent:', this.filters)
      return { success: true }
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
      this.updateFilter({ price: priceFilter })
    },

    setAreaFilter(areaFilter: { min: number | null; max: number | null }) {
      this.updateFilter({ area: areaFilter })
    },

    setRoomsFilter(rooms: number | null) {
      this.updateFilter({ rooms })
    },

    resetFilters() {
      this.filters = {
        price: { min: null, max: null },
        area: { min: null, max: null },
        rooms: null
      }
      this.saveFilters()
      this.updateFilter({})
    }
  }
})