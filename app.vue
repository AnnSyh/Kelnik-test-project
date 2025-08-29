<template>
  <div>
    <!-- Навигация (опционально) -->
    <nav v-if="$route.path !== '/'">
      <NuxtLink to="/">Главная</NuxtLink>
    </nav>
    
    <!-- Основной контент -->
    <main>
      <NuxtPage />  <!-- Это отобразит pages/index.vue -->
    </main>
  </div>
</template>

<style>
/* Глобальные стили */
body {
  font-family: 'Arial', sans-serif;
  margin: 0;
  padding: 0;
}
</style>