<script setup lang="ts">
import type { TransactionCreate } from "@/types/models";

import { useRouter } from "vue-router";
import { EntityForm } from "@/components";
import { useTransactionsStore } from "@/stores";

const router = useRouter();
const store = useTransactionsStore();

const handleSubmit = async (data: TransactionCreate) => {
  await store.create(data);
  router.push("/transactions");
};

const handleCancel = () => router.push("/transactions");
</script>

<template>
  <h2 class="text-2xl font-bold mb-4">Создать транзакцию</h2>
  <EntityForm
    date-key="transaction_date"
    @submit="handleSubmit"
    @cancel="handleCancel"
  />
</template>
