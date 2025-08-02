import React from "react";
import { Link } from "react-router-dom";

interface ButtonLinkProps {
  children?: React.ReactNode;
  to: string;
  variant?: "primary" | "secondary" | "outline";
  size?: "sm" | "md" | "lg";
  className?: string;
  icon?: React.ReactNode;
  mobileText?: string;
  desktopText?: string;
}

const ButtonLink: React.FC<ButtonLinkProps> = ({
  children,
  to,
  variant = "primary",
  size = "md",
  className = "",
  icon,
  mobileText,
  desktopText,
}) => {
  const baseClasses =
    "inline-flex items-center justify-center font-medium rounded-lg transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-offset-2";

  const variantClasses = {
    primary: "bg-[#000000] hover:bg-gray-800 text-white focus:ring-[#f88326]",
    secondary:
      "border border-gray-300 text-gray-700 bg-white hover:bg-gray-50 focus:ring-[#f88326]",
    outline:
      "border border-[#e5e7eb] hover:bg-[#f9fafb] text-[#515051] focus:ring-[#f88326]",
  };

  const sizeClasses = {
    sm: "px-3 py-2 text-sm",
    md: "px-3 py-2 lg:px-4 lg:py-2 text-sm",
    lg: "px-6 py-3 text-lg",
  };

  return (
    <Link
      to={to}
      className={`${baseClasses} ${variantClasses[variant]} ${sizeClasses[size]} ${className}`}
    >
      {icon && <span className="mr-2">{icon}</span>}
      {mobileText && desktopText ? (
        <>
          <span className="hidden sm:inline">{desktopText}</span>
          <span className="sm:hidden">{mobileText}</span>
        </>
      ) : (
        children
      )}
    </Link>
  );
};

export default ButtonLink;
