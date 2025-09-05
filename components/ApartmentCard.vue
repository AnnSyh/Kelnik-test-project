<template>
  <div class="card">
    <div class="apartment-item__col-1"><img :src="apartment.image" alt=""></div>
    <h3 class="apartment-item__col-2">{{ apartment.title }}</h3>
    <p class="apartment-item__col-3">{{ apartment.area }}</p>
    <p class="apartment-item__col-4">{{ apartment.floor }}</p>
    <p class="apartment-item__col-5">{{ formatPrice(apartment.price) }}</p>
  </div>
</template>

<script setup lang="ts">
    interface Apartment {
    id: number
    title: string
    price: number
    area: number
    rooms: number
    floor: string
    image: string
    }

    const props = defineProps<{
    apartment: Apartment
    }>()

    const formatPrice = (price: number) => {
    return new Intl.NumberFormat('ru-RU').format(price)
    }
</script>
