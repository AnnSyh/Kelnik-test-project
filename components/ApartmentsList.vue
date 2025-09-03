<template>
  <div class="apartments-container">
    <!-- Список квартир -->
      <ApartmentCard
        v-for="apartment in visibleApartments" 
        :key="apartment.id"
        :apartment="apartment"
        class="apartment-item"
      />

    <!-- Состояние загрузки -->
    <div v-if="loading" class="loading">
      <div class="loading-spinner"></div>
      <span>Загрузка...</span>
    </div>

    <!-- Сообщение об ошибке -->
    <div v-else-if="error" class="error-message">
      {{ error }}
    </div>

    <!-- Кнопка "Загрузить еще" -->
    <div v-else-if="hasMoreApartments" >
      <button
        @click="loadMore"
        class="load-more-btn"
        :disabled="loading"
      >
        <span v-if="!loading">Загрузить еще</span>
        <span v-else>Загрузка...</span>
      </button>
    </div>

    <!-- Сообщение когда все квартиры загружены -->
    <div v-else-if="apartments.length > 0" class="all-loaded">
      Все квартиры загружены
    </div>

    <!-- Сообщение когда квартир нет -->
    <div v-else class="no-apartments">
      Квартиры не найдены
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, computed } from 'vue'
import ApartmentCard from './ApartmentCard.vue'

const props = defineProps<{
  apartments: any[]  // Принимаем отфильтрованные квартиры
}>()

const loading = ref(false)
const error = ref<string | null>(null)
const visibleCount = ref(5) // Начальное количество отображаемых квартир

// Видимые квартиры (с пагинацией)
const visibleApartments = computed(() => {
  return props.apartments.slice(0, visibleCount.value)
})

// Есть ли еще квартиры для загрузки
const hasMoreApartments = computed(() => {
  return visibleCount.value < props.apartments.length
})

const loadMore = () => {
  // Увеличиваем количество отображаемых квартир
  visibleCount.value += 5
}
</script>