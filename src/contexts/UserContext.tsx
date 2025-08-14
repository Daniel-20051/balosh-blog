import React, { createContext, useContext, useState, useEffect } from "react";
import type { ReactNode } from "react";
import { getUser } from "../api";
import { getAuthToken, removeAuthToken } from "../utils/cookies";

interface User {
  id: string;
  username: string;
  bio: string;
  firstName: string;
  lastName: string;
  email: string;
  role: string;
  profilePhoto: string;
  createdAt: string;
  updatedAt: string;
}

interface UserContextType {
  user: User | null;
  loading: boolean;
  error: string | null;
  isAuthenticated: boolean;
  fetchUser: () => Promise<void>;
  clearUser: () => void;
  refreshUser: () => Promise<void>;
  refreshUserSilently: () => Promise<void>;
}

const UserContext = createContext<UserContextType | undefined>(undefined);

interface UserProviderProps {
  children: ReactNode;
}

export const UserProvider: React.FC<UserProviderProps> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  // Fetch user details from backend
  const fetchUser = async () => {
    try {
      setLoading(true);
      setError(null);
      const response = await getUser();

      const userData: User = {
        id: response.data.user._id,
        username: response.data.user.username,
        bio: response.data.user.bio || "",
        firstName: response.data.user.firstName,
        lastName: response.data.user.lastName,
        email: response.data.user.email,
        role: "admin",
        profilePhoto: response.data.user.profilePhoto,
        createdAt: response.data.user.createdAt || new Date().toISOString(),
        updatedAt: response.data.user.updatedAt || new Date().toISOString(),
      };
      setUser(userData);
    } catch (err) {
      setError("Failed to fetch user details");
      // If fetch fails, clear any existing user data
      setUser(null);
    } finally {
      setLoading(false);
    }
  };

  // Clear user data (useful for logout)
  const clearUser = () => {
    setUser(null);
    setError(null);
    setLoading(false);
    removeAuthToken(); // Remove the auth token cookie
  };

  // Refresh user data
  const refreshUser = async () => {
    if (user) {
      await fetchUser();
    }
  };

  // Refresh user data without toggling global loading state
  const refreshUserSilently = async () => {
    try {
      const response = await getUser();

      const userData: User = {
        id: response.data.user._id,
        username: response.data.user.username,
        bio: response.data.user.bio || "",
        firstName: response.data.user.firstName,
        lastName: response.data.user.lastName,
        email: response.data.user.email,
        role: "admin",
        profilePhoto: response.data.user.profilePhoto,
        createdAt: response.data.user.createdAt || new Date().toISOString(),
        updatedAt: response.data.user.updatedAt || new Date().toISOString(),
      };
      setUser(userData);
    } catch (err) {
      // keep existing user and error state unchanged for silent refresh
    }
  };

  // Fetch user on mount only if there's an auth token
  useEffect(() => {
    const token = getAuthToken();
    if (token) {
      fetchUser();
    } else {
      // No token, so no user data to fetch
      setLoading(false);
    }
  }, []);

  const value: UserContextType = {
    user,
    loading,
    error,
    isAuthenticated: !!user && !!getAuthToken(),
    fetchUser,
    clearUser,
    refreshUser,
    refreshUserSilently,
  };

  return <UserContext.Provider value={value}>{children}</UserContext.Provider>;
};

// Custom hook to use the user context
export const useUser = (): UserContextType => {
  const context = useContext(UserContext);
  if (context === undefined) {
    throw new Error("useUser must be used within a UserProvider");
  }
  return context;
};

// Hook for components that only need user data (no actions)
export const useUserData = (): {
  user: User | null;
  loading: boolean;
  error: string | null;
} => {
  const { user, loading, error } = useUser();
  return { user, loading, error };
};

// Hook for components that need to update user data
export const useUserActions = (): {
  clearUser: () => void;
  refreshUser: () => Promise<void>;
} => {
  const { clearUser, refreshUser } = useUser();
  return { clearUser, refreshUser };
};
