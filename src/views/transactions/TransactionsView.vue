<script setup lang="ts">
import { EntityList } from "@/components";
import { useTransactionsStore } from "@/stores/transactions";

const store = useTransactionsStore();
</script>

<template>
  <EntityList
    title="Транзакции"
    :store="store"
    create-route="/transactions/create"
    edit-route-prefix="/transactions/"
    date-key="transaction_date"
    item-label="Транзакцию"
  />
</template>
