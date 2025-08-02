import React from "react";
import LoginForm from "./components/LoginForm";
import LoginHero from "./components/LoginHero";

const LoginPage: React.FC = () => {
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
