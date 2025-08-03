import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import LoginForm from "./components/LoginForm";
import LoginHero from "./components/LoginHero";
import { useAuth } from "../../contexts/AuthContext";

const LoginPage: React.FC = () => {
  const navigate = useNavigate();
  const { isAuthenticated, loading } = useAuth();

  useEffect(() => {
    // If user is already authenticated, redirect to dashboard
    if (isAuthenticated && !loading) {
      navigate("/admin/dashboard");
    }
  }, [isAuthenticated, loading, navigate]);

  // Show loading state while checking authentication
  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-[#f9fafb]">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-[#f88326] mx-auto"></div>
          <p className="mt-4 text-[#515051]">Loading...</p>
        </div>
      </div>
    );
  }

  // If authenticated, don't render the login form (will redirect)
  if (isAuthenticated) {
    return null;
  }

  return (
    <div className="min-h-screen flex">
      {/* Left Column - Login Form */}
      <div className="flex-1 flex items-center justify-center bg-[#f9fafb] px-4 sm:px-6 lg:px-8">
        <LoginForm />
      </div>

      {/* Right Column - Hero Section */}
      <div className="hidden lg:block lg:w-1/2">
        <LoginHero />
      </div>
    </div>
  );
};

export default LoginPage;
