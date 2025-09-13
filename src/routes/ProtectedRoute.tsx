import { Navigate } from "react-router-dom";
import { useAuth } from "../context/authContext";
import type { ReactNode } from "react";

interface ProtectedRouteProps {
  children: ReactNode;
  allowedRoles: ("user" | "admin")[];
}

const ProtectedRoute = ({ children, allowedRoles }: ProtectedRouteProps) => {
  const { token, user } = useAuth();
  const isLoggedIn = !!token;

  if (!isLoggedIn) {
    return <Navigate to="/login" replace />;
  }

  const isAdmin = user?.accountNumber === "25477596035297";
  const userRole = isAdmin ? "admin" : "user";

  if (!allowedRoles.includes(userRole)) {
    if (isAdmin) {
      return <Navigate to="/admin" replace />;
    } else {
      return <Navigate to="/" replace />;
    }
  }

  return <>{children}</>;
};

export default ProtectedRoute;
