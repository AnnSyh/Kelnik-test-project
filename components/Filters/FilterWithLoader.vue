<template>
  <div class="filter-wrapper">
    <div v-if="loading" class="filter-wrapper__loader">
      <div class="spinner"></div>
      <span>Применяем фильтры...</span>
    </div>
    
  </div>
</template>

<script setup lang="ts">
import { computed } from 'vue'
import { useApartmentsStore } from '@/stores/apartments.store'

const store = useApartmentsStore()
const loading = computed(() => store.filterLoading)
</script>
