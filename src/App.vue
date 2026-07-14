<script setup lang="ts">
import { RouterLink, RouterView } from "vue-router";
</script>

<template>
  <div id="app">
    <nav>
      <RouterLink to="/transactions">Транзакции</RouterLink>
      <RouterLink to="/incomes">Доходы</RouterLink>
    </nav>
    <main>
      <RouterView />
    </main>
  </div>
</template>

<style>
#app {
  font-family: Arial, sans-serif;
  padding: 1rem;
}
nav {
  display: flex;
  gap: 1rem;
  margin-bottom: 1rem;
}
nav a {
  text-decoration: none;
  color: blue;
}
nav a.router-link-active {
  font-weight: bold;
}
</style>
