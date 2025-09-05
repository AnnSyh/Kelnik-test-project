<template>
    <div class="row">
        <div class="col col-12 col-lg-4 col-filters">
            <AppFilter />
        </div>
        <div class="col col-12 col-lg-8 col-content">
            <div class="page-header">
                <h1>Квартиры</h1>
                <span>Найдено: {{ filteredApartments.length }} из {{ store.apartments.length }}</span>
                <span><FilterWithLoader /></span> <!-- Блок загрузки фильтра -->
            </div>
            
            
            <div class="table-head">
                <div class="tcol tcol-1"><span class="text-hidden-lg">Планировка</span></div>
                <div class="tcol tcol-2">Квартира</div>
                <div class="tcol tcol-3">S, м²</div>
                <div class="tcol tcol-4">Этаж</div>
                <div class="tcol tcol-5">Цена, ₽</div>
            </div>
            
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
    </div>
</template>

<script setup lang="ts">
import { computed, onMounted } from 'vue'
import { useApartmentsStore } from '../stores/apartments.store'
import ScrollToTop from '@/components/ScrollToTop.vue'
import ApartmentsList from '@/components/ApartmentsList.vue'
import AppFilter from '~/components/Filters/AppFilter.vue'
import FilterWithLoader from '@/components/Filters/FilterWithLoader.vue'

const store = useApartmentsStore()

onMounted(() => {
  store.loadApartments()
})

// Отфильтрованные квартиры
const filteredApartments = computed(() => {
  if (!store.apartments.length) return []

  return store.apartments.filter(apartment => {
    const { price, area, rooms } = store.filters

    // Фильтр по цене
    if (price.min !== null && apartment.price < price.min) return false
    if (price.max !== null && apartment.price > price.max) return false

    // Фильтр по площади
    if (area.min !== null && apartment.area < area.min) return false
    if (area.max !== null && apartment.area > area.max) return false

    // Фильтр по комнатам
    if (rooms !== null && apartment.rooms !== rooms) return false

    return true
  });
})

</script>