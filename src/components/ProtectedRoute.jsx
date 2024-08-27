import React from "react";
import { Navigate } from "react-router-dom";
import { useProfileStore } from "../lib/store/zustandStore";

const ProtectedRoute = ({ children, requiredRole }) => {
  const token = localStorage.getItem("authToken");
  const { user } = useProfileStore();

  console.log(user);

  if (!token) {
    return <Navigate to="/sign-in/" />;
  }

  if (requiredRole && !user?.role?.includes(requiredRole)) {
    return <Navigate to="/unauthorized/" />;
  }

  return children;
};

export default ProtectedRoute;
