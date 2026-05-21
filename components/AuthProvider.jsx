"use client";

import { createContext, useContext, useEffect, useMemo, useState } from "react";
import { authClient } from "@/lib/auth-client";
import { getLocalSession } from "@/lib/local-auth";

const AuthContext = createContext(null);

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

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
      setUser(getLocalSession());
    } catch {
      setUser(getLocalSession());
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    refreshSession();
  }, []);

  const value = useMemo(
    () => ({ user, loading, refreshSession, setUser }),
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
