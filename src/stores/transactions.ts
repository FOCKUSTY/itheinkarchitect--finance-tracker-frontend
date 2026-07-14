import type {
  Transaction,
  TransactionCreate,
  TransactionUpdate,
} from "@/types";

import { useEntityCrud } from "@/composables";
import { transactionsApi } from "@/api";
import { defineStore } from "pinia";

export const useTransactionsStore = defineStore("transactions", () => {
  const entity = useEntityCrud<
    Transaction,
    TransactionCreate,
    TransactionUpdate
  >({
    api: transactionsApi,
  });
  return entity;
});
