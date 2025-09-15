import { Navigate } from "react-router-dom";
import { useAuth } from "../context/authContext";
import SignUp from "../pages/auth/Signup";

const SignupWrapper = () => {
  const { token, user } = useAuth();
  const isLoggedIn = !!token;

  if (isLoggedIn) {
    if (user?.accountNumber === "31319980858019") {
      return <Navigate to="/admin" replace />;
    }
    return <Navigate to="/" replace />;
  }

  return <SignUp />;
};

export default SignupWrapper;
