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
      <label
        class="block text-sm font-medium"
        style="color: var(--fg-mini-text)"
      >
        Сумма
      </label>
      <input
        v-model.number="form.amount"
        type="number"
        step="0.01"
        required
        class="border border-(--fg-mini-text-30) bg-(--bg-smooth) text-(--fg-default) w-full px-3 py-2 rounded outline-none transition-color focus:border-(--fg-mini-text)"
      />
    </div>

    <div>
      <label class="block text-sm font-medium text-(--fg-mini-text)">
        Категория
      </label>
      <input
        v-model="form.category"
        type="text"
        required
        class="border border-(--fg-mini-text-30) bg-(--bg-smooth) text-(--fg-default) w-full px-3 py-2 rounded outline-none transition-colors focus:border-(--fg-mini-text)"
      />
    </div>

    <div>
      <label class="block text-sm font-medium text-(--fg-mini-text)">
        Описание
      </label>
      <input
        v-model="form.description"
        type="text"
        required
        class="border border-(--fg-mini-text-30) bg-(--bg-smooth) text-(--fg-default) w-full px-3 py-2 rounded outline-none transition-colors focus:border-(--fg-mini-text)"
      />
    </div>

    <div>
      <label class="block text-sm font-medium text-(--fg-mini-text)">
        Дата
      </label>
      <input
        :value="form[dateKey]"
        @input="form[dateKey] = ($event.target as HTMLInputElement).value"
        type="date"
        required
        class="border border-(--fg-mini-text-30) bg-(--bg-smooth) text-(--fg-default) w-full px-3 py-2 rounded outline-none transition-colors focus:border-(--fg-mini-text)"
      />
    </div>

    <div class="flex gap-2">
      <button
        type="submit"
        class="cursor-pointer px-4 py-2 rounded font-medium transition-opacity hover:opacity-85 bg-(--btn-primary) text-(--bg-default)"
      >
        Сохранить
      </button>
      <button
        type="button"
        @click="onCancel"
        class="cursor-pointer px-4 py-2 rounded font-medium transition-opacity hover:opacity-85 bg-(--btn-secondary) text-(--bg-default)"
      >
        Отмена
      </button>
    </div>
  </form>
</template>
