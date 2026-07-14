<script setup lang="ts">
import { ref, watch } from "vue";

const props = defineProps<{
  initialData?: any | null;
  dateKey: string;
}>();

const emit = defineEmits<{
  (e: "submit", data: any): void;
  (e: "cancel"): void;
}>();

// Создаём объект формы динамически
const defaultForm = () => ({
  amount: 0,
  category: "",
  description: "",
  [props.dateKey]: new Date().toISOString().split("T")[0]!,
});

const form = ref<any>(defaultForm());

watch(
  () => props.initialData,
  (newVal) => {
    if (newVal) {
      form.value = { ...newVal };
    } else {
      form.value = defaultForm();
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
  <form @submit.prevent="onSubmit" class="max-w-md space-y-4">
    <div>
      <label class="block text-sm font-medium text-gray-700">Сумма</label>
      <input
        v-model.number="form.amount"
        type="number"
        step="0.01"
        required
        class="mt-1 w-full px-3 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-400"
      />
    </div>
    <div>
      <label class="block text-sm font-medium text-gray-700">Категория</label>
      <input
        v-model="form.category"
        type="text"
        required
        class="mt-1 w-full px-3 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-400"
      />
    </div>
    <div>
      <label class="block text-sm font-medium text-gray-700">Описание</label>
      <input
        v-model="form.description"
        type="text"
        required
        class="mt-1 w-full px-3 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-400"
      />
    </div>
    <div>
      <label class="block text-sm font-medium text-gray-700">Дата</label>
      <input
        :value="form[dateKey]"
        @input="form[dateKey] = ($event.target as HTMLInputElement).value"
        type="date"
        required
        class="mt-1 w-full px-3 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-400"
      />
    </div>
    <div class="flex gap-2">
      <button
        type="submit"
        class="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded"
      >
        Сохранить
      </button>
      <button
        type="button"
        @click="onCancel"
        class="bg-gray-300 hover:bg-gray-400 text-gray-800 px-4 py-2 rounded"
      >
        Отмена
      </button>
    </div>
  </form>
</template>
