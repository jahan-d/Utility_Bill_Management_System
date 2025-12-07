import { Navigate } from "react-router";

const ProtectedRoute = ({ children }) => {
  const isLoggedIn = !!localStorage.getItem("user"); // Or your auth state

  if (!isLoggedIn) {
    return <Navigate to="/login" replace />;
  }

  return children;
};

export default ProtectedRoute;
