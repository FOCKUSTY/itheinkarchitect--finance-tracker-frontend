import type { Income, IncomeCreate, IncomeUpdate } from "@/types/models";
import { incomesApi } from "@/api/incomes";

import { defineStore } from "pinia";
import { ref } from "vue";

export const useIncomesStore = defineStore("incomes", () => {
  const list = ref<Income[]>([]);
  const loading = ref(false);
  const error = ref<string | null>(null);

  const fetchAll = async () => {
    loading.value = true;
    error.value = null;
    try {
      list.value = await incomesApi.getAll();
    } catch (err) {
      error.value =
        err instanceof Error ? err.message : "Ошибка загрузки транзакций";
      throw err;
    } finally {
      loading.value = false;
    }
  };

  const fetchByCategory = async (category: string) => {
    loading.value = true;
    error.value = null;
    try {
      list.value = await incomesApi.getByCategory(category);
    } catch (err) {
      error.value =
        err instanceof Error ? err.message : "Ошибка загрузки по категории";
      throw err;
    } finally {
      loading.value = false;
    }
  };

  const create = async (data: IncomeCreate) => {
    loading.value = true;
    error.value = null;
    try {
      await incomesApi.create(data);
      await fetchAll();
    } catch (err) {
      error.value =
        err instanceof Error ? err.message : "Ошибка создания транзакции";
      throw err;
    } finally {
      loading.value = false;
    }
  };

  const update = async (id: number, data: IncomeUpdate) => {
    loading.value = true;
    error.value = null;
    try {
      await incomesApi.update(id, data);
      await fetchAll();
    } catch (err) {
      error.value =
        err instanceof Error ? err.message : "Ошибка обновления транзакции";
      throw err;
    } finally {
      loading.value = false;
    }
  };

  const remove = async (id: number) => {
    loading.value = true;
    error.value = null;
    try {
      await incomesApi.delete(id);
      await fetchAll();
    } catch (err) {
      error.value =
        err instanceof Error ? err.message : "Ошибка удаления транзакции";
      throw err;
    } finally {
      loading.value = false;
    }
  };

  return {
    list,
    loading,
    error,
    fetchAll,
    fetchByCategory,
    create,
    update,
    remove,
  };
});
