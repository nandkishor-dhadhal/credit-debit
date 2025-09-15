import { FIREBASE_URL } from "../../services/api";
import type { Transaction } from "../../common/types";
import { redirect } from "react-router-dom";

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const userTransactionHistoryLoader = async ({ params }: { params: any }) => {
  const authUserData = localStorage.getItem("user");
  if (!authUserData) return redirect("/login");

  const { accountNumber } = params;

  const res = await fetch(`${FIREBASE_URL}/transactions/${accountNumber}.json`);
  if (!res.ok) throw new Error("Failed to fetch transactions");

  const transactionsData: Record<string, Transaction> | null = await res.json();
  const transactions: Transaction[] = transactionsData ? Object.values(transactionsData) : [];

  return { transactions };
};
