"use client";

import React, { createContext, useContext, useState, useEffect } from "react";

interface UserProfile {
  fullName: string;
  email: string;
}

interface PassContextType {
  hasActivePass: boolean;
  setHasActivePass: (hasPass: boolean) => void;
  user: UserProfile | null;
  setUser: (user: UserProfile | null) => void;
}

const PassContext = createContext<PassContextType | undefined>(undefined);

export function PassProvider({ children }: { children: React.ReactNode }) {
  const [hasActivePass, setHasActivePass] = useState<boolean>(false);
  const [user, setUserState] = useState<UserProfile | null>(null);

  // Sync state from localStorage for persistent prototype state
  useEffect(() => {
    const savedPass = localStorage.getItem("saas_academie_pass");
    if (savedPass !== null) {
      setHasActivePass(savedPass === "true");
    }

    const savedUser = localStorage.getItem("saas_academie_user");
    if (savedUser !== null) {
      try {
        setUserState(JSON.parse(savedUser));
      } catch (e) {
        console.error("Erreur de parsing de l'utilisateur stocké :", e);
      }
    }
  }, []);

  const handleSetPass = (hasPass: boolean) => {
    setHasActivePass(hasPass);
    localStorage.setItem("saas_academie_pass", String(hasPass));
  };

  const handleSetUser = (newUser: UserProfile | null) => {
    setUserState(newUser);
    if (newUser) {
      localStorage.setItem("saas_academie_user", JSON.stringify(newUser));
    } else {
      localStorage.removeItem("saas_academie_user");
    }
  };

  return (
    <PassContext.Provider
      value={{
        hasActivePass,
        setHasActivePass: handleSetPass,
        user,
        setUser: handleSetUser,
      }}
    >
      {children}
    </PassContext.Provider>
  );
}

export function usePass() {
  const context = useContext(PassContext);
  if (!context) {
    throw new Error("usePass must be used within a PassProvider");
  }
  return context;
}
