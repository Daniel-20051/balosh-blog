import React, { createContext, useContext, useState, useEffect } from "react";
import type { ReactNode } from "react";
import { getAuthToken, removeAuthToken } from "../utils/cookies";
export const BASE_URL = "https://balosh-blog-api.onrender.com/api/v1";

interface AuthContextType {
  isAuthenticated: boolean;
  logout: () => void;
  loading: boolean;
  setLoading: (loading: boolean) => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
};

interface AuthProviderProps {
  children: ReactNode;
}

export const AuthProvider: React.FC<AuthProviderProps> = ({ children }) => {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Check if user is already logged in
    const token = getAuthToken();

    if (token) {
      try {
        setLoading(false);
      } catch (error) {
        console.error("Error parsing user data:", error);
        removeAuthToken();
      }
    }

    setLoading(false);
  }, []);

  const logout = () => {
    removeAuthToken(); // Remove the auth token cookie
  };

  const value: AuthContextType = {
    isAuthenticated: !!getAuthToken(),
    logout,
    loading,
    setLoading,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};
