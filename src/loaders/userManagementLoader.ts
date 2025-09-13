import { redirect } from "react-router-dom";
import { FIREBASE_URL } from "../services/api";
import type { Transaction, User } from "../common/types";

type userDataProps = [User, Transaction[]];

export interface userManagementLoaderProps {
  userData: userDataProps[];
}

export const userManagementLoader = async (): Promise<
  userManagementLoaderProps | Response
> => {
  const authUserData = localStorage.getItem("user");
  if (!authUserData) return redirect("/login");

  const usersResponse = await fetch(`${FIREBASE_URL}/usersData.json`);
  const usersData: Record<string, User> | null = await usersResponse.json();
  const allUsers: User[] = usersData ? Object.values(usersData) : [];

  const userData: userDataProps[] = await Promise.all(
    allUsers.map(async (user) => {
      const transactionsResponse = await fetch(
        `${FIREBASE_URL}/transactions/${user.accountNumber}.json`
      );
      const transactionsData: Record<string, Transaction> | null =
        await transactionsResponse.json();

      const transactions: Transaction[] = transactionsData
        ? Object.values(transactionsData)
        : [];

      return [user, transactions] as userDataProps;
    })
  );

  return { userData };
};
