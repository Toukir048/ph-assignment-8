"use client";

import { createContext, useContext, useEffect, useMemo, useState } from "react";
import { authClient } from "@/lib/auth-client";

export type AppUser = {
  name: string;
  email: string;
  image?: string | null;
};

type AuthContextValue = {
  user: AppUser | null;
  loading: boolean;
  refreshSession: () => Promise<void>;
  setFallbackUser: (user: AppUser | null) => void;
};

const AuthContext = createContext<AuthContextValue | null>(null);

const fallbackKey = "skillsphere-demo-user";

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<AppUser | null>(null);
  const [loading, setLoading] = useState(true);

  const setFallbackUser = (nextUser: AppUser | null) => {
    setUser(nextUser);
    if (typeof window === "undefined") return;
    if (nextUser) {
      localStorage.setItem(fallbackKey, JSON.stringify(nextUser));
    } else {
      localStorage.removeItem(fallbackKey);
    }
  };

  const refreshSession = async () => {
    setLoading(true);
    try {
      const { data } = await authClient.getSession();
      if (data?.user) {
        setUser({
          name: data.user.name,
          email: data.user.email,
          image: data.user.image
        });
        return;
      }
      const stored = localStorage.getItem(fallbackKey);
      setUser(stored ? JSON.parse(stored) : null);
    } catch {
      const stored = localStorage.getItem(fallbackKey);
      setUser(stored ? JSON.parse(stored) : null);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    refreshSession();
  }, []);

  const value = useMemo(
    () => ({ user, loading, refreshSession, setFallbackUser }),
    [user, loading]
  );

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used inside AuthProvider");
  }
  return context;
}
