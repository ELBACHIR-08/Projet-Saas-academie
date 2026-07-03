"use client";

import React from "react";
import Link from "next/link";

interface HistoryItem {
  id: string;
  theme: string;
  emoji: string;
  title: string;
  completedAt: string;
  xpEarned: number;
}

const COMPLETED_CASES: HistoryItem[] = [
  {
    id: "h-1",
    theme: "E-commerce",
    emoji: "🛒",
    title: "Optimisation du taux de conversion (CRO) sur Shopify",
    completedAt: "Hier, 18:34",
    xpEarned: 120,
  },
  {
    id: "h-2",
    theme: "Marketing",
    emoji: "📢",
    title: "Mettre en place une boucle virale de parrainage",
    completedAt: "Il y a 3 jours, 09:15",
    xpEarned: 150,
  },
  {
    id: "h-3",
    theme: "Gestion",
    emoji: "📊",
    title: "Calcul du seuil de rentabilité d'un SaaS Bootstrappé",
    completedAt: "Il y a 4 jours, 14:20",
    xpEarned: 100,
  },
];

export default function HistoryPage() {
  return (
    <div className="flex flex-col gap-6 px-5 py-6 pb-24">
      {/* Header section */}
      <section className="flex flex-col border-b border-[var(--border)] pb-4">
        <span className="text-[10px] font-black uppercase tracking-widest text-[var(--primary)] mb-1">
          Apprentissages Validés
        </span>
        <h1 className="text-2xl font-black uppercase tracking-tight text-[var(--foreground)]">
          Historique des Cas
        </h1>
        <p className="text-xs text-[var(--muted-foreground)] font-medium mt-1">
          Retrouvez la liste des cas pratiques résolus et vos scores d'apprentissage.
        </p>
      </section>

      {/* Cases List */}
      <section className="flex flex-col gap-4">
        {COMPLETED_CASES.length > 0 ? (
          COMPLETED_CASES.map((item) => (
            <div
              key={item.id}
              className="border border-[var(--border)] p-4 bg-card flex flex-col gap-2 shadow-[2px_2px_0px_0px_var(--border)] hover:translate-x-[1px] hover:translate-y-[1px] hover:shadow-[1px_1px_0px_0px_var(--border)] transition-all"
            >
              <div className="flex items-center justify-between">
                <span className="text-[9px] font-black uppercase tracking-widest px-2 py-0.5 bg-[var(--secondary)] border border-[var(--border)] text-[var(--foreground)]">
                  {item.emoji} {item.theme}
                </span>
                <span className="text-[9px] font-bold text-[var(--muted-foreground)] uppercase">
                  {item.completedAt}
                </span>
              </div>

              <h2 className="font-black text-sm uppercase tracking-tight text-[var(--foreground)] leading-snug">
                {item.title}
              </h2>

              <div className="flex items-center justify-between border-t border-[var(--border)] pt-2 mt-2">
                <span className="text-[10px] font-black text-emerald-600 uppercase tracking-widest flex items-center gap-1">
                  ✓ Validé
                </span>
                <span className="text-[10px] font-black text-[var(--primary)] uppercase tracking-wider">
                  +{item.xpEarned} XP
                </span>
              </div>
            </div>
          ))
        ) : (
          <div className="border border-dashed border-[var(--border)] p-8 text-center text-xs text-[var(--muted-foreground)] uppercase font-bold">
            Aucun cas résolu pour le moment
          </div>
        )}
      </section>

      {/* Bottom stats banner */}
      <section className="bg-[var(--secondary)] border border-[var(--border)] p-4 text-center mt-4">
        <span className="text-[10px] font-black uppercase tracking-wider text-[var(--foreground)]">
          Total des points gagnés : <span className="text-[var(--primary)]">370 XP</span>
        </span>
      </section>
    </div>
  );
}
