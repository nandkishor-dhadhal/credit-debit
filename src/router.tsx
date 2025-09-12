/* eslint-disable react-refresh/only-export-components */
import { createBrowserRouter, Navigate } from "react-router-dom";
import UserLayOut from "./layout/UserLayOut/UserLayOut";
import HomePage from "./pages/HomePage";
import Login from "./pages/LoginPage";
import SignUpPage from "./pages/SignUpPage";
import { signupAction } from "./actions/signupAction";
import { loginAction } from "./actions/loginAction";
import TransferMoneyPage from "./pages/TransferMoneyPage";
import AllTransactionDetail from "./pages/AllTransactionDetail";
import { transferMoneyAction } from "./actions/transferMoneyAction";
import { useAuth } from "./context/authContext";
import type { JSX } from "react";

const Protected = ({ children }: { children: JSX.Element }) => {
  const { isLogin } = useAuth();
  return isLogin ? children : <Navigate to="/login" replace />;
};

const LoginWrapper = () => {
  const { isLogin } = useAuth();
  return isLogin ? <Navigate to="/" replace /> : <Login />;
};

const SignupWrapper = () => {
  const { isLogin } = useAuth();
  return isLogin ? <Navigate to="/" replace /> : <SignUpPage />;
};

export const router = createBrowserRouter([
  {
    path: "/",
    element: (
      <Protected>
        <UserLayOut />
      </Protected>
    ),
    children: [
      { index: true, element: <HomePage /> },
      { path: "transactions", element: <AllTransactionDetail /> },
      {
        path: "transfer-money",
        element: <TransferMoneyPage />,
        action: transferMoneyAction,
      },
    ],
  },
  { path: "/login", element: <LoginWrapper />, action: loginAction },
  { path: "/signup", element: <SignupWrapper />, action: signupAction },
]);
