import React, { useEffect, useRef } from "react";
import { useLoaderData, useNavigate } from "react-router-dom";
import $ from "jquery";
import "datatables.net";
import type { userManagementLoaderProps } from "../../loaders/admin/user-management.loader";
import { FIREBASE_URL } from "../../services/api";

const UserManagement: React.FC = () => {
  const { userData } = useLoaderData() as userManagementLoaderProps;
  const tableRef = useRef<HTMLTableElement>(null);
  const navigate = useNavigate();

  useEffect(() => {
    if (tableRef.current) {
      if ($.fn.dataTable.isDataTable(tableRef.current)) {
        $(tableRef.current).DataTable().destroy();
      }
      $(tableRef.current).DataTable({
        paging: true,
        searching: true,
        info: true,
        ordering: true,
      });
    }
  }, [userData]);

  const handleEdit = (accountNumber: string) => {
    navigate(`/admin/users/edit/${accountNumber}`);
  };

  const handleHistory = (accountNumber: string) => {
    navigate(`/admin/users/transactions/${accountNumber}`);
  };

  const handleDelete = async (accountNumber: string) => {
    const confirmDelete = window.confirm(
      "This will permanently delete the user and all their transactions. Are you sure?"
    );

    if (!confirmDelete) return;

    try {
      await fetch(`${FIREBASE_URL}/usersData/${accountNumber}.json`, {
        method: "DELETE",
      });
      await fetch(`${FIREBASE_URL}/transactions/${accountNumber}.json`, {
        method: "DELETE",
      });

      alert("User and their transactions deleted successfully.");
    } catch (error) {
      console.error("Error deleting user:", error);
      alert("Failed to delete user. Please try again.");
    }
  };

  return (
    <div className="p-6">
      <h2 className="text-2xl font-semibold mb-6">User Management</h2>
      <div className="overflow-x-auto shadow rounded-2xl">
        <table
          ref={tableRef}
          className="display w-full border border-gray-300 rounded-2xl"
        >
          <thead>
            <tr className="text-left">
              <th className="px-4 py-3 border-b">Account Number</th>
              <th className="px-4 py-3 border-b">Name</th>
              <th className="px-4 py-3 border-b">Email</th>
              <th className="px-4 py-3 border-b">Mobile</th>
              <th className="px-4 py-3 border-b">PAN Number</th>
              <th className="px-4 py-3 border-b">Available Balance</th>
              <th className="px-4 py-3 border-b text-center">Actions</th>
            </tr>
          </thead>
          <tbody>
            {userData.map(([user]) => (
              <tr
                key={user.accountNumber}
                className="hover:bg-blue-500 cursor-pointer transition-transform"
              >
                <td className="px-4 py-2 border-b">{user.accountNumber}</td>
                <td className="px-4 py-2 border-b">
                  {`${user.firstName} ${user.lastName}`}
                </td>
                <td className="px-4 py-2 border-b">{user.email}</td>
                <td className="px-4 py-2 border-b">{user.mobile}</td>
                <td className="px-4 py-2 border-b">{user.panNumber}</td>
                <td className="px-4 py-2 border-b">{user.availablebalance}</td>
                <td className="px-4 py-2 border-b text-center space-x-2">
                  <button
                    onClick={() => handleEdit(user.accountNumber)}
                    className="px-3 bg-green-500 cursor-pointer py-1 rounded border shadow hover:scale-105 transition-transform"
                  >
                    Edit
                  </button>
                  <button
                    onClick={() => handleDelete(user.accountNumber)}
                    className="px-3 bg-red-500 cursor-pointer py-1 rounded border shadow hover:scale-105 transition-transform"
                  >
                    Delete
                  </button>
                  <button
                    onClick={() => handleHistory(user.accountNumber)}
                    className="px-3 bg-cyan-500 cursor-pointer py-1 rounded border shadow hover:scale-105 transition-transform"
                  >
                    History
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default UserManagement;
