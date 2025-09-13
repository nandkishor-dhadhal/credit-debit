import { Navigate } from "react-router-dom";
import { useAuth } from "../context/authContext";
import SignUpPage from "../pages/SignUpPage";

const SignupWrapper = () => {
  const { token, user } = useAuth();
  const isLoggedIn = !!token;

  if (isLoggedIn) {
    if (user?.accountNumber === "25477596035297") {
      return <Navigate to="/admin" replace />;
    }
    return <Navigate to="/" replace />;
  }

  return <SignUpPage />;
};

export default SignupWrapper;
