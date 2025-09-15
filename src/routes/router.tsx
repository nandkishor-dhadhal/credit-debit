import { createBrowserRouter } from "react-router-dom";
import UserLayOut from "../layout/UserLayout";
import HomePage from "../pages/user/Home";
import TransferMoneyPage from "../pages/user/TransferMoney";
import AllTransactionDetail from "../pages/user/AllTransactions/Transactions";
import AdminDashboard from "../pages/admin/Dashboard";
import { transferMoneyAction } from "../actions/user/transfer-money.action";
import { signupAction } from "../actions/auth/signup.action";
import { loginAction } from "../actions/auth/login.action";
import { homePageLoader } from "../loaders/user/home.loader";
import { userHistoryLoader } from "../loaders/user/transactions.loader";
import { adminDashboard } from "../loaders/admin/dashboard.loader";
import AdminLayOut from "../layout/AdminLayout";
import ProtectedRoute from "./ProtectedRoute";
import LoginWrapper from "./LoginWrapper";
import SignupWrapper from "./SignupWrapper";
import UserManagement from "../pages/admin/UserManagement";
import { userManagementLoader } from "../loaders/admin/user-management.loader";
import EditUser from "../pages/admin/EditUser";
import UserTransactionHistory from "../pages/admin/UserTransactionHistory";
import { editUserLoader } from "../loaders/admin/edit-user.loader";
import { editUserAction } from "../actions/admin/edit-user.action";
import { userTransactionHistoryLoader } from "../loaders/admin/user-transactions.loader";

export const router = createBrowserRouter([
  {
    path: "/",
    element: (
      <ProtectedRoute allowedRoles={["user"]}>
        <UserLayOut />
      </ProtectedRoute>
    ),
    children: [
      { index: true, element: <HomePage />, loader: homePageLoader },
      {
        path: "transactions",
        element: <AllTransactionDetail />,
        loader: userHistoryLoader,
      },
      {
        path: "transfer-money",
        element: <TransferMoneyPage />,
        action: transferMoneyAction,
      },
    ],
  },
  {
    path: "/admin",
    element: (
      <ProtectedRoute allowedRoles={["admin"]}>
        <AdminLayOut />
      </ProtectedRoute>
    ),
    children: [
      {
        index: true,
        element: <AdminDashboard />,
        loader: adminDashboard,
      },
      {
        path: "users",
        element: <UserManagement />,
        loader: userManagementLoader,
      },
      {
        path: "users/edit/:accountNumber",
        element: <EditUser />,
        loader: editUserLoader,
        action: editUserAction,
      },
      {
        path: "users/transactions/:accountNumber",
        element: <UserTransactionHistory />,
        loader: userTransactionHistoryLoader,
      },
    ],
  },
  { path: "/login", element: <LoginWrapper />, action: loginAction },
  { path: "/signup", element: <SignupWrapper />, action: signupAction },
]);
