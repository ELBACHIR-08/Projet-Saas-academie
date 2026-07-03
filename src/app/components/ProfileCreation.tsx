"use client";

import React, { useState } from "react";

interface ProfileCreationProps {
  OnProfileCreate: (profile: { fullName: string; email: string }) => void;
}

export default function ProfileCreation({ OnProfileCreate }: ProfileCreationProps) {
  const [fullName, setFullName] = useState<string>("");
  const [email, setEmail] = useState<string>("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!fullName || !email) return;

    // Transmet les données au composant parent
    OnProfileCreate({ fullName, email });
  };

  return (
    <div className="flex flex-col justify-between h-full p-4 animate-fade-in text-[var(--foreground)] bg-[var(--background)]">
      
      {/* Section Haute : Message de bienvenue & Vision */}
      <div className="space-y-6 pt-6">
        <div className="space-y-2">
          <span className="text-xs font-black uppercase bg-[var(--primary)] text-[var(--primary-foreground)] px-2 py-1">
            Bienvenue sur SaaS Académie
          </span>
          <h1 className="text-3xl font-black uppercase tracking-tight leading-none pt-2">
            Créez votre<br />compte d'apprentissage.
          </h1>
          <p className="text-xs font-bold text-[var(--muted-foreground)] uppercase tracking-wide">
            ⚡ 5 minutes par jour pour transformer vos compétences.
          </p>
        </div>

        {/* Formulaire de saisie Brutaliste */}
        <form id="profile-form" onSubmit={handleSubmit} className="space-y-4">
          
          {/* Champ Nom Complet */}
          <div className="space-y-1">
            <label htmlFor="fullName" className="text-[10px] font-black uppercase tracking-wider text-[var(--muted-foreground)]">
              Nom complet
            </label>
            <input
              id="fullName"
              type="text"
              required
              placeholder="Ex: Chérif Thiam"
              value={fullName}
              onChange={(e) => setFullName(e.target.value)}
              className="w-full h-12 px-4 border-2 border-[var(--foreground)] text-sm focus:outline-none focus:border-2 focus:border-[var(--primary)] rounded-none bg-[var(--background)] font-medium text-[var(--foreground)]"
            />
          </div>

          {/* Champ Adresse Email */}
          <div className="space-y-1">
            <label htmlFor="email" className="text-[10px] font-black uppercase tracking-wider text-[var(--muted-foreground)]">
              Adresse email
            </label>
            <input
              id="email"
              type="email"
              required
              placeholder="Ex: nom@domaine.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full h-12 px-4 border-2 border-[var(--foreground)] text-sm focus:outline-none focus:border-2 focus:border-[var(--primary)] rounded-none bg-[var(--background)] font-medium text-[var(--foreground)]"
            />
          </div>

        </form>
      </div>

      {/* Section Basse : Bouton d'action principal (Thumb Zone) */}
      <div className="space-y-4 pb-4">
        <p className="text-[10px] text-center text-[var(--muted-foreground)] px-2 leading-relaxed uppercase">
          En créant votre profil, vous acceptez le suivi de votre progression quotidienne et l'enregistrement de votre historique d'évaluation.
        </p>
        
        <button
          type="submit"
          form="profile-form"
          disabled={!fullName || !email}
          className="w-full h-14 bg-[var(--primary)] text-[var(--primary-foreground)] font-bold text-xs uppercase tracking-widest transition-all rounded-none disabled:opacity-40 disabled:cursor-not-allowed flex items-center justify-center cursor-pointer shadow-[3px_3px_0px_0px_var(--foreground)] active:translate-x-[3px] active:translate-y-[3px] active:shadow-[0px_0px_0px_0px_var(--foreground)]"
        >
          Créer mon profil & commencer
        </button>
      </div>

    </div>
  );
}
