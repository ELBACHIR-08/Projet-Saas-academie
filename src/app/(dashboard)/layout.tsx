"use client";

import React, { useRef, useEffect, Suspense } from "react";
import Link from "next/link";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { usePass } from "../context/PassContext";
import ProfileCreation from "../components/ProfileCreation";

interface ThemeTab {
  label: string;
  value: string;
}

const THEME_TABS: ThemeTab[] = [
  { label: "Tous les cas", value: "" },
  { label: "📢 Marketing", value: "marketing" },
  { label: "💼 Vente & Négos", value: "vente" },
  { label: "📊 Gestion", value: "gestion" },
  { label: "🛒 E-commerce", value: "ecommerce" },
];

function ThemeTabs() {
  const searchParams = useSearchParams();
  const pathname = usePathname();
  const router = useRouter();
  const activeTheme = searchParams.get("theme") || "";
  const tabsContainerRef = useRef<HTMLDivElement>(null);

  // Auto-scroll the active tab into view in the horizontal menu
  useEffect(() => {
    if (!tabsContainerRef.current) return;
    const activeTabElement = tabsContainerRef.current.querySelector(
      `[data-active="true"]`
    ) as HTMLElement;
    if (activeTabElement) {
      const container = tabsContainerRef.current;
      const scrollLeft =
        activeTabElement.offsetLeft -
        container.clientWidth / 2 +
        activeTabElement.clientWidth / 2;
      container.scrollTo({ left: scrollLeft, behavior: "smooth" });
    }
  }, [activeTheme]);

  const handleThemeChange = (value: string) => {
    if (pathname !== "/") {
      router.push(`/?theme=${value}`);
    } else {
      const params = new URLSearchParams(searchParams.toString());
      if (value) {
        params.set("theme", value);
      } else {
        params.delete("theme");
      }
      router.push(`?${params.toString()}`);
    }
  };

  return (
    <div
      ref={tabsContainerRef}
      className="flex overflow-x-auto whitespace-nowrap scrollbar-none snap-x scroll-smooth bg-[var(--secondary)] border-b border-[var(--border)]"
    >
      {THEME_TABS.map((tab) => {
        const isActive = activeTheme === tab.value;
        return (
          <button
            key={tab.value}
            data-active={isActive}
            onClick={() => handleThemeChange(tab.value)}
            className={`snap-start px-5 py-3 text-xs font-black uppercase tracking-wider transition-all border-r border-[var(--border)] cursor-pointer rounded-none inline-block ${
              isActive
                ? "bg-[var(--foreground)] text-[var(--background)]"
                : "text-[var(--foreground)] hover:bg-[var(--border)]/20 bg-transparent"
            }`}
          >
            {tab.label}
          </button>
        );
      })}
    </div>
  );
}

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const pathname = usePathname();
  const { userProfile, setUserProfile } = usePass();

  // Si le profil n'existe pas, on force la création de profil avant d'afficher le reste
  if (!userProfile) {
    return (
      <div className="w-full max-w-[480px] h-screen mx-auto bg-[var(--background)] border-x border-[var(--border)] overflow-hidden">
        <ProfileCreation OnProfileCreate={(profile) => setUserProfile(profile)} />
      </div>
    );
  }

  // Sinon, le reste de votre application (Header, Main view, Footer) s'affiche normalement
  return (
    <div className="flex flex-col h-screen w-full max-w-[480px] mx-auto border-x border-[var(--border)] bg-background text-foreground shadow-[0_0_24px_rgba(0,0,0,0.05)] overflow-hidden">
      {/* HEADER: Horizontal scrolling theme tabs with brutalist header */}
      <header className="flex flex-col border-b border-[var(--border)] bg-background z-20 shrink-0">
        <div className="h-14 flex items-center justify-between px-4 border-b border-[var(--border)]">
          <div className="flex flex-col select-none">
            <span className="font-extrabold tracking-widest text-[10px] text-[var(--primary)] uppercase">
              SaaS Académie
            </span>
            <span className="font-black tracking-tight text-base uppercase -mt-1">
              Plateforme d'Apprentissage
            </span>
          </div>

          {/* XP Tracker Mini-Badge */}
          <div className="flex items-center gap-1.5 px-2.5 py-1 bg-[var(--primary)] text-[var(--primary-foreground)] font-black text-xs rounded-none border border-foreground shadow-[2px_2px_0px_0px_var(--foreground)]">
            <svg
              className="w-3.5 h-3.5 fill-current"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" />
            </svg>
            <span className="tracking-wide">250 XP</span>
          </div>
        </div>

        {/* Horizontal Scrolling Tab Bar wrapped in Suspense to allow static exports of other pages */}
        <Suspense fallback={<div className="h-10 bg-[var(--secondary)] border-b border-[var(--border)] animate-pulse" />}>
          <ThemeTabs />
        </Suspense>
      </header>

      {/* MAIN CONTENT AREA: Scrollable dashboard content */}
      <main className="flex-1 overflow-y-auto bg-background relative focus:outline-none scrollbar-none">
        {children}
      </main>

      {/* BOTTOM NAVIGATION BAR: Thumb Zone Navigation */}
      <nav className="h-16 border-t border-[var(--border)] bg-background flex items-center justify-around z-20 shrink-0 shadow-[0_-2px_10px_rgba(0,0,0,0.02)]">
        {/* Accueil Link */}
        <Link
          href="/"
          className={`flex flex-col items-center justify-center w-full h-full cursor-pointer transition-all rounded-none ${
            pathname === "/"
              ? "text-[var(--primary)] font-black"
              : "text-[var(--muted-foreground)] font-semibold hover:text-[var(--foreground)]"
          }`}
        >
          <svg
            className="w-5.5 h-5.5 mb-1"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            viewBox="0 0 24 24"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              strokeLinecap="square"
              strokeLinejoin="miter"
              d="M3 12l9-9 9 9M5 10v10a1 1 0 001 1h3v-6h4v6h3a1 1 0 001-1V10"
            />
          </svg>
          <span className="text-[10px] uppercase tracking-widest">Accueil</span>
        </Link>

        {/* Historique Link */}
        <Link
          href="/history"
          className={`flex flex-col items-center justify-center w-full h-full cursor-pointer transition-all rounded-none ${
            pathname === "/history"
              ? "text-[var(--primary)] font-black"
              : "text-[var(--muted-foreground)] font-semibold hover:text-[var(--foreground)]"
          }`}
        >
          <svg
            className="w-5.5 h-5.5 mb-1"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            viewBox="0 0 24 24"
            xmlns="http://www.w3.org/2000/svg"
          >
            <circle cx="12" cy="12" r="9" strokeLinecap="square" />
            <path strokeLinecap="square" strokeLinejoin="miter" d="M12 7v5l3 2" />
          </svg>
          <span className="text-[10px] uppercase tracking-widest">
            Historique
          </span>
        </Link>

        {/* Profil Link */}
        <Link
          href="/profile"
          className={`flex flex-col items-center justify-center w-full h-full cursor-pointer transition-all rounded-none ${
            pathname === "/profile"
              ? "text-[var(--primary)] font-black"
              : "text-[var(--muted-foreground)] font-semibold hover:text-[var(--foreground)]"
          }`}
        >
          <svg
            className="w-5.5 h-5.5 mb-1"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            viewBox="0 0 24 24"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              strokeLinecap="square"
              strokeLinejoin="miter"
              d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"
            />
          </svg>
          <span className="text-[10px] uppercase tracking-widest">Profil</span>
        </Link>
      </nav>
    </div>
  );
}
