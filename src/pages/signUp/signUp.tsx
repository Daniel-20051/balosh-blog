import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import SignUpForm from "./components/SignUpForm";
import SignUpHero from "./components/SignUpHero";
import { useUser } from "../../contexts/UserContext";

const SignUpPage = () => {
  const navigate = useNavigate();
  const { isAuthenticated, loading } = useUser();

  useEffect(() => {
    // If user is already authenticated, redirect to dashboard
    if (isAuthenticated && !loading) {
      navigate("/admin/dashboard");
    }
  }, [isAuthenticated, loading, navigate]);

  // If authenticated, don't render the signup form (will redirect)
  if (isAuthenticated) {
    return null;
  }

  return (
    <div className="min-h-screen flex">
      {/* Left Column - Sign Up Form */}
      <div className="flex-1 flex items-center justify-center bg-[#f9fafb] px-4 sm:px-6 lg:px-8">
        <SignUpForm />
      </div>

      {/* Right Column - Hero Section */}
      <div className="hidden lg:block lg:w-1/2">
        <SignUpHero />
      </div>
    </div>
  );
};

export default SignUpPage;
