import type {
  Transaction,
  TransactionCreate,
  TransactionUpdate,
} from "@/types/models";

import { api } from "./client";

export const transactionsApi = {
  getAll: () => api.get<Transaction[]>("/transactions?category=all"),

  getById: (id: number) => api.get<Transaction>(`/transactions/${id}`),

  create: (data: TransactionCreate) =>
    api.post<{ message: string; id: number }>("/transactions/", data),

  update: (id: number, data: TransactionUpdate) =>
    api.put<Transaction>(`/transactions/${id}`, data),

  delete: (id: number) =>
    api.delete<{ message: string }>(`/transactions/${id}`),

  getByCategory: (category: string) =>
    api.get<Transaction[]>(
      `/transactions?category=${encodeURIComponent(category)}`,
    ),
};
