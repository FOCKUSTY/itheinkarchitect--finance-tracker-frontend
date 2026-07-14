<script setup lang="ts">
import type { IncomeCreate } from "@/types";

import { IncomeForm } from "@/components";
import { useIncomesStore } from "@/stores";

import { useRouter } from "vue-router";

const router = useRouter();
const store = useIncomesStore();

const handleSubmit = async (data: IncomeCreate) => {
  await store.create(data);
  router.push("/incomes");
};

const handleCancel = () => {
  router.push("/incomes");
};
</script>

<template>
  <h2>Создать доход</h2>
  <IncomeForm @submit="handleSubmit" @cancel="handleCancel" />
</template>
