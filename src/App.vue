<script setup lang="ts">
import "./main.css";
import { RouterLink, RouterView } from "vue-router";
</script>

<template>
  <div class="bg-(--bg-default) min-h-screen p-4">
    <nav class="bg-(--bg-smooth-ce) flex gap-4 mb-4 p-4 rounded shadow">
      <RouterLink
        to="/transactions"
        class="font-medium hover:opacity-80 transition-opacity text-(--fg-default)"
        active-class="font-bold underline"
      >
        Транзакции
      </RouterLink>
      <RouterLink
        to="/incomes"
        class="font-medium hover:opacity-80 transition-opacity text-(--fg-default)"
        active-class="font-bold underline"
      >
        Доходы
      </RouterLink>
    </nav>
    <main class="bg-(--bg-smooth-ce) p-6 rounded shadow">
      <RouterView />
    </main>
  </div>
</template>
