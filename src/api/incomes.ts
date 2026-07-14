import { api } from "./client";
import type { Income, IncomeCreate, IncomeUpdate } from "@/types/models";

export const incomesApi = {
  getAll: () => api.get<Income[]>("/incomes?category=all"),

  getById: (id: number) => api.get<Income>(`/incomes/${id}`),

  create: (data: IncomeCreate) =>
    api.post<{ message: string; id: number }>("/incomes/", data),

  update: (id: number, data: IncomeUpdate) =>
    api.put<Income>(`/incomes/${id}`, data),

  delete: (id: number) => api.delete<{ message: string }>(`/incomes/${id}`),

  getByCategory: (category: string) =>
    api.get<Income[]>(`/incomes?category=${encodeURIComponent(category)}`),
};
