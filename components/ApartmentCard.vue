<template>
  <div class="card">
    <p><img :src="apartment.image" alt=""></p>
    <h3>{{ apartment.title }}</h3>
    <p>{{ apartment.area }}</p>
    <p>{{ apartment.floor }}</p>
    <p>{{ formatPrice(apartment.price) }}</p>
  </div>
</template>

<script setup lang="ts">
interface Apartment {
  id: number
  title: string
  price: number
  area: number
  rooms: number
  floor: number
  image: string
}

const props = defineProps<{
  apartment: Apartment
}>()

const formatPrice = (price: number) => {
  return new Intl.NumberFormat('ru-RU').format(price)
}
</script>

<style lang="scss" scoped>

</style>