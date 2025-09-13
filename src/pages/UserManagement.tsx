import { useLoaderData } from "react-router-dom";
import type { Transaction, User } from "../common/types";
import { useEffect, useRef } from "react";
import $ from "jquery";
import "datatables.net";
import { FiEdit, FiTrash2, FiClock, FiUsers } from "react-icons/fi";
import EditUser from "./EditUser";
import UserTransactionHistory from "./UserTransactionHistory";

type userDataProps = [User, Transaction[]];

export interface userManagementLoaderProps {
  userData: userDataProps[];
}

const UserManagement = () => {
  const { userData } = useLoaderData() as userManagementLoaderProps;
  const tableRef = useRef<HTMLTableElement>(null);
  const transactionsButtonHandler = (transactions) => {
    <UserTransactionHistory transactions={transactions} />;
  };
  const deleteButtonHandler = (accountNumber) => {};
  const editButtonHandler = (accountNumber) => {
    <EditUser accountNumber={accountNumber} />;
  };
  useEffect(() => {
    const table = $(tableRef.current!).DataTable({
      pageLength: 10,
      dom: '<"flex flex-col sm:flex-row justify-between items-center mb-4"lf>t<"flex flex-col sm:flex-row justify-between items-center mt-4"ip>',
    });

    return () => {
      table.destroy();
    };
  }, []);

  return (
    <div className="container mx-auto px-4 py-6">
      <div className="mb-8">
        <div className="flex items-center gap-3 mb-2">
          <FiUsers className="text-2xl" />
          <h1 className="text-3xl font-bold">User Management</h1>
        </div>
        <p className="opacity-70">
          Manage user accounts and view transaction history
        </p>
      </div>

      <div className="border border-gray-200 rounded-lg shadow-sm overflow-hidden">
        <div className="overflow-x-auto">
          <table ref={tableRef} className="min-w-full divide-y divide-gray-200">
            <thead>
              <tr className="border-b border-gray-200">
                <th className="px-6 py-4 text-left text-xs font-semibold uppercase tracking-wider opacity-70">
                  Full Name
                </th>
                <th className="px-6 py-4 text-left text-xs font-semibold uppercase tracking-wider opacity-70">
                  Account Number
                </th>
                <th className="px-6 py-4 text-left text-xs font-semibold uppercase tracking-wider opacity-70">
                  Email
                </th>
                <th className="px-6 py-4 text-left text-xs font-semibold uppercase tracking-wider opacity-70">
                  Mobile
                </th>
                <th className="px-6 py-4 text-left text-xs font-semibold uppercase tracking-wider opacity-70">
                  PAN Number
                </th>

                <th className="px-6 py-4 text-center text-xs font-semibold uppercase tracking-wider opacity-70">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100">
              {userData.map(([user, transactions]) => (
                <tr
                  key={user.accountNumber}
                  className="hover:shadow-sm transition-all duration-200 group"
                >
                  <td className="px-6 py-4">
                    <div className="flex flex-col">
                      <span className="font-medium">
                        {user.firstName + " " + user.lastName}
                      </span>
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    <span className="font-mono text-sm font-medium px-2 py-1 border border-gray-200 rounded">
                      {user.accountNumber}
                    </span>
                  </td>
                  <td className="px-6 py-4 text-sm opacity-80">{user.email}</td>
                  <td className="px-6 py-4 text-sm font-mono opacity-80">
                    {user.mobile}
                  </td>
                  <td className="px-6 py-4">
                    <span className="font-mono text-sm font-medium px-2 py-1 border border-gray-200 rounded">
                      {user.panNumber}
                    </span>
                  </td>

                  <td className="px-6 py-4">
                    <div className="flex items-center justify-center gap-2">
                      <button
                        onClick={() => editButtonHandler(user.accountNumber)}
                        title="Edit User"
                        className="p-2 rounded-lg border border-gray-200 hover:shadow-md hover:border-gray-300 transition-all duration-200 group/btn"
                      >
                        <FiEdit
                          size={16}
                          className="group-hover/btn:scale-110 transition-transform duration-200"
                        />
                      </button>
                      <button
                        onClick={() => deleteButtonHandler(user.accountNumber)}
                        title="Delete User"
                        className="p-2 rounded-lg border border-gray-200 hover:shadow-md hover:border-red-300 transition-all duration-200 group/btn"
                      >
                        <FiTrash2
                          size={16}
                          className="group-hover/btn:scale-110 group-hover/btn:text-red-500 transition-all duration-200"
                        />
                      </button>
                      <button
                        onClick={() => transactionsButtonHandler(transactions)}
                        title="Transaction History"
                        className="p-2 rounded-lg border border-gray-200 hover:shadow-md hover:border-gray-300 transition-all duration-200 group/btn"
                      >
                        <FiClock
                          size={16}
                          className="group-hover/btn:scale-110 transition-transform duration-200"
                        />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {userData.length === 0 && (
        <div className="text-center py-12 border border-gray-200 rounded-lg mt-4">
          <FiUsers size={48} className="mx-auto mb-4 opacity-40" />
          <h3 className="text-lg font-semibold mb-2">No Users Found</h3>
          <p className="opacity-60">
            Start by adding your first user to the system.
          </p>
        </div>
      )}
    </div>
  );
};

export default UserManagement;
