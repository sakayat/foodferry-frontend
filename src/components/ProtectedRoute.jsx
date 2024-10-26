import React, { useEffect } from "react";
import { Navigate } from "react-router-dom";

const ProtectedRoute = ({ children, requiredRole }) => {
  const data = localStorage.getItem("user");

  const user = JSON.parse(data);

  const token = user.token;

  useEffect(() => {}, [token]);

  if (!token && user) {
    return <Navigate to="/sign-in" />;
  }

  if (requiredRole && user.role !== requiredRole) {
    return <Navigate to="/unauthorized/" />;
  }

  return children;
};

export default ProtectedRoute;
