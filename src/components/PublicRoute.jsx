import { Navigate } from "react-router-dom";
import { useProfileStore } from "../lib/store/zustandStore";

const PublicRoute = ({ children }) => {
  const token = localStorage.getItem("authToken");
  const { user } = useProfileStore();

  if (token && user) {
    return <Navigate to="/" />;
  }

  return children;
};

export default PublicRoute;
