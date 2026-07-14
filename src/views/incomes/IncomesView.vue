<script setup lang="ts">
import { EntityList } from "@/components";
import { useIncomesStore } from "@/stores";

const store = useIncomesStore();
</script>

<template>
  <EntityList
    title="Доходы"
    :store="store"
    create-route="/incomes/create"
    edit-route-prefix="/incomes/"
    date-key="income_date"
    item-label="Доход"
  />
</template>
