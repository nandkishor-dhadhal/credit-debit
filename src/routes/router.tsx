import { createBrowserRouter } from "react-router-dom";
import { Suspense, lazy } from "react";
import ProtectedRoute from "./ProtectedRoute";
import LoginWrapper from "./LoginWrapper";
import SignupWrapper from "./SignupWrapper";
import { homePageLoader } from "../loaders/user/home.loader";
import { editUserLoader } from "../loaders/admin/edit-user.loader";
import { adminDashboard } from "../loaders/admin/dashboard.loader";
import { userHistoryLoader } from "../loaders/user/transactions.loader";
import { userManagementLoader } from "../loaders/admin/user-management.loader";
import { userTransactionHistoryLoader } from "../loaders/admin/user-transactions.loader";
import { loginAction } from "../actions/auth/login.action";
import { signupAction } from "../actions/auth/signup.action";
import { editUserAction } from "../actions/admin/edit-user.action";
import { transferMoneyAction } from "../actions/user/transfer-money.action";
import Loader from "../components/Loader";

const UserLayOut = lazy(() => import("../layout/UserLayout"));
const AdminLayOut = lazy(() => import("../layout/AdminLayout"));
const HomePage = lazy(() => import("../pages/user/Home"));
const TransferMoneyPage = lazy(() => import("../pages/user/TransferMoney"));
const AllTransactionDetail = lazy(
  () => import("../pages/user/AllTransactions/Transactions")
);
const AdminDashboard = lazy(() => import("../pages/admin/Dashboard"));
const UserManagement = lazy(() => import("../pages/admin/UserManagement"));
const EditUser = lazy(() => import("../pages/admin/EditUser"));
const UserTransactionHistory = lazy(
  () => import("../pages/admin/UserTransactionHistory")
);

// eslint-disable-next-line react-refresh/only-export-components
const LoadingFallback = () => <Loader />;

export const router = createBrowserRouter([
  {
    path: "/",
    element: (
      <ProtectedRoute allowedRoles={["user"]}>
        <Suspense fallback={<LoadingFallback />}>
          <UserLayOut />
        </Suspense>
      </ProtectedRoute>
    ),
    children: [
      {
        index: true,
        element: (
          <Suspense fallback={<LoadingFallback />}>
            <HomePage />
          </Suspense>
        ),
        loader: homePageLoader,
      },
      {
        path: "transactions",
        element: (
          <Suspense fallback={<LoadingFallback />}>
            <AllTransactionDetail />
          </Suspense>
        ),
        loader: userHistoryLoader,
      },
      {
        path: "transfer-money",
        element: (
          <Suspense fallback={<LoadingFallback />}>
            <TransferMoneyPage />
          </Suspense>
        ),
        action: transferMoneyAction,
      },
    ],
  },
  {
    path: "/admin",
    element: (
      <ProtectedRoute allowedRoles={["admin"]}>
        <Suspense fallback={<LoadingFallback />}>
          <AdminLayOut />
        </Suspense>
      </ProtectedRoute>
    ),
    children: [
      {
        index: true,
        element: (
          <Suspense fallback={<LoadingFallback />}>
            <AdminDashboard />
          </Suspense>
        ),
        loader: adminDashboard,
      },
      {
        path: "users",
        element: (
          <Suspense fallback={<LoadingFallback />}>
            <UserManagement />
          </Suspense>
        ),
        loader: userManagementLoader,
      },
      {
        path: "users/edit/:accountNumber",
        element: (
          <Suspense fallback={<LoadingFallback />}>
            <EditUser />
          </Suspense>
        ),
        loader: editUserLoader,
        action: editUserAction,
      },
      {
        path: "users/transactions/:accountNumber",
        element: (
          <Suspense fallback={<LoadingFallback />}>
            <UserTransactionHistory />
          </Suspense>
        ),
        loader: userTransactionHistoryLoader,
      },
    ],
  },
  { path: "/login", element: <LoginWrapper />, action: loginAction },
  { path: "/signup", element: <SignupWrapper />, action: signupAction },
]);
