"use client";

import React from "react";
import { usePass } from "../../context/PassContext";
import PremiumPass from "../../components/PremiumPass";

interface StatItem {
  label: string;
  value: string | number;
  highlight?: boolean;
}

const STATS: StatItem[] = [
  { label: "XP Cumulés", value: "250 XP", highlight: true },
  { label: "Cas Résolus", value: "3 / 12" },
  { label: "Temps d'Étude", value: "15 min" },
  { label: "Streak Actuelle", value: "4 Jours" },
];

interface BadgeItem {
  id: string;
  name: string;
  emoji: string;
  unlocked: boolean;
  desc: string;
}

const BADGES: BadgeItem[] = [
  { id: "b1", name: "Pionnier", emoji: "🚀", unlocked: true, desc: "Rejoindre la bêta de SaaS Académie" },
  { id: "b2", name: "Régulier", emoji: "🔥", unlocked: true, desc: "Atteindre un streak de 3 jours" },
  { id: "b3", name: "Expert CRO", emoji: "🛒", unlocked: false, desc: "Résoudre tous les cas E-commerce" },
];

export default function ProfilePage() {
  const { hasActivePass, setHasActivePass } = usePass();

  return (
    <div className="flex flex-col gap-6 px-5 py-6 pb-24">
      {/* Header section */}
      <section className="flex flex-col border-b border-[var(--border)] pb-4">
        <span className="text-[10px] font-black uppercase tracking-widest text-[var(--primary)] mb-1">
          Performances de l'Apprenant
        </span>
        <h1 className="text-2xl font-black uppercase tracking-tight text-[var(--foreground)]">
          Profil Utilisateur
        </h1>
      </section>

      {/* User Info Block */}
      <section className="border-2 border-[var(--foreground)] p-4 bg-card flex items-center gap-4 shadow-[4px_4px_0px_0px_var(--foreground)]">
        <div className="w-14 h-14 bg-[var(--primary)] text-[var(--primary-foreground)] flex items-center justify-center font-black text-2xl border-2 border-foreground select-none">
          JD
        </div>
        <div className="flex flex-col">
          <h2 className="font-black text-base uppercase tracking-tight text-[var(--foreground)] leading-none mb-1">
            Jean Dupont
          </h2>
          <span className="text-[10px] font-bold text-[var(--muted-foreground)] uppercase tracking-wider">
            Membre Premium • ID: #4810
          </span>
        </div>
      </section>

      {/* SIMULATED SUBSCRIPTION CARD (Pass Académie) */}
      <section className="flex flex-col gap-3">
        <h3 className="text-xs font-black uppercase tracking-wider text-[var(--muted-foreground)]">
          Abonnement & Accès
        </h3>
        
        {hasActivePass ? (
          <div className="border-2 border-[var(--foreground)] p-5 bg-card flex flex-col gap-4 shadow-[4px_4px_0px_0px_var(--foreground)] animate-fade-in">
            <div className="flex items-center justify-between">
              <span className="font-black text-sm uppercase tracking-tight text-[var(--foreground)]">
                Pass Académie Quotidien
              </span>
              <span className="text-[10px] font-black uppercase px-2 py-0.5 border bg-[oklch(0.96_0.04_142)] text-[oklch(0.25_0.05_142)] border-[oklch(0.65_0.18_142)]">
                Actif
              </span>
            </div>

            <p className="text-xs text-[var(--muted-foreground)] leading-relaxed font-medium">
              Votre Pass Académie est pleinement actif. Vous bénéficiez d'un accès illimité à l'ensemble des cas d'études quotidiens et des modules d'apprentissage.
            </p>

            <button
              onClick={() => {
                setHasActivePass(false);
                alert("Votre Pass Académie a été désactivé pour la simulation.");
              }}
              className="w-full h-12 font-bold uppercase tracking-wider text-xs border border-foreground transition-all cursor-pointer rounded-none shadow-[2.5px_2.5px_0px_0px_var(--foreground)] active:translate-x-[2.5px] active:translate-y-[2.5px] active:shadow-[0px_0px_0px_0px_var(--foreground)] bg-[oklch(0.96_0.04_142)] text-[oklch(0.25_0.05_142)] border-[oklch(0.65_0.18_142)] hover:bg-[oklch(0.93_0.06_142)]"
            >
              Désactiver le Pass Académie
            </button>
          </div>
        ) : (
          <div className="border border-[var(--border)] bg-card">
            <PremiumPass
              onPaymentSuccess={() => {
                setHasActivePass(true);
                alert("Paiement réussi ! Votre Pass Académie Premium est désormais activé.");
              }}
            />
          </div>
        )}
      </section>

      {/* Stats Grid */}
      <section className="flex flex-col gap-3">
        <h3 className="text-xs font-black uppercase tracking-wider text-[var(--muted-foreground)]">
          Statistiques de Compétences
        </h3>
        <div className="grid grid-cols-2 gap-3">
          {STATS.map((stat, idx) => (
            <div
              key={idx}
              className="border border-[var(--border)] p-3 bg-card flex flex-col justify-between min-h-[75px] shadow-[2px_2px_0px_0px_var(--border)]"
            >
              <span className="text-[9px] font-black uppercase tracking-wider text-[var(--muted-foreground)]">
                {stat.label}
              </span>
              <span
                className={`text-xl font-black tracking-tight uppercase ${
                  stat.highlight ? "text-[var(--primary)]" : "text-[var(--foreground)]"
                }`}
              >
                {stat.value}
              </span>
            </div>
          ))}
        </div>
      </section>

      {/* Badges Section */}
      <section className="flex flex-col gap-3">
        <h3 className="text-xs font-black uppercase tracking-wider text-[var(--muted-foreground)] border-b border-[var(--border)] pb-2">
          Badges Débloqués
        </h3>
        <div className="flex flex-col gap-3">
          {BADGES.map((badge) => (
            <div
              key={badge.id}
              className={`p-3 border flex items-center gap-4 transition-all ${
                badge.unlocked
                  ? "border-[var(--border)] bg-card shadow-[2px_2px_0px_0px_var(--border)]"
                  : "border-[var(--border)]/40 bg-[var(--secondary)] opacity-50 shadow-none"
              }`}
            >
              <span className="text-2xl select-none">{badge.emoji}</span>
              <div className="flex flex-col">
                <span className="font-black text-xs uppercase tracking-tight text-[var(--foreground)]">
                  {badge.name} {badge.unlocked ? "" : "🔒"}
                </span>
                <span className="text-[9px] font-semibold text-[var(--muted-foreground)] uppercase">
                  {badge.desc}
                </span>
              </div>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}
