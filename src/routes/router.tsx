import { createBrowserRouter } from "react-router-dom";
import UserLayOut from "../layout/UserLayOut/UserLayOut";
import HomePage from "../pages/HomePage";
import TransferMoneyPage from "../pages/TransferMoneyPage";
import AllTransactionDetail from "../pages/AllTransactionDetail/AllTransactionDetail";
import AdminDashboard from "../pages/AdminDashboard/AdminDashboard";
import { transferMoneyAction } from "../actions/transferMoneyAction";
import { signupAction } from "../actions/signupAction";
import { loginAction } from "../actions/loginAction";
import { homePageLoader } from "../loaders/homePageLoader";
import { userHistoryLoader } from "../loaders/userHistoryLoader";
import { adminDashboard } from "../loaders/adminDashboard";
import AdminLayOut from "../layout/AdminLayOut/AdminLayOut";

import ProtectedRoute from "./ProtectedRoute";
import LoginWrapper from "./LoginWrapper";
import SignupWrapper from "./SignupWrapper";
import UserManagement from "../pages/UserManagement";
import { userManagementLoader } from "../loaders/userManagementLoader";

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
    ],
  },
  { path: "/login", element: <LoginWrapper />, action: loginAction },
  { path: "/signup", element: <SignupWrapper />, action: signupAction },
]);
