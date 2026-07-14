<script setup lang="ts">
import type { TransactionCreate, TransactionUpdate } from "@/types/models";
import { ref, watch } from "vue";

const props = defineProps<{
  initialData?: TransactionCreate | TransactionUpdate | null;
}>();

const emit = defineEmits<{
  (e: "submit", data: TransactionCreate | TransactionUpdate): void;
  (e: "cancel"): void;
}>();

const form = ref<TransactionCreate | TransactionUpdate>({
  amount: 0,
  category: "",
  description: "",
  transaction_date: new Date().toISOString().split("T")[0]!,
});

watch(
  () => props.initialData,
  (newVal) => {
    if (newVal) {
      form.value = { ...newVal };
    }
  },
  { immediate: true },
);

const onSubmit = () => {
  emit("submit", form.value);
};

const onCancel = () => {
  emit("cancel");
};
</script>

<template>
  <form @submit.prevent="onSubmit">
    <div>
      <label>Сумма</label>
      <input v-model.number="form.amount" type="number" step="0.01" required />
    </div>
    <div>
      <label>Категория</label>
      <input v-model="form.category" type="text" required />
    </div>
    <div>
      <label>Описание</label>
      <input v-model="form.description" type="text" required />
    </div>
    <div>
      <label>Дата</label>
      <input v-model="form.transaction_date" type="date" required />
    </div>
    <div class="actions">
      <button type="submit">Сохранить</button>
      <button type="button" @click="onCancel">Отмена</button>
    </div>
  </form>
</template>

<style scoped>
form > div {
  margin-bottom: 0.5rem;
}
label {
  display: inline-block;
  width: 100px;
}
.actions {
  margin-top: 1rem;
}
</style>
