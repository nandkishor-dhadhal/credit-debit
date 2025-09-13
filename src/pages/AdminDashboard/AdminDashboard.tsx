import React from "react";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";
import { useLoaderData } from "react-router-dom";
import type { Transaction, User } from "../../common/types";

const generateRandomGraphData = () => {
  return Array.from({ length: 7 }, (_, idx) => ({
    day: `Day ${idx + 1}`,
    credit: Math.floor(Math.random() * 10000 + 5000),
    debit: Math.floor(Math.random() * 8000 + 3000),
  }));
};

const graphData = generateRandomGraphData();

interface LoaderData {
  totalUser: number;
  totalBalance: number;
  totalCredits: number;
  totalDebits: number;
  recentTransactions: Transaction[];
  topUserByBalance: User[];
}

const AdminDashboard: React.FC = () => {
  const {
    totalUser,
    totalBalance,
    totalCredits,
    totalDebits,
    recentTransactions,
    topUserByBalance,
  } = useLoaderData() as LoaderData;
  console.log(recentTransactions);
  return (
    <div className="h-163 flex flex-col p-4 space-y-4 overflow-hidden">
      <div className="grid grid-cols-4 gap-4">
        {[
          { label: "Total Users", value: totalUser.toLocaleString() },
          {
            label: "Total Balance",
            value: `₹${totalBalance.toLocaleString()}`,
          },
          { label: "Total Credits", value: totalCredits },
          { label: "Total Debits", value: totalDebits },
        ].map((item, idx) => (
          <div
            key={idx}
            className="flex flex-col justify-center items-center p-3 border rounded-lg shadow-sm hover:shadow-md transition-shadow"
          >
            <span className="text-xl font-bold">{item.value}</span>
            <span className="text-xs mt-1">{item.label}</span>
          </div>
        ))}
      </div>

      <div className="grid grid-cols-4 gap-4">
        {["Add User", "Add Admin", "Reports", "Settings"].map((btn, idx) => (
          <button
            key={idx}
            className="p-3 border rounded-lg shadow hover:shadow-md hover:border-amber-400 transition-all duration-200 font-medium text-sm"
          >
            {btn}
          </button>
        ))}
      </div>

      <div className="flex gap-4 h-45">
        <div className="flex-1 border rounded-lg p-3 overflow-hidden">
          <h2 className="mb-2 text-sm font-semibold">
            Top 3 Recent Transactions
          </h2>
          <div className="overflow-auto h-28">
            <table className="w-full table-auto border-collapse text-xs">
              <thead className="sticky top-0">
                <tr className="border-b">
                  <th className="p-1 text-left font-medium">Account</th>
                  <th className="p-1 text-left font-medium">Amount</th>
                  <th className="p-1 text-left font-medium">Date</th>
                </tr>
              </thead>
              <tbody>
                {recentTransactions.slice(0, 3).map((tx, idx) => (
                  <tr
                    key={idx}
                    className="cursor-pointer hover:border-amber-400 transition-all duration-200 font-medium text-sm"
                  >
                    <td className="p-1 border-b border-gray-100">
                      {tx.transactionId}
                    </td>
                    <td className="p-1 border-b border-gray-100 font-medium text-blue-500">
                      ₹{Number(tx.amount).toLocaleString()}
                    </td>
                    <td className="p-1 border-b border-gray-100">{tx.date}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        <div className="w-110 border rounded-lg p-2">
          <h2 className="mb-2 text-sm font-semibold p-1">
            Top 3 Users by Balance
          </h2>
          <div className="space-y-1">
            {topUserByBalance.slice(0, 3).map((user, idx) => (
              <div
                key={idx}
                className="flex justify-between items-center py-1 px-2 rounded cursor-pointer hover:border-amber-400 transition-all duration-200 font-medium text-sm"
              >
                <div className="flex-1 min-w-0">
                  <div className="text-xs font-medium truncate">
                    {user.firstName}
                  </div>
                  <div className="text-xs">{user.accountNumber}</div>
                </div>
                <span className="text-xs font-bold text-blue-500 ml-2">
                  ₹{Number(user.availablebalance).toLocaleString()}
                </span>
              </div>
            ))}
          </div>
        </div>
      </div>

      <div className="border rounded-lg p-3 flex flex-col flex-1">
        <h2 className="mb-2 text-sm font-semibold">
          Credit vs Debit Over Last 7 Days
        </h2>
        <div className="flex-1 min-h-0">
          <ResponsiveContainer width="100%" height="100%">
            <LineChart
              data={graphData}
              margin={{ top: 5, right: 30, left: 20, bottom: 5 }}
            >
              <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
              <XAxis dataKey="day" tick={{ fontSize: 12 }} />
              <YAxis tick={{ fontSize: 12 }} />
              <Tooltip
                contentStyle={{
                  fontSize: "12px",
                  border: "1px solid #e5e7eb",
                  borderRadius: "8px",
                  boxShadow: "0 4px 6px -1px rgba(0, 0, 0, 0.1)",
                }}
              />
              <Line
                type="monotone"
                dataKey="credit"
                stroke="#10b981"
                strokeWidth={2}
                dot={{ r: 4, fill: "#10b981" }}
                name="Credit"
              />
              <Line
                type="monotone"
                dataKey="debit"
                stroke="#ef4444"
                strokeWidth={2}
                dot={{ r: 4, fill: "#ef4444" }}
                name="Debit"
              />
            </LineChart>
          </ResponsiveContainer>
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard;
