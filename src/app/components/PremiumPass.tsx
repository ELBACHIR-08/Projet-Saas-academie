"use client";

import React, { useState } from "react";

type Operator = "WAVE" | "ORANGE";

interface PremiumPassProps {
  onPaymentSuccess: () => void;
}

export default function PremiumPass({ onPaymentSuccess }: PremiumPassProps) {
  const [selectedOperator, setSelectedOperator] = useState<Operator>("WAVE");
  const [phoneNumber, setPhoneNumber] = useState<string>("");
  const [isProcessing, setIsProcessing] = useState<boolean>(false);

  const handlePaymentSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!phoneNumber) return;

    setIsProcessing(true);

    // Simulation de l'appel API vers l'agrégateur (PayTech/Bizao/Flutterwave)
    setTimeout(() => {
      setIsProcessing(false);
      onPaymentSuccess();
    }, 2000);
  };

  return (
    <div className="p-4 space-y-6 animate-fade-in text-[var(--foreground)]">
      
      {/* En-tête de statut actuel */}
      <div className="border border-[var(--border)] p-3 bg-[var(--secondary)] flex justify-between items-center rounded-none">
        <span className="text-xs font-bold tracking-wide uppercase">Statut de votre compte :</span>
        <span className="text-xs font-black uppercase text-[var(--destructive)] border border-[var(--destructive)] px-2 py-0.5">
          Accès Limité
        </span>
      </div>

      {/* La Carte Package Premium (Brutaliste Épurée) */}
      <div className="border-2 border-[var(--foreground)] bg-[var(--background)] p-4 rounded-none space-y-4 shadow-[4px_4px_0px_0px_var(--border)]">
        <div className="space-y-1">
          <span className="text-[10px] font-black uppercase tracking-widest text-[var(--primary)]">
            Abonnement Unique
          </span>
          <h2 className="text-xl font-black uppercase tracking-tight">
            Pass Académie Premium
          </h2>
          <div className="pt-2 flex items-baseline gap-1">
            <span className="text-2xl font-black tracking-tighter text-[var(--foreground)]">2 500 FCFA</span>
            <span className="text-xs font-bold text-[var(--muted-foreground)]">/ mois</span>
          </div>
        </div>

        {/* Grille des fonctionnalités incluses */}
        <ul className="space-y-2.5 pt-2 border-t border-[var(--border)] text-xs font-medium">
          <li className="flex items-center gap-2">
            <span className="text-[var(--primary)] font-bold">■</span> 1 cas pratique réel débloqué chaque jour
          </li>
          <li className="flex items-center gap-2">
            <span className="text-[var(--primary)] font-bold">■</span> Conseils et clés pédagogiques actionnables
          </li>
          <li className="flex items-center gap-2">
            <span className="text-[var(--primary)] font-bold">■</span> Accès illimité et cache local de l'historique
          </li>
          <li className="flex items-center gap-2">
            <span className="text-[var(--primary)] font-bold">■</span> Zéro publicité, focus 100% efficacité terrain
          </li>
        </ul>
      </div>

      {/* Formulaire de sélection Wallets */}
      <form onSubmit={handlePaymentSubmit} className="space-y-4 pt-2">
        <h3 className="text-xs font-black uppercase tracking-wider text-[var(--muted-foreground)]">
          Choisissez votre mode de paiement
        </h3>

        {/* Grille de sélections d'opérateurs (2 colonnes = boutons plus larges pour le pouce) */}
        <div className="grid grid-cols-2 gap-3">
          {/* Option WAVE */}
          <button
            key="operator-wave"
            type="button"
            onClick={() => setSelectedOperator("WAVE")}
            className={`h-14 flex flex-col items-center justify-center border transition-all rounded-none cursor-pointer ${
              selectedOperator === "WAVE"
                ? "border-2 border-[var(--primary)] bg-sky-50 font-black text-sky-700"
                : "border-[var(--border)] bg-[var(--background)] opacity-60"
            }`}
          >
            <span className="text-xs font-black tracking-widest">WAVE</span>
          </button>

          {/* Option ORANGE MONEY */}
          <button
            key="operator-orange"
            type="button"
            onClick={() => setSelectedOperator("ORANGE")}
            className={`h-14 flex flex-col items-center justify-center border transition-all rounded-none cursor-pointer ${
              selectedOperator === "ORANGE"
                ? "border-2 border-orange-500 bg-orange-50 font-black text-orange-700"
                : "border-[var(--border)] bg-[var(--background)] opacity-60"
            }`}
          >
            <span className="text-xs font-black tracking-widest">ORANGE MONEY</span>
          </button>
        </div>

        {/* Champ de saisie du Numéro de téléphone */}
        <div className="space-y-1">
          <label htmlFor="phone" className="text-[10px] font-black uppercase tracking-wider text-[var(--muted-foreground)]">
            Numéro de téléphone lié au compte
          </label>
          <input
            id="phone"
            type="tel"
            required
            placeholder="Ex: 77XXXXXXX / 76XXXXXXX"
            value={phoneNumber}
            onChange={(e) => setPhoneNumber(e.target.value)}
            className="w-full h-12 px-4 border border-[var(--foreground)] text-sm focus:outline-none focus:border-2 focus:border-[var(--primary)] rounded-none bg-[var(--background)] font-mono text-[var(--foreground)]"
          />
        </div>

        {/* Bouton d'action de paiement */}
        <button
          type="submit"
          disabled={isProcessing || !phoneNumber}
          className="w-full h-12 bg-[var(--primary)] text-[var(--primary-foreground)] font-bold text-xs uppercase tracking-widest transition-all rounded-none disabled:opacity-40 disabled:cursor-not-allowed flex items-center justify-center gap-2 cursor-pointer shadow-[2.5px_2.5px_0px_0px_var(--foreground)] active:translate-x-[2.5px] active:translate-y-[2.5px] active:shadow-[0px_0px_0px_0px_var(--foreground)]"
        >
          {isProcessing ? (
            <>
              <div className="w-4 h-4 border-2 border-white border-t-transparent animate-spin rounded-none"></div>
              Traitement en cours...
            </>
          ) : (
            `Payer avec ${selectedOperator === "ORANGE" ? "Orange Money" : "Wave"}`
          )}
        </button>
      </form>

      <p className="text-[10px] text-center text-[var(--muted-foreground)] px-4 leading-relaxed uppercase">
        Sécurisé par protocole de paiement crypté. Votre abonnement est mensuel et résiliable en un clic depuis votre espace profil.
      </p>
    </div>
  );
}
