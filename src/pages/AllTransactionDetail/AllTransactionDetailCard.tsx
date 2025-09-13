import React, { useEffect, useRef } from "react";
import $ from "jquery";
import "datatables.net";
import type { Transaction } from "../../common/types";
import "../../index.css";

interface AllTransactionDetailCardProps {
  transactions: Transaction[];
}

const AllTransactionDetailCard: React.FC<AllTransactionDetailCardProps> = ({
  transactions,
}) => {
  const tableRef = useRef<HTMLTableElement>(null);

  useEffect(() => {
    if (tableRef.current) {
      $(tableRef.current).DataTable({
        destroy: true,
        pageLength: 5,
      });
    }
  }, [transactions]);

  const formatNote = (text: string | undefined) => {
    if (!text || text.trim().length === 0) return "No Note";
    return text;
  };

  return (
    <table
      ref={tableRef}
      className="display w-full border-collapse border border-gray-200 text-sm"
      style={{ borderSpacing: 0 }}
    >
      <thead>
        <tr className="border-b border-gray-300">
          <th className="px-3 py-2 text-left font-medium">Amount</th>
          <th className="px-3 py-2 text-left font-medium">Note</th>
          <th className="px-3 py-2 text-left font-medium">Receiver ID</th>
          <th className="px-3 py-2 text-left font-medium">Sender ID</th>
          <th className="px-3 py-2 text-left font-medium">Transaction ID</th>
          <th className="px-3 py-2 text-left font-medium">Type</th>
          <th className="px-3 py-2 text-left font-medium">Date</th>
        </tr>
      </thead>
      <tbody>
        {transactions.map((transaction) => (
          <tr
            key={transaction.transactionId}
            className="cursor-pointer border-b border-gray-200 hover:bg-blue-700 hover:scale-100 transition duration-300 ease-in-out"
          >
            <td className="px-3 py-2">₹{transaction.amount}</td>
            <td className="px-3 py-2" title={transaction.note}>
              {formatNote(transaction.note)}
            </td>
            <td className="px-3 py-2" title={transaction.receiverId}>
              {transaction.receiverId}
            </td>
            <td className="px-3 py-2" title={transaction.senderId}>
              {transaction.senderId}
            </td>
            <td className="px-3 py-2" title={transaction.transactionId}>
              {transaction.transactionId}
            </td>
            <td
              className={`px-3 py-2 capitalize font-semibold flex items-center gap-1 ${
                transaction.type === "DEBIT" ? "text-red-600" : "text-green-600"
              }`}
            >
              {transaction.type}
              {transaction.type === "CREDIT" ? " 📈" : " 📉"}
            </td>

            <td className="px-3 py-2">
              {new Date(transaction.date).toLocaleString()}
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );
};

export default AllTransactionDetailCard;
