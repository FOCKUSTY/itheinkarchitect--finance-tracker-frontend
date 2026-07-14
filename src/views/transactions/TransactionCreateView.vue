<script setup lang="ts">
import type { TransactionCreate } from "@/types";

import { useTransactionsStore } from "@/stores";
import { TransactionForm } from "@/components";

import { useRouter } from "vue-router";

const router = useRouter();
const store = useTransactionsStore();

const handleSubmit = async (data: TransactionCreate) => {
  await store.create(data);
  router.push("/transactions");
};

const handleCancel = () => {
  router.push("/transactions");
};
</script>

<template>
  <h2>Создать транзакцию</h2>
  <TransactionForm @submit="handleSubmit" @cancel="handleCancel" />
</template>
