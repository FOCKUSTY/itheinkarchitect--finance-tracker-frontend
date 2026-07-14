import type { Income, IncomeCreate, IncomeUpdate } from "@/types";
import { defineStore } from "pinia";
import { useEntityCrud } from "@/composables/use-entity-crud";
import { incomesApi } from "@/api";

export const useIncomesStore = defineStore("incomes", () => {
  const entity = useEntityCrud<Income, IncomeCreate, IncomeUpdate>({
    api: incomesApi,
  });
  return entity;
});
