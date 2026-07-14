<script setup lang="ts">
import type { IncomeUpdate } from "@/types";

import { IncomeForm } from "@/components";
import { useIncomesStore } from "@/stores";

import { useRoute, useRouter } from "vue-router";
import { ref, onMounted } from "vue";

const route = useRoute();
const router = useRouter();
const store = useIncomesStore();
const initialData = ref<IncomeUpdate | null>(null);

const id = Number(route.params.id);

onMounted(async () => {
  try {
    const item = store.list.find((t) => t.id === id);
    if (item) {
      initialData.value = {
        amount: item.amount,
        category: item.category,
        description: item.description,
        income_date: item.income_date,
      };
    } else {
      // Если нет в сторе, можно запросить отдельно, пока редирект
      router.push("/incomes");
    }
  } catch {
    router.push("/incomes");
  }
});

const handleSubmit = async (data: IncomeUpdate) => {
  await store.update(id, data);
  router.push("/incomes");
};

const handleCancel = () => {
  router.push("/incomes");
};
</script>

<template>
  <h2>Редактировать доход</h2>
  <IncomeForm
    v-if="initialData"
    :initial-data="initialData"
    @submit="handleSubmit"
    @cancel="handleCancel"
  />
  <div v-else>Загрузка...</div>
</template>
