export interface Transaction {
  id: number;
  amount: number;
  category: string;
  description: string;
  transaction_date: string;
}

export type TransactionCreate = Omit<Transaction, "id">;
export type TransactionUpdate = Omit<Transaction, "id">;

export interface Income {
  id: number;
  amount: number;
  category: string;
  description: string;
  income_date: string;
}

export type IncomeCreate = Omit<Income, "id">;
export type IncomeUpdate = Omit<Income, "id">;
