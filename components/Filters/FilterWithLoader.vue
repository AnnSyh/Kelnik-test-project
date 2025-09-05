<template>
    <div v-if="loading">
      <div class="spinner"></div>
      <span>Применяем фильтры...</span>
    </div>
</template>

<script setup lang="ts">
import { computed } from 'vue'
import { useApartmentsStore } from '@/stores/apartments.store'

const store = useApartmentsStore()
const loading = computed(() => store.filterLoading)
</script>
