"use client";

import React, { useState, useRef, useEffect } from "react";
import Link from "next/link";
import {
  SessionState,
  Option,
  getNextState,
  getActionButtonLabel,
  getOptionClasses,
} from "../session-logic";

const OPTIONS_DATA: Option[] = [
  { id: "opt-a", letter: "A", label: "Manque d'empathie initiale", isCorrect: true },
  { id: "opt-b", letter: "B", label: "Interruption prématurée", isCorrect: false },
  { id: "opt-c", letter: "C", label: "Tonalité trop informelle", isCorrect: false },
];

export default function VideoSessionPage() {
  const [state, setState] = useState<SessionState>("watching");
  const [isPlaying, setIsPlaying] = useState<boolean>(false);
  const [selectedOptionId, setSelectedOptionId] = useState<string | null>(null);
  const [showFeedbackAnimation, setShowFeedbackAnimation] = useState<boolean>(false);
  
  const videoRef = useRef<HTMLVideoElement>(null);

  // Play video logic
  const handlePlayVideo = () => {
    if (videoRef.current) {
      videoRef.current.play()
        .then(() => {
          setIsPlaying(true);
        })
        .catch((error) => {
          console.error("Échec de la lecture vidéo :", error);
        });
    }
  };

  // Video end handler
  const handleVideoEnded = () => {
    setIsPlaying(false);
    setState(currentState => getNextState(currentState, "ended", false));
  };

  // Handle option selection
  const handleSelectOption = (optionId: string) => {
    if (state !== "question") return;
    setSelectedOptionId(optionId);
  };

  // Handle validation / action button click
  const handleActionButtonClick = () => {
    if (state === "question" && selectedOptionId) {
      setState(currentState => getNextState(currentState, "validate", true));
      setShowFeedbackAnimation(true);
    } else if (state === "feedback") {
      // Transition back to watching
      setState(currentState => getNextState(currentState, "continue", false));
      setSelectedOptionId(null);
      setIsPlaying(false);
      setShowFeedbackAnimation(false);
      if (videoRef.current) {
        videoRef.current.currentTime = 0;
      }
    }
  };

  // Synchronize playing state with native controls
  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;

    const onPlay = () => setIsPlaying(true);
    const onPause = () => setIsPlaying(false);

    video.addEventListener("play", onPlay);
    video.addEventListener("pause", onPause);

    return () => {
      video.removeEventListener("play", onPlay);
      video.removeEventListener("pause", onPause);
    };
  }, []);

  return (
    <main className="relative flex flex-col w-full max-w-[480px] h-screen mx-auto bg-background text-foreground border-x-4 border-foreground overflow-hidden select-none font-sans shadow-[8px_8px_0px_0px_rgba(0,0,0,0.15)]">
      
      {/* 1. Header mobile - Premium Brutalist */}
      <header className="h-16 min-h-16 flex items-center justify-between px-4 border-b-4 border-foreground bg-background z-10">
        <div className="flex items-center gap-3">
          {/* Back button with thick brutalist styling */}
          <Link 
            href="/"
            className="flex items-center justify-center w-9 h-9 border-2 border-foreground bg-secondary hover:bg-primary/20 active:translate-x-[2px] active:translate-y-[2px] shadow-[2px_2px_0px_0px_oklch(0.141_0.005_285.823)] rounded-none transition-all cursor-pointer"
            aria-label="Retour à l'accueil"
          >
            <svg className="w-5 h-5 text-foreground stroke-current" fill="none" strokeWidth="2.5" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
              <path strokeLinecap="square" strokeLinejoin="miter" d="M19 12H5M12 19l-7-7 7-7" />
            </svg>
          </Link>
          <div className="flex flex-col">
            <span className="font-extrabold tracking-tight text-xs text-primary uppercase">Cas d'Étude #12</span>
            <span className="font-black tracking-tight text-sm uppercase -mt-0.5">Vidéo Session</span>
          </div>
        </div>

        <div className="flex items-center gap-2">
          {/* XP Badge - Brutalist Rectangular Accent */}
          <div className="flex items-center gap-1 px-2.5 py-1 bg-primary border-2 border-foreground text-primary-foreground font-black text-xs rounded-none shadow-[2px_2px_0px_0px_oklch(0.141_0.005_285.823)]">
            <svg className="w-3.5 h-3.5 fill-current" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
              <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" />
            </svg>
            <span>XP 250</span>
          </div>
        </div>
      </header>

      {/* 2. Zone Vidéo [0 à 35vh] - Conteneur noir avec double bordure en bas */}
      <section className="relative h-[35vh] min-h-[35vh] w-full bg-black flex items-center justify-center overflow-hidden border-b-4 border-foreground z-0">
        <video
          ref={videoRef}
          className="w-full h-full object-cover"
          preload="metadata"
          playsInline
          controls={state !== "watching" || isPlaying}
          onEnded={handleVideoEnded}
        >
          {/* Local testing sample video file */}
          <source src="/sample-video.mp4" type="video/mp4" />
          Votre navigateur ne supporte pas la lecture de vidéos.
        </video>

        {/* Video progress indicator (Simulating blue indicator from screenshot) */}
        {state === "watching" && isPlaying && (
          <div className="absolute bottom-0 left-0 w-full h-1 bg-neutral-800">
            <div className="h-full bg-primary animate-[pulse_1.5s_infinite]" style={{ width: "33%" }}></div>
          </div>
        )}

        {/* Overlay - "Veuillez visionner la séquence" */}
        {state === "watching" && !isPlaying && (
          <div className="absolute inset-0 bg-black/85 flex items-center justify-center p-6 z-10 animate-fade-in">
            <button
              onClick={handlePlayVideo}
              className="flex flex-col items-center justify-center bg-card text-foreground border-4 border-foreground p-6 shadow-[6px_6px_0px_0px_oklch(0.141_0.005_285.823)] hover:translate-x-[2px] hover:translate-y-[2px] hover:shadow-[4px_4px_0px_0px_oklch(0.141_0.005_285.823)] active:translate-x-[6px] active:translate-y-[6px] active:shadow-[0px_0px_0px_0px_oklch(0.141_0.005_285.823)] transition-all cursor-pointer w-72 h-40 rounded-none gap-4"
            >
              <div className="w-12 h-12 bg-primary flex items-center justify-center border-2 border-foreground rounded-none shadow-[2px_2px_0px_0px_oklch(0.141_0.005_285.823)]">
                <svg className="w-5 h-5 text-primary-foreground fill-current ml-0.5" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                  <path d="M8 5v14l11-7z" />
                </svg>
              </div>
              <span className="font-black text-sm tracking-tight text-center uppercase text-foreground">
                Veuillez visionner la séquence
              </span>
            </button>
          </div>
        )}

        {/* Overlay banner - "Finir la vidéo pour répondre" when playing */}
        {state === "watching" && isPlaying && (
          <div className="absolute bottom-4 left-4 right-4 bg-black/90 border-2 border-foreground px-3 py-2 text-white font-extrabold text-xs tracking-tight rounded-none flex items-center justify-between animate-fade-in z-10 pointer-events-auto shadow-[3px_3px_0px_0px_oklch(0.141_0.005_285.823)]">
            <div className="flex items-center gap-2">
              <span className="w-2.5 h-2.5 bg-primary animate-ping rounded-none"></span>
              <span className="uppercase text-[10px] tracking-wide">Finir la vidéo pour répondre</span>
            </div>
            <button
              onClick={handleVideoEnded}
              className="px-2 py-0.5 bg-neutral-800 hover:bg-neutral-700 active:bg-neutral-600 text-[9px] font-black uppercase tracking-widest border border-neutral-600 cursor-pointer rounded-none text-white pointer-events-auto"
            >
              Passer
            </button>
          </div>
        )}
      </section>

      {/* 3. Zone Question [35vh à 50vh] & Zone Interaction [50vh à 100vh] scrollables ensemble */}
      <section 
        className={`flex-1 flex flex-col px-5 py-6 overflow-y-auto pb-28 transition-all duration-300 ${
          state === "watching" ? "opacity-30 pointer-events-none" : "opacity-100"
        }`}
      >
        {/* Zone Question [35vh à 50vh] (aérée) */}
        <div className="min-h-[15vh] flex flex-col justify-start mb-6 border-b-2 border-dashed border-foreground/20 pb-4">
          <span className="text-xs font-black text-primary tracking-widest uppercase mb-1">
            Question Principale
          </span>
          <h1 className="text-xl font-black tracking-tight text-foreground leading-snug uppercase">
            Identifiez l'erreur commise dans cette interaction client.
          </h1>
        </div>

        {/* Zone Interaction [50vh à 100vh] */}
        <div className="flex flex-col gap-3">
          {OPTIONS_DATA.map((option) => {
            const { cardClass, letterBg } = getOptionClasses(state, option, selectedOptionId);

            // Refined brutalist styles override
            let hoverShadowStyle = "hover:translate-x-[1px] hover:translate-y-[1px] hover:shadow-[3px_3px_0px_0px_rgba(0,0,0,1)] active:translate-x-[2px] active:translate-y-[2px] active:shadow-[1px_1px_0px_0px_rgba(0,0,0,1)] shadow-[4px_4px_0px_0px_rgba(0,0,0,1)]";
            let borderThickness = "border-2 border-foreground";

            if (state === "watching") {
              hoverShadowStyle = "shadow-none";
              borderThickness = "border border-border/40";
            } else if (state === "feedback") {
              hoverShadowStyle = "shadow-none";
            }

            return (
              <button
                key={option.id}
                onClick={() => handleSelectOption(option.id)}
                disabled={state !== "question"}
                className={`w-full min-h-[58px] py-3.5 px-4 flex items-center text-left font-extrabold tracking-tight transition-all duration-100 cursor-pointer rounded-none ${borderThickness} ${cardClass} ${hoverShadowStyle}`}
              >
                {/* Letter wrapper inside card */}
                <span className={`w-8 h-8 min-w-8 flex items-center justify-center font-black text-sm border-2 border-foreground mr-4 transition-colors rounded-none shadow-[1.5px_1.5px_0px_0px_rgba(0,0,0,1)] ${letterBg}`}>
                  {option.letter}
                </span>
                <span className="flex-1 text-xs sm:text-sm uppercase tracking-tight leading-tight">{option.label}</span>
              </button>
            );
          })}

          {/* Dynamic Practical Advice (Montessori Feedback) - Fades in dynamically */}
          {state === "feedback" && (
            <div className={`mt-4 p-4 bg-muted border-2 border-foreground border-l-4 border-l-primary rounded-none shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] transition-all duration-500 ease-out ${
              showFeedbackAnimation ? "opacity-100 translate-y-0" : "opacity-0 translate-y-2"
            }`}>
              <h2 className="text-xs font-black text-foreground uppercase tracking-wider mb-1.5 flex items-center gap-1.5">
                <span>💡</span> Conseil Pratique
              </h2>
              <p className="text-xs leading-relaxed text-foreground/90 font-medium">
                L'écoute active et l'empathie initiale sont indispensables lors du premier contact. Démarrer directement par un recadrage technique ou une interruption coupe la confiance du client et rigidifie sa posture de défense.
              </p>
            </div>
          )}
        </div>
      </section>

      {/* 4. Action Button fixed tout en bas, occupant toute la largeur disponible moins les marges */}
      <div className="absolute bottom-0 left-0 w-full p-4 bg-gradient-to-t from-background via-background to-transparent border-t-2 border-foreground/20 bg-background/90 z-20">
        <button
          onClick={handleActionButtonClick}
          disabled={
            state === "watching" || 
            (state === "question" && !selectedOptionId)
          }
          className={`w-full h-14 flex items-center justify-center font-black tracking-widest text-xs uppercase rounded-none border-4 border-foreground shadow-[5px_5px_0px_0px_oklch(0.141_0.005_285.823)] hover:translate-x-[1.5px] hover:translate-y-[1.5px] hover:shadow-[3.5px_3.5px_0px_0px_oklch(0.141_0.005_285.823)] active:translate-x-[5px] active:translate-y-[5px] active:shadow-[0px_0px_0px_0px_oklch(0.141_0.005_285.823)] transition-all cursor-pointer ${
            state === "watching"
              ? "bg-secondary text-foreground/30 border-border/50 shadow-none cursor-not-allowed pointer-events-none"
              : state === "question" && !selectedOptionId
              ? "bg-secondary text-foreground/45 border-border/70 shadow-none cursor-not-allowed pointer-events-none"
              : "bg-primary text-primary-foreground hover:bg-primary/95"
          }`}
        >
          {getActionButtonLabel(state, selectedOptionId !== null)}
        </button>
      </div>
    </main>
  );
}
