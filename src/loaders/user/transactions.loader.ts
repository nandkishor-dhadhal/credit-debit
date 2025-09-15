import { redirect } from "react-router-dom";
import { FIREBASE_URL } from "../../services/api";
import type { Transaction } from "../../common/types";

interface UserHistoryLoaderPrompt {
  transactionDetails: Transaction[];
}

export const userHistoryLoader = async (): Promise<
  UserHistoryLoaderPrompt | Response
> => {
  const authUserData = localStorage.getItem("user");
  if (!authUserData) return redirect("/login");

  const accountNumber = JSON.parse(authUserData).accountNumber;

  const transactionsRes = await fetch(
    `${FIREBASE_URL}/transactions/${accountNumber}.json`
  );
  const jsonResult = (await transactionsRes.json()) as Record<string,Omit<Transaction, "transactionId">  > | null;

  if (!jsonResult) {
    return { transactionDetails: [] };
  }

  const transactionDetails: Transaction[] = Object.entries(jsonResult).map(
    ([transactionId, transactionData]) => ({
      transactionId,
      ...transactionData,
    })
  );

  return { transactionDetails };
};
