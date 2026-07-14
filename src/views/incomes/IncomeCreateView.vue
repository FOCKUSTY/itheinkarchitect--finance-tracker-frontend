<script setup lang="ts">
import type { IncomeCreate } from "@/types";

import { useRouter } from "vue-router";
import { EntityForm } from "@/components";
import { useIncomesStore } from "@/stores";

const router = useRouter();
const store = useIncomesStore();

const handleSubmit = async (data: IncomeCreate) => {
  await store.create(data);
  router.push("/incomes");
};

const handleCancel = () => router.push("/incomes");
</script>

<template>
  <h2 class="text-2xl font-bold mb-4">Создать доход</h2>
  <EntityForm
    date-key="transaction_date"
    @submit="handleSubmit"
    @cancel="handleCancel"
  />
</template>
