import { Navigate } from "react-router-dom";
import { useAuth } from "../context/authContext";
import Login from "../pages/auth/Login";

const LoginWrapper = () => {
  const { token, user } = useAuth();
  const isLoggedIn = !!token;

  if (isLoggedIn) {
    if (user?.accountNumber === "44630210978676") {
      return <Navigate to="/admin" replace />;
    }
    return <Navigate to="/" replace />;
  }

  return <Login />;
};

export default LoginWrapper;
