<script setup lang="ts">
import type { TransactionUpdate } from "@/types";

import { useTransactionsStore } from "@/stores";
import { EntityForm } from "@/components";

import { useRoute, useRouter } from "vue-router";
import { ref, onMounted } from "vue";

const route = useRoute();
const router = useRouter();
const store = useTransactionsStore();
const initialData = ref<TransactionUpdate | null>(null);
const id = Number(route.params.id);

onMounted(async () => {
  const item = store.list.find((transaction) => transaction.id === id);
  if (item) {
    initialData.value = {
      amount: item.amount,
      category: item.category,
      description: item.description,
      transaction_date: item.transaction_date,
    };
  } else {
    router.push("/transactions");
  }
});

const handleSubmit = async (data: TransactionUpdate) => {
  await store.update(id, data);
  router.push("/transactions");
};

const handleCancel = () => router.push("/transactions");
</script>

<template>
  <h2 class="text-2xl font-bold mb-4">Редактировать транзакцию</h2>
  <EntityForm
    v-if="initialData"
    :initial-data="initialData"
    date-key="transaction_date"
    @submit="handleSubmit"
    @cancel="handleCancel"
  />
  <div v-else>Загрузка...</div>
</template>
