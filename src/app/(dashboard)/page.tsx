"use client";

import React, { Suspense } from "react";
import Link from "next/link";
import { useSearchParams, useRouter } from "next/navigation";
import { usePass } from "../context/PassContext";

interface ArchiveTheme {
  id: string;
  name: string;
  emoji: string;
  category: string;
  status: "todo" | "completed";
  casesCount: number;
}

const ARCHIVE_THEMES: ArchiveTheme[] = [
  { id: "t1", name: "Marketing", emoji: "📢", category: "marketing", status: "completed", casesCount: 8 },
  { id: "t2", name: "Vente & Négos", emoji: "💼", category: "vente", status: "todo", casesCount: 6 },
  { id: "t3", name: "Gestion", emoji: "📊", category: "gestion", status: "todo", casesCount: 5 },
  { id: "t4", name: "E-commerce", emoji: "🛒", category: "ecommerce", status: "completed", casesCount: 7 },
  { id: "t5", name: "Product Growth", emoji: "🚀", category: "product", status: "todo", casesCount: 4 },
  { id: "t6", name: "Service Client", emoji: "🤝", category: "support", status: "completed", casesCount: 5 },
];

function DashboardContent() {
  const searchParams = useSearchParams();
  const router = useRouter();
  const { hasActivePass } = usePass();
  const activeTheme = searchParams.get("theme") || "";

  // Filter themes if a specific theme filter is selected in the Header
  const filteredThemes = activeTheme
    ? ARCHIVE_THEMES.filter((theme) => theme.category === activeTheme)
    : ARCHIVE_THEMES;

  // Daily Case details
  const dailyCase = {
    theme: "📢 Marketing",
    title: "Le Framework AARRR appliqué aux TPE",
    duration: "4 min",
    difficulty: "Intermédiaire",
  };

  const handleStartDefi = (e: React.MouseEvent) => {
    e.preventDefault();
    if (!hasActivePass) {
      router.push("/profile");
      alert("Pour accéder aux cas pratiques quotidiens, vous devez activer votre Pass Académie.");
    } else {
      router.push("/video-session");
    }
  };

  return (
    <div className="flex flex-col gap-6 px-5 py-6 pb-24">
      {/* Bloc 1: Top Hero & Streak Tracker */}
      <section className="flex flex-col gap-4 border-b border-[var(--border)] pb-6">
        <div className="flex flex-col">
          <span className="text-[10px] font-black uppercase tracking-widest text-[var(--primary)] mb-1">
            Focus Quotidien
          </span>
          <h1 className="text-3xl font-black uppercase tracking-tighter leading-[0.95] text-[var(--foreground)]">
            5 Minutes.
            <br />1 Cas Réel.
            <br />1 Compétence.
          </h1>
        </div>

        {/* Streak / Flamme Tracker */}
        <div className="bg-[var(--secondary)] border border-[var(--border)] p-3 flex items-center gap-3">
          <span className="text-2xl select-none" role="img" aria-label="Streak">
            🔥
          </span>
          <div className="flex flex-col">
            <span className="font-black text-sm uppercase tracking-tight text-[var(--foreground)]">
              4 jours consécutifs
            </span>
            <span className="text-[10px] font-bold uppercase tracking-wider text-[var(--muted-foreground)]">
              d'apprentissage quotidien
            </span>
          </div>
        </div>
      </section>

      {/* Bloc 2: Le Défi du Jour */}
      <section className="flex flex-col gap-3">
        <h2 className="text-xs font-black uppercase tracking-wider text-[var(--muted-foreground)]">
          Défi recommandé aujourd'hui
        </h2>

        <div className="border-2 border-[var(--foreground)] p-5 bg-card flex flex-col justify-between shadow-[4px_4px_0px_0px_var(--foreground)] transition-all">
          <div>
            <div className="flex items-center justify-between mb-3">
              <span className="text-[10px] font-black uppercase tracking-widest px-2 py-0.5 bg-[var(--secondary)] border border-[var(--border)] text-[var(--foreground)]">
                {dailyCase.theme}
              </span>
              <span className="text-[10px] font-bold uppercase tracking-wider text-[var(--muted-foreground)]">
                ⏱️ {dailyCase.duration}
              </span>
            </div>

            <h3 className="text-xl font-black uppercase tracking-tight leading-snug mb-2 text-[var(--foreground)]">
              {dailyCase.title}
            </h3>

            <p className="text-xs text-[var(--muted-foreground)] leading-relaxed font-medium mb-6">
              Maîtrisez les 5 étapes critiques du funnel AARRR pour doubler la rétention de vos utilisateurs en moins de 30 jours sans budget publicitaire.
            </p>
          </div>

          <button
            onClick={handleStartDefi}
            className="bg-[var(--primary)] text-white w-full h-12 font-bold uppercase tracking-wider text-xs border border-foreground shadow-[2.5px_2.5px_0px_0px_var(--foreground)] hover:translate-x-[1px] hover:translate-y-[1px] hover:shadow-[1.5px_1.5px_0px_0px_var(--foreground)] active:translate-x-[2.5px] active:translate-y-[2.5px] active:shadow-[0px_0px_0px_0px_var(--foreground)] transition-all cursor-pointer rounded-none"
          >
            Lancer le défi du jour
          </button>
        </div>
      </section>

      {/* Bloc 3: Grille des Thèmes d'Archives */}
      <section className="flex flex-col gap-3">
        <div className="flex items-center justify-between border-b border-[var(--border)] pb-2">
          <h2 className="text-xs font-black uppercase tracking-wider text-[var(--muted-foreground)]">
            Thèmes d'archives
          </h2>
          <span className="text-[9px] font-black uppercase px-2 py-0.5 bg-[var(--secondary)] border border-[var(--border)]">
            {filteredThemes.length} {filteredThemes.length > 1 ? "Thèmes" : "Thème"}
          </span>
        </div>

        <div className="grid grid-cols-2 gap-3">
          {filteredThemes.map((theme) => {
            const isCompleted = theme.status === "completed";
            return (
              <div
                key={theme.id}
                className={`p-4 border border-[var(--border)] bg-card flex flex-col justify-between min-h-[110px] shadow-[2px_2px_0px_0px_var(--border)] transition-all ${
                  isCompleted ? "border-l-4 border-l-[var(--primary)]" : ""
                }`}
              >
                <div>
                  <span className="text-xl mb-1 block select-none">{theme.emoji}</span>
                  <h3 className="font-black text-xs uppercase tracking-tight text-[var(--foreground)] line-clamp-1">
                    {theme.name}
                  </h3>
                  <span className="text-[9px] font-semibold text-[var(--muted-foreground)]">
                    {theme.casesCount} cas pratiques
                  </span>
                </div>

                <div className="mt-3 flex items-center justify-between">
                  <span
                    className={`text-[9px] font-black uppercase px-1.5 py-0.5 border ${
                      isCompleted
                        ? "bg-[oklch(0.96_0.04_142)] text-[oklch(0.25_0.05_142)] border-[oklch(0.65_0.18_142)]"
                        : "bg-[var(--secondary)] text-[var(--muted-foreground)] border-[var(--border)]"
                    }`}
                  >
                    {isCompleted ? "Fait" : "À faire"}
                  </span>
                </div>
              </div>
            );
          })}
        </div>
      </section>
    </div>
  );
}

export default function WelcomeDashboardPage() {
  return (
    <Suspense fallback={
      <div className="flex flex-col gap-6 px-5 py-6 pb-24">
        <div className="h-40 bg-[var(--secondary)] animate-pulse border border-[var(--border)]" />
        <div className="h-60 bg-[var(--secondary)] animate-pulse border border-[var(--border)]" />
      </div>
    }>
      <DashboardContent />
    </Suspense>
  );
}
