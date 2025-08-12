import React from "react";
import { Navigate } from "react-router-dom";
import { useUser } from "../contexts/UserContext";

interface ProtectedRouteProps {
  children: React.ReactNode;
}

const ProtectedRoute: React.FC<ProtectedRouteProps> = ({ children }) => {
  const { loading, isAuthenticated, user } = useUser();

  // Show loading spinner while user data is loading
  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-[#f88326]"></div>
      </div>
    );
  }

  // Check if user is authenticated and has user data
  if (!isAuthenticated || !user) {
    // Redirect to login page
    return <Navigate to="/" />;
  }

  return <>{children}</>;
};

export default ProtectedRoute;
