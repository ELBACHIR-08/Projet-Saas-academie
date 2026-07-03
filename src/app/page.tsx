"use client";

import React from "react";
import Link from "next/link";

interface CaseItem {
  id: string;
  number: string;
  title: string;
  description: string;
  xpReward: number;
  duration: string;
  status: "todo" | "locked" | "completed";
  route?: string;
}

const CASES_DATA: CaseItem[] = [
  {
    id: "case-12",
    number: "12",
    title: "Gestion de crise terrain",
    description: "Identifiez l'erreur commise lors d'une interaction client sous haute tension.",
    xpReward: 100,
    duration: "Vidéo : 5s",
    status: "todo",
    route: "/video-session",
  },
  {
    id: "case-13",
    number: "13",
    title: "Négociation client difficile",
    description: "Désamorcez les objections d'un acheteur mécontent concernant les tarifs du support.",
    xpReward: 150,
    duration: "Vidéo : 3m 20s",
    status: "locked",
  },
  {
    id: "case-14",
    number: "14",
    title: "Incident infrastructure cloud",
    description: "Débriefing d'une panne majeure et de la communication de crise associée.",
    xpReward: 120,
    duration: "Vidéo : 1m 45s",
    status: "completed",
  },
];

export default function DashboardPage() {
  return (
    <main className="relative flex flex-col w-full max-w-[480px] h-screen mx-auto bg-background text-foreground border-x-4 border-foreground overflow-hidden select-none font-sans shadow-[8px_8px_0px_0px_rgba(0,0,0,0.15)]">
      
      {/* 1. Header mobile - Dashboard view */}
      <header className="h-16 min-h-16 flex items-center justify-between px-4 border-b-4 border-foreground bg-background z-10">
        <div className="flex items-center gap-3">
          <button 
            type="button" 
            className="w-9 h-9 flex items-center justify-center border-2 border-foreground bg-secondary hover:bg-primary/20 active:translate-x-[2px] active:translate-y-[2px] shadow-[2px_2px_0px_0px_oklch(0.141_0.005_285.823)] rounded-none cursor-pointer"
            aria-label="Menu principal"
          >
            <svg className="w-5 h-5 text-foreground" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
              <path strokeLinecap="square" strokeLinejoin="miter" strokeWidth="2.5" d="M4 6h16M4 12h16M4 18h16"></path>
            </svg>
          </button>
          <div className="flex flex-col">
            <span className="font-extrabold tracking-tight text-xs text-primary uppercase">SaaS Académie</span>
            <span className="font-black tracking-tight text-sm uppercase -mt-0.5">Apprentissage</span>
          </div>
        </div>

        <div className="flex items-center gap-2">
          {/* XP Badge */}
          <div className="flex items-center gap-1 px-2.5 py-1 bg-primary border-2 border-foreground text-primary-foreground font-black text-xs rounded-none shadow-[2px_2px_0px_0px_oklch(0.141_0.005_285.823)]">
            <svg className="w-3.5 h-3.5 fill-current" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
              <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" />
            </svg>
            <span>XP 250</span>
          </div>
        </div>
      </header>

      {/* Scrollable Dashboard Body */}
      <section className="flex-1 overflow-y-auto px-5 py-6 pb-24">
        
        {/* Welcome Section */}
        <div className="mb-6">
          <h1 className="text-2xl font-black tracking-tight uppercase leading-none mb-1">
            Tableau de Bord
          </h1>
          <p className="text-xs font-semibold text-muted-foreground uppercase tracking-wide">
            Progression des Cas Pratiques Vidéo
          </p>
        </div>

        {/* Stats Grid - Premium Brutalist Block */}
        <div className="grid grid-cols-2 gap-3 mb-8">
          <div className="bg-card border-2 border-foreground p-3.5 shadow-[4px_4px_0px_0px_oklch(0.141_0.005_285.823)] rounded-none">
            <span className="block text-[10px] font-black uppercase text-muted-foreground tracking-widest mb-1">XP Cumulés</span>
            <span className="text-2xl font-black tracking-tight text-primary">250 XP</span>
          </div>
          <div className="bg-card border-2 border-foreground p-3.5 shadow-[4px_4px_0px_0px_oklch(0.141_0.005_285.823)] rounded-none">
            <span className="block text-[10px] font-black uppercase text-muted-foreground tracking-widest mb-1">Cas Résolus</span>
            <span className="text-2xl font-black tracking-tight">5 / 12</span>
          </div>
        </div>

        {/* Section Heading */}
        <div className="mb-4 flex items-center justify-between border-b-2 border-foreground pb-2">
          <h2 className="text-xs font-black uppercase tracking-wider text-foreground">
            Cas d'Études Disponibles
          </h2>
          <span className="text-[10px] font-black uppercase bg-secondary px-2 py-0.5 border border-foreground rounded-none shadow-[1px_1px_0px_0px_rgba(0,0,0,1)]">
            3 Modules
          </span>
        </div>

        {/* Practice Cases List */}
        <div className="flex flex-col gap-5">
          {CASES_DATA.map((caseItem) => {
            const isTodo = caseItem.status === "todo";
            const isLocked = caseItem.status === "locked";
            const isCompleted = caseItem.status === "completed";

            // Conditional styling classes
            let cardBg = "bg-card";
            let statusBadge = "";
            let interactiveStyle = "hover:translate-x-[2px] hover:translate-y-[2px] hover:shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] active:translate-x-[4px] active:translate-y-[4px] active:shadow-[0px_0px_0px_0px_rgba(0,0,0,1)] shadow-[6px_6px_0px_0px_rgba(0,0,0,1)] cursor-pointer";

            if (isTodo) {
              statusBadge = "bg-primary text-primary-foreground";
            } else if (isCompleted) {
              statusBadge = "bg-success-bg border-success-border text-success-text";
            } else if (isLocked) {
              cardBg = "bg-neutral-50 text-foreground/40";
              statusBadge = "bg-neutral-200 text-neutral-400 border-neutral-300";
              interactiveStyle = "opacity-60 shadow-none pointer-events-none cursor-not-allowed";
            }

            const CardContent = (
              <div className={`p-4 border-2 border-foreground transition-all duration-100 rounded-none h-full flex flex-col justify-between ${cardBg} ${interactiveStyle}`}>
                <div>
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-[10px] font-black uppercase tracking-widest text-primary">
                      Cas #{caseItem.number}
                    </span>
                    <span className={`text-[9px] font-black uppercase px-2 py-0.5 border border-foreground rounded-none ${statusBadge}`}>
                      {isTodo && "À commencer"}
                      {isCompleted && "Complété"}
                      {isLocked && "Verrouillé"}
                    </span>
                  </div>
                  <h3 className="font-black text-sm uppercase tracking-tight leading-tight mb-1">
                    {caseItem.title}
                  </h3>
                  <p className="text-xs text-foreground/75 leading-relaxed font-medium mb-3">
                    {caseItem.description}
                  </p>
                </div>

                <div className="flex items-center justify-between border-t border-foreground/15 pt-2 text-[10px] font-bold uppercase tracking-wider text-muted-foreground">
                  <span>{caseItem.duration}</span>
                  <span className="text-primary font-black">+{caseItem.xpReward} XP</span>
                </div>
              </div>
            );

            if (caseItem.route) {
              return (
                <Link key={caseItem.id} href={caseItem.route} className="block select-none rounded-none">
                  {CardContent}
                </Link>
              );
            }

            return (
              <div key={caseItem.id} className="block select-none rounded-none">
                {CardContent}
              </div>
            );
          })}
        </div>

      </section>

      {/* Footer Branding Banner */}
      <footer className="absolute bottom-0 left-0 w-full bg-foreground text-background py-3 text-center border-t-2 border-foreground z-10">
        <span className="text-[9px] font-black tracking-widest uppercase text-primary-foreground/80">
          Propulsé par SaaS Académie • 2026
        </span>
      </footer>

    </main>
  );
}
