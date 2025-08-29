<template>
  <div class="text-center">
    <div class="text-2xl font-bold mb-2">{{ counter.count }}</div>
    <button 
      @click="counter.increment()"
      class="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
    >
      +1
    </button>
  </div>
</template>

<script setup lang="ts">
// Явный импорт store
import { useCounterStore } from '~/stores/useCounterStore'

const counter = useCounterStore()
</script>