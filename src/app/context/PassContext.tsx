"use client";

import React, { createContext, useContext, useState, useEffect } from "react";

interface UserProfile {
  fullName: string;
  email: string;
}

interface PassContextType {
  hasActivePass: boolean;
  setHasActivePass: (hasPass: boolean) => void;
  userProfile: UserProfile | null;
  setUserProfile: (profile: UserProfile | null) => void;
}

const PassContext = createContext<PassContextType | undefined>(undefined);

export function PassProvider({ children }: { children: React.ReactNode }) {
  const [hasActivePass, setHasActivePass] = useState<boolean>(false);
  const [userProfile, setUserProfile] = useState<UserProfile | null>(null);

  // Sync state from localStorage for persistent prototype state
  useEffect(() => {
    const savedPass = localStorage.getItem("saas_academie_pass");
    if (savedPass !== null) {
      setHasActivePass(savedPass === "true");
    }

    const savedUser = localStorage.getItem("saas_academie_user");
    if (savedUser !== null) {
      try {
        setUserProfile(JSON.parse(savedUser));
      } catch (e) {
        console.error("Erreur de parsing de l'utilisateur stocké :", e);
      }
    }
  }, []);

  const handleSetPass = (hasPass: boolean) => {
    setHasActivePass(hasPass);
    localStorage.setItem("saas_academie_pass", String(hasPass));
  };

  const handleSetUserProfile = (profile: UserProfile | null) => {
    setUserProfile(profile);
    if (profile) {
      localStorage.setItem("saas_academie_user", JSON.stringify(profile));
    } else {
      localStorage.removeItem("saas_academie_user");
    }
  };

  return (
    <PassContext.Provider
      value={{
        hasActivePass,
        setHasActivePass: handleSetPass,
        userProfile,
        setUserProfile: handleSetUserProfile,
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
