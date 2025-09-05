<template>
    <div class="row">
        <div class="col col-12 col-lg-8 col-content">
            <div class="page-header">
                <h1>Квартиры</h1>
                <span>Найдено: {{ filteredApartments.length }} из {{ store.apartments.length }}</span>
            
            </div>
            <!-- --------------- -->
            <div class="table-head">
                <div class="tcol tcol-1"><span class="text-hidden-lg">Планировка</span></div>
                <div class="tcol tcol-2">Квартира</div>
                <div class="tcol tcol-3">S, м²</div>
                <div class="tcol tcol-4">Этаж</div>
                <div class="tcol tcol-5">Цена, ₽</div>
            </div>
            <!-- Результаты -->
            <div v-if="store.loading" class="loading">Загрузка...</div>
            <div v-else-if="store.error" class="error">{{ store.error }}</div>
            
            <div v-else>
                <div v-if="filteredApartments.length === 0" class="no-results">
                    Квартиры по заданным фильтрам не найдены
                </div>
             
                <ApartmentsList :apartments="filteredApartments"/>
            </div>
             <ScrollToTop />
        </div>
        <div class="col col-12 col-lg-4 col-filters">
            <!-- Фильтры -->
            <div class="filter">
                <RoomFilter 
                    v-model="filters.rooms" 
                    :available-rooms="availableRooms"
                />

                <div class="filter__green-block">
                    <div class="flat-price">Стоимость квартиры, ₽</div>
                    <SliderElement
                        v-model="filters.priceRange"
                        :min="0"
                        :max="20000000"
                        :step="1000000"
                        :merge="25"
                        :default="[0, 18900000]"
                        @change="handlePriceChange"
                    />
                </div>
                <div class="filter__green-block">
                    <div class="flat-price">Площадь, м²</div>
                    <AreaSlider
                        v-model="filters.areaRange"
                        :min="0"
                        :max="200"
                        :step="5"
                        :merge="10"
                        :default="[3, 100]"
                        @change="handleAreaChange"
                    />
                </div>
                <button @click="resetFilters" class="btn btn-icon">
                    <span>Сбросить параметры</span>
                    <svg width="8" height="8" viewBox="0 0 8 8" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path fill-rule="evenodd" clip-rule="evenodd" d="M3.99996 5.22223L1.37727 7.84492C1.12213 8.10007 0.641687 8.0333 0.304183 7.6958C-0.0333213 7.35829 -0.100086 6.87786 0.15506 6.62271L2.77775 4.00002L0.155017 1.37729C-0.100129 1.12214 -0.0333644 0.641701 0.30414 0.304197C0.641644 -0.0333071 1.12208 -0.100072 1.37723 0.155074L3.99996 2.77781L6.62282 0.154956C6.87796 -0.10019 7.3584 -0.0334256 7.6959 0.304079C8.03341 0.641583 8.10017 1.12202 7.84503 1.37717L5.22217 4.00002L7.84498 6.62283C8.10013 6.87797 8.03336 7.35841 7.69586 7.69592C7.35836 8.03342 6.87792 8.10019 6.62277 7.84504L3.99996 5.22223Z" fill="#FF0000"/>
                        <path fill-rule="evenodd" clip-rule="evenodd" d="M3.99996 5.22223L1.37727 7.84492C1.12213 8.10007 0.641687 8.0333 0.304183 7.6958C-0.0333213 7.35829 -0.100086 6.87786 0.15506 6.62271L2.77775 4.00002L0.155017 1.37729C-0.100129 1.12214 -0.0333644 0.641701 0.30414 0.304197C0.641644 -0.0333071 1.12208 -0.100072 1.37723 0.155074L3.99996 2.77781L6.62282 0.154956C6.87796 -0.10019 7.3584 -0.0334256 7.6959 0.304079C8.03341 0.641583 8.10017 1.12202 7.84503 1.37717L5.22217 4.00002L7.84498 6.62283C8.10013 6.87797 8.03336 7.35841 7.69586 7.69592C7.35836 8.03342 6.87792 8.10019 6.62277 7.84504L3.99996 5.22223Z" fill="#0B1739"/>
                    </svg>
                </button>
            </div>
            <!-- /Фильтры -->
        </div>
    </div>
</template>

<script setup lang="ts">
import { ref, computed, onMounted } from 'vue'
import { useApartmentsStore } from '../stores/apartments.store'
import RoomFilter from '@/components/Filters/RoomFilter.vue'
import AreaSlider from '@/components/Filters/AreaSlider.vue'
import SliderElement from '@/components/Filters/SliderElement.vue'
import ScrollToTop from '@/components/ScrollToTop.vue'
import ApartmentsList from '@/components/ApartmentsList.vue'

// const store = useApartmentsStore()

// const filters = ref({
//   priceRange: [1000000, 10000000] as [number, number],
//   areaRange: [30, 100] as [number, number],
//   rooms: null
// })

onMounted(() => {
  store.loadApartments()
})

const handlePriceChange = (priceRange: [number, number]) => {
  store.setPriceFilter({
    min: priceRange[0],
    max: priceRange[1]
  })
}

const handleAreaChange = (areaRange: [number, number]) => {
  store.filters.area = {
    min: areaRange[0],
    max: areaRange[1]
  }
}

const store = useApartmentsStore()

const filters = ref({
  priceRange: [1000000, 10000000] as [number, number],
  areaRange: [30, 100] as [number, number],
  rooms: null
})

// Вычисляем доступные варианты комнат
const availableRooms = computed(() => {
  const rooms = new Set<number>()
  
  store.apartments.forEach(apartment => {
    if (apartment.rooms) {
      rooms.add(apartment.rooms)
    }
  })
  
  return Array.from(rooms).sort()
})

// Отфильтрованные квартиры
const filteredApartments = computed(() => {
  if (!store.apartments.length) return []

  return store.apartments.filter(apartment => {
    // Фильтр по цене
    const priceMin = store.filters.price.min ?? filters.value.priceRange[0]
    const priceMax = store.filters.price.max ?? filters.value.priceRange[1]
    if (apartment.price < priceMin) return false
    if (apartment.price > priceMax) return false

    // Фильтр по площади
    const areaMin = store.filters.area.min ?? filters.value.areaRange[0]
    const areaMax = store.filters.area.max ?? filters.value.areaRange[1]
    if (apartment.area < areaMin) return false
    if (apartment.area > areaMax) return false

    // Фильтр по комнатам
    if (filters.value.rooms !== null && apartment.rooms !== filters.value.rooms) return false

    return true
  })
})

// Сброс фильтров
const resetFilters = () => {
  filters.value = {
    priceRange: [1000000, 10000000],
    areaRange: [30, 100],
    rooms: null
  }
  store.filters = {
    price: { min: null, max: null },
    area: { min: null, max: null },
    rooms: null
  }
}
</script>