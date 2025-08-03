import React from "react";
import { useNavigate } from "react-router-dom";
import ButtonLink from "../../components/ButtonLink";

const NotFoundPage: React.FC = () => {
  const navigate = useNavigate();

  // Local component variables (following the pattern from other pages)
  const pageTitle = "Page Not Found";
  const errorCode = "404";
  const errorMessage = "Oops! The page you're looking for doesn't exist.";
  const suggestionText =
    "The page might have been moved, deleted, or you entered the wrong URL.";

  const actionButtons = [
    {
      label: "Go to Dashboard",
      path: "/admin/dashboard",
      variant: "primary" as const,
      icon: (
        <svg
          className="w-4 h-4"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M3 7v10a2 2 0 002 2h14a2 2 0 002-2V9a2 2 0 00-2-2H5a2 2 0 00-2-2z"
          />
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M8 5a2 2 0 012-2h4a2 2 0 012 2v6H8V5z"
          />
        </svg>
      ),
    },
    {
      label: "Go Back",
      path: "javascript:history.back()",
      variant: "secondary" as const,
      icon: (
        <svg
          className="w-4 h-4"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M10 19l-7-7m0 0l7-7m-7 7h18"
          />
        </svg>
      ),
    },
  ];

  const helpfulLinks = [
    { label: "All Blogs", path: "/admin/all-blogs" },
    { label: "Categories", path: "/admin/categories" },
    { label: "Settings", path: "/admin/settings" },
  ];

  // Animation variants for staggered animations
  const animationDelays = {
    title: "animate-fade-in",
    errorCode: "animate-bounce-in",
    message: "animate-slide-up",
    buttons: "animate-fade-in-delayed",
  };

  const handleGoBack = () => {
    if (window.history.length > 1) {
      navigate(-1);
    } else {
      navigate("/admin/dashboard");
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-background-primary to-background-secondary flex items-center justify-center p-4">
      <div className="max-w-2xl mx-auto text-center">
        {/* Error Code - Using global CSS variables */}
        <div
          className={`text-9xl font-bold mb-8 ${animationDelays.errorCode}`}
          style={{
            color: "var(--color-primary)",
            textShadow: "0 4px 8px rgba(var(--color-primary-rgb), 0.3)",
          }}
        >
          {errorCode}
        </div>

        {/* Page Title */}
        <h1
          className={`text-4xl font-bold mb-4 ${animationDelays.title}`}
          style={{ color: "var(--color-text-primary)" }}
        >
          {pageTitle}
        </h1>

        {/* Error Message */}
        <p
          className={`text-xl mb-6 ${animationDelays.message}`}
          style={{ color: "var(--color-text-secondary)" }}
        >
          {errorMessage}
        </p>

        {/* Suggestion Text */}
        <p
          className={`text-base mb-12 ${animationDelays.message}`}
          style={{ color: "var(--color-text-muted)" }}
        >
          {suggestionText}
        </p>

        {/* Action Buttons */}
        <div
          className={`flex flex-col sm:flex-row gap-4 justify-center mb-12 ${animationDelays.buttons}`}
        >
          {actionButtons.map((button, index) =>
            button.path === "javascript:history.back()" ? (
              <button
                key={index}
                onClick={handleGoBack}
                className={`flex items-center justify-center gap-2 px-6 py-3 rounded-lg font-medium transition-all duration-200 hover:scale-105 ${
                  button.variant === "primary"
                    ? "bg-[#000000] hover:bg-gray-800 text-white focus:ring-2 focus:ring-[#f88326] focus:ring-offset-2"
                    : "border border-gray-300 text-gray-700 bg-white hover:bg-gray-50 focus:ring-2 focus:ring-[#f88326] focus:ring-offset-2"
                }`}
              >
                {button.icon}
                {button.label}
              </button>
            ) : (
              <ButtonLink
                key={index}
                to={button.path}
                variant={button.variant}
                className="flex items-center justify-center gap-2 px-6 py-3 rounded-lg font-medium transition-all duration-200 hover:scale-105"
              >
                {button.icon}
                {button.label}
              </ButtonLink>
            )
          )}
        </div>

        {/* Helpful Links */}
        <div className={`border-t pt-8 ${animationDelays.buttons}`}>
          <p
            className="text-sm mb-4"
            style={{ color: "var(--color-text-muted)" }}
          >
            Or try one of these helpful links:
          </p>
          <div className="flex flex-wrap justify-center gap-4">
            {helpfulLinks.map((link, index) => (
              <button
                key={index}
                onClick={() => navigate(link.path)}
                className="text-sm px-4 py-2 rounded-md transition-all duration-200 hover:bg-gray-100"
                style={{
                  color: "var(--color-primary)",
                  border: "1px solid var(--color-border)",
                }}
              >
                {link.label}
              </button>
            ))}
          </div>
        </div>

        {/* Decorative Elements */}
        <div className="absolute inset-0 pointer-events-none overflow-hidden">
          {/* Background Pattern */}
          <div
            className="absolute top-1/4 left-1/4 w-32 h-32 rounded-full opacity-10"
            style={{
              background:
                "radial-gradient(circle, var(--color-primary) 0%, transparent 70%)",
              animation: "float 6s ease-in-out infinite",
            }}
          />
          <div
            className="absolute bottom-1/4 right-1/4 w-24 h-24 rounded-full opacity-10"
            style={{
              background:
                "radial-gradient(circle, var(--color-primary) 0%, transparent 70%)",
              animation: "float 6s ease-in-out infinite 2s",
            }}
          />
        </div>
      </div>

      {/* Custom CSS for animations */}
      <style>{`
        @keyframes float {
          0%, 100% { transform: translateY(0px) rotate(0deg); }
          50% { transform: translateY(-20px) rotate(180deg); }
        }
        
        .animate-fade-in {
          animation: fadeIn 0.8s ease-out;
        }
        
        .animate-bounce-in {
          animation: bounceIn 1s ease-out;
        }
        
        .animate-slide-up {
          animation: slideUp 0.8s ease-out 0.2s both;
        }
        
        .animate-fade-in-delayed {
          animation: fadeIn 0.8s ease-out 0.4s both;
        }
        
        @keyframes fadeIn {
          from { opacity: 0; }
          to { opacity: 1; }
        }
        
        @keyframes bounceIn {
          0% { transform: scale(0.3); opacity: 0; }
          50% { transform: scale(1.05); }
          70% { transform: scale(0.9); }
          100% { transform: scale(1); opacity: 1; }
        }
        
        @keyframes slideUp {
          from { transform: translateY(30px); opacity: 0; }
          to { transform: translateY(0); opacity: 1; }
        }
      `}</style>
    </div>
  );
};

export default NotFoundPage;
