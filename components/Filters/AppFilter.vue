<template>
  <div class="filter" :class="{ 'filter--loading': filterLoading, 'filter--blocked': isBlocked }">

    <!-- Фильтр комнат -->
    <div class="filter__list">
        <button
            v-for="room in availableRooms"
            :key="room"
            class="filter__room"
            :class="{
            'filter__room_active': store.filters.rooms === room,
            'filter__room_disabled': isBlocked
            }"
            :disabled="isBlocked"
            @click="handleRoomsChange(room)"
        >
            <span class="filter__room-link">{{ room }}</span> 
        </button>
    </div>

    <!-- Фильтр цены -->
    <div class="filter__green-block">
      <div class="flat-price">Стоимость квартиры, ₽</div>
      <SliderElement
        :model-value="priceRange"
        :min="0"
        :max="20000000"
        :step="1000000"
        :merge="25"
        :disabled="isBlocked"
        @update:modelValue="handlePriceChange"
      />
    </div>
    
    <!-- Фильтр площади -->
    <div class="filter__green-block">
      <div class="flat-price">Площадь, м²</div>
      <AreaSlider
        :model-value="areaRange"
        :min="0"
        :max="200"
        :step="5"
        :merge="10"
        :disabled="isBlocked"
        @update:modelValue="handleAreaChange"
      />
    </div>
    
    <!-- Кнопка сброса -->
    <button 
      @click="handleReset" 
      class="btn btn-icon"
      :disabled="isBlocked"
    >
      <span>Сбросить параметры</span>
      <svg width="8" height="8" viewBox="0 0 8 8" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path fill-rule="evenodd" clip-rule="evenodd" d="M3.99996 5.22223L1.37727 7.84492C1.12213 8.10007 0.641687 8.0333 0.304183 7.6958C-0.0333213 7.35829 -0.100086 6.87786 0.15506 6.62271L2.77775 4.00002L0.155017 1.37729C-0.100129 1.12214 -0.0333644 0.641701 0.30414 0.304197C0.641644 -0.0333071 1.12208 -0.100072 1.37723 0.155074L3.99996 2.77781L6.62282 0.154956C6.87796 -0.10019 7.3584 -0.0334256 7.6959 0.304079C8.03341 0.641583 8.10017 1.12202 7.84503 1.37717L5.22217 4.00002L7.84498 6.62283C8.10013 6.87797 8.03336 7.35841 7.69586 7.69592C7.35836 8.03342 6.87792 8.10019 6.62277 7.84504L3.99996 5.22223Z" fill="#FF0000"/>
        <path fill-rule="evenodd" clip-rule="evenodd" d="M3.99996 5.22223L1.37727 7.84492C1.12213 8.10007 0.641687 8.0333 0.304183 7.6958C-0.0333213 7.35829 -0.100086 6.87786 0.15506 6.62271L2.77775 4.00002L0.155017 1.37729C-0.100129 1.12214 -0.0333644 0.641701 0.30414 0.304197C0.641644 -0.0333071 1.12208 -0.100072 1.37723 0.155074L3.99996 2.77781L6.62282 0.154956C6.87796 -0.10019 7.3584 -0.0334256 7.6959 0.304079C8.03341 0.641583 8.10017 1.12202 7.84503 1.37717L5.22217 4.00002L7.84498 6.62283C8.10013 6.87797 8.03336 7.35841 7.69586 7.69592C7.35836 8.03342 6.87792 8.10019 6.62277 7.84504L3.99996 5.22223Z" fill="#0B1739"/>
      </svg>
    </button>
  </div>
</template>

<script setup lang="ts">
import { computed } from 'vue'
import { useApartmentsStore } from '@/stores/apartments.store'
import SliderElement from '@/components/Filters/SliderElement.vue'
import AreaSlider from '@/components/Filters/AreaSlider.vue'

const store = useApartmentsStore()

// Состояние блокировки и загрузки
const isBlocked = computed(() => store.isBlocked)
const filterLoading = computed(() => store.filterLoading)

// Вычисляемые значения для слайдеров
const priceRange = computed(() => [
  store.filters.price.min ?? 1000000,
  store.filters.price.max ?? 10000000
])

const areaRange = computed(() => [
  store.filters.area.min ?? 30,
  store.filters.area.max ?? 100
])

// Доступные варианты комнат
const availableRooms = computed(() => {
  const rooms = new Set<number>()
  
  store.apartments.forEach(apartment => {
    if (apartment.rooms) {
      rooms.add(apartment.rooms)
    }
  })
  
  return Array.from(rooms).sort()
})

// Обработчики изменений
const handlePriceChange = (range: [number, number]) => {
  if (isBlocked.value) return
  store.setPriceFilter({
    min: range[0],
    max: range[1]
  })
}

const handleAreaChange = (range: [number, number]) => {
  if (isBlocked.value) return
  store.setAreaFilter({
    min: range[0],
    max: range[1]
  })
}

const handleRoomsChange = (room: number) => {
  if (isBlocked.value) return
  store.setRoomsFilter(store.filters.rooms === room ? null : room)
}

const handleReset = () => {
  if (isBlocked.value) return
  store.resetFilters()
}
</script>