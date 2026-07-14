<script setup lang="ts">
import "./main.css";

import { RouterLink, RouterView } from "vue-router";
</script>

<template>
  <div class="min-h-screen bg-gray-100 p-4">
    <nav class="flex gap-4 mb-4 bg-white p-4 rounded shadow">
      <RouterLink
        to="/transactions"
        class="text-blue-600 hover:text-blue-800 font-medium"
        active-class="font-bold"
      >
        Транзакции
      </RouterLink>
      <RouterLink
        to="/incomes"
        class="text-blue-600 hover:text-blue-800 font-medium"
        active-class="font-bold"
      >
        Доходы
      </RouterLink>
    </nav>
    <main class="bg-white p-6 rounded shadow">
      <RouterView />
    </main>
  </div>
</template>
