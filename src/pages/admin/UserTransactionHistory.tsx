import React from "react";
import { useLoaderData } from "react-router-dom";
import type { Transaction } from "../../common/types";
import AllTransactionDetailCard from "../user/AllTransactions/TransactionsCard";

const UserTransactionHistory: React.FC = () => {
  const { transactions } = useLoaderData() as { transactions: Transaction[] };

  return (
    <div className="p-6">
      <h2 className="text-2xl font-semibold mb-6">User Transaction History</h2>
      {transactions.length > 0 ? (
        <AllTransactionDetailCard transactions={transactions} />
      ) : (
        <p className="text-gray-500">No transactions found for this user.</p>
      )}
    </div>
  );
};

export default UserTransactionHistory;
