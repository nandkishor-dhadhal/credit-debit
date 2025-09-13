import { redirect } from "react-router-dom";
import { FIREBASE_URL } from "../services/api";
import type { Transaction } from "../common/types";

interface HomePageLoaderData {
  recentHistory: Transaction[];
  availablebalance: number;
}

export const homePageLoader = async (): Promise<
  HomePageLoaderData | Response
> => {
  const authUserData = localStorage.getItem("user");
  if (!authUserData) return redirect("/login");

  const accountNumber = JSON.parse(authUserData).accountNumber;

  const transactionsRes = await fetch(
    `${FIREBASE_URL}/transactions/${accountNumber}.json`
  );
  const jsonResult = (await transactionsRes.json()) as Record<
    string,
    Omit<Transaction, "transactionId">
  > | null;

  const transactionsArray: Transaction[] = jsonResult
    ? Object.entries(jsonResult).map(([transactionId, data]) => ({
        transactionId,
        ...data,
      }))
    : [];

  transactionsArray.sort(
    (a, b) => new Date(b.date).getTime() - new Date(a.date).getTime()
  );

  const recentHistory = transactionsArray.slice(0, 5);

  const userRes = await fetch(`${FIREBASE_URL}/usersData/${accountNumber}.json`);
  const userData = await userRes.json();
  const availablebalance = userData?.availablebalance ?? 0;

  return { recentHistory, availablebalance };
};
