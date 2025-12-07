import React from "react";
import { Navigate, useLocation } from "react-router";
import { useAuth } from "../context/AuthContext";

export default function PrivateRoute({ children }) {
  const { user, loading } = useAuth();
  const location = useLocation();

  if (loading) {
    // Optional: you can show a spinner or loading message here
    return (
      <div className="flex justify-center items-center min-h-screen">
        <p className="text-xl font-semibold">Loading...</p>
      </div>
    );
  }

  if (!user) {
    // Redirect unauthenticated users to login page
    return <Navigate to="/login" state={{ from: location }} replace />;
  }

  return children;
}
