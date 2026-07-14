import { createRouter, createWebHistory } from "vue-router";

import {
  TransactionsView,
  TransactionCreateView,
  TransactionEditView,
  IncomesView,
  IncomeCreateView,
  IncomeEditView,
} from "@/views";

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    { path: "/", redirect: "/transactions" },
    {
      path: "/transactions",
      name: "transactions",
      component: TransactionsView,
    },
    {
      path: "/transactions/create",
      name: "transaction-create",
      component: TransactionCreateView,
    },
    {
      path: "/transactions/:id/edit",
      name: "transaction-edit",
      component: TransactionEditView,
    },
    { path: "/incomes", name: "incomes", component: IncomesView },
    {
      path: "/incomes/create",
      name: "income-create",
      component: IncomeCreateView,
    },
    {
      path: "/incomes/:id/edit",
      name: "income-edit",
      component: IncomeEditView,
    },
  ],
});

export default router;
