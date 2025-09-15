import { redirect } from "react-router-dom";
import { FIREBASE_URL } from "../../services/api";
import type { Transaction, User } from "../../common/types";

interface AdminDashboardProps {
  totalUser: number;
  totalBalance: number;
  totalCredits: number;
  totalDebits: number;
  recentTransactions: Transaction[];
  topUserByBalance: User[];
}

export const adminDashboard = async (): Promise<
  AdminDashboardProps | Response
> => {
  const authUserData = localStorage.getItem("user");
  if (!authUserData) return redirect("/login");

  const usersResponse = await fetch(`${FIREBASE_URL}/usersData.json`);
  const usersData: Record<string, User> | null = await usersResponse.json();
  const usersArray: User[] = usersData ? Object.values(usersData) : [];
  const totalUser = usersArray.length;
  const totalBalance = usersArray.reduce(
    (sum, user) => sum + Number(user.availablebalance || 0),
    0
  );

  const transactionsResponse = await fetch(`${FIREBASE_URL}/transactions.json`);
  const transactionsData: Record<string, Record<string, Transaction>> | null =
    await transactionsResponse.json();

  const allTransactions: Transaction[] = [];
  if (transactionsData) {
    for (const userTransactions of Object.values(transactionsData)) {
      allTransactions.push(...Object.values(userTransactions));
    }
  }

  const totalCredits = allTransactions
    .filter((tx) => tx.type === "CREDIT")
    .reduce((sum, tx) => sum + Number(tx.amount || 0), 0);

  const totalDebits = allTransactions
    .filter((tx) => tx.type === "DEBIT")
    .reduce((sum, tx) => sum + Number(tx.amount || 0), 0);

  const recentTransactions = allTransactions
    .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime())
    .slice(0, 5);

  const topUserByBalance = usersArray
    .sort(
      (a, b) =>
        Number(b.availablebalance || 0) - Number(a.availablebalance || 0)
    )
    .slice(0, 5);

  return {
    totalUser,
    totalBalance,
    totalCredits,
    totalDebits,
    recentTransactions,
    topUserByBalance,
  };
};
