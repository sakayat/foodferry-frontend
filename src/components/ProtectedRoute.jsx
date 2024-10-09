import React, { useEffect } from "react";
import { Navigate } from "react-router-dom";
import { useProfileStore } from "../lib/store/zustandStore";

const ProtectedRoute = ({ children, requiredRole }) => {
  const token = localStorage.getItem("authToken");
  const { user } = useProfileStore();

  useEffect(() => {}, [token]);

  if (!user) {
    return <Navigate to="/login" state={{ from: location }} replace />;
  }

  if (requiredRole && user.role !== requiredRole) {
    return <Navigate to="/unauthorized/" />;
  }

  return children;
};

export default ProtectedRoute;
