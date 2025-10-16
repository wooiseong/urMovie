import React, { ReactNode } from "react";
import { Navigate, Outlet } from "react-router-dom";
interface ProtectedRouteProps {
  isAdmin?: boolean;
}

const ProtectedRoute: React.FC<ProtectedRouteProps> = ({ isAdmin = false }) => {
  const isLoggedIn = Boolean(localStorage.getItem("isLoggedIn"));
  const userRole = localStorage.getItem("role");

  if (!isLoggedIn) {
    return <Navigate to="/login" replace />;
  }

  if (isAdmin && userRole !== "admin") {
    return <Navigate to="/" replace />;
  }

  return <Outlet />;
};

export default ProtectedRoute;
