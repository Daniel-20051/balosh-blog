import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import LoginForm from "./components/LoginForm";
import LoginHero from "./components/LoginHero";
import { useUser } from "../../contexts/UserContext";

const LoginPage: React.FC = () => {
  const navigate = useNavigate();
  const { isAuthenticated, loading } = useUser();

  useEffect(() => {
    // If user is already authenticated, redirect to dashboard
    if (isAuthenticated && !loading) {
      navigate("/admin/dashboard");
    }
  }, [isAuthenticated, loading, navigate]);

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
