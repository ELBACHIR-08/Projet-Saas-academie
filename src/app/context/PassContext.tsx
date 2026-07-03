"use client";

import React, { createContext, useContext, useState, useEffect } from "react";

interface PassContextType {
  hasActivePass: boolean;
  setHasActivePass: (hasPass: boolean) => void;
}

const PassContext = createContext<PassContextType | undefined>(undefined);

export function PassProvider({ children }: { children: React.ReactNode }) {
  const [hasActivePass, setHasActivePass] = useState<boolean>(false);

  // Sync state from localStorage for persistent prototype state
  useEffect(() => {
    const saved = localStorage.getItem("saas_academie_pass");
    if (saved !== null) {
      setHasActivePass(saved === "true");
    }
  }, []);

  const handleSetPass = (hasPass: boolean) => {
    setHasActivePass(hasPass);
    localStorage.setItem("saas_academie_pass", String(hasPass));
  };

  return (
    <PassContext.Provider value={{ hasActivePass, setHasActivePass: handleSetPass }}>
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
