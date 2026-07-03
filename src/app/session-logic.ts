export type SessionState = "watching" | "question" | "feedback";

export interface Option {
  id: string;
  letter: string;
  label: string;
  isCorrect: boolean;
}

/**
 * Handles state transitions for the session state machine.
 */
export function getNextState(
  currentState: SessionState,
  event: "ended" | "validate" | "continue",
  hasSelection: boolean
): SessionState {
  if (currentState === "watching" && event === "ended") {
    return "question";
  }
  if (currentState === "question" && event === "validate" && hasSelection) {
    return "feedback";
  }
  if (currentState === "feedback" && event === "continue") {
    return "watching";
  }
  return currentState;
}

/**
 * Returns the appropriate text label for the primary action button.
 */
export function getActionButtonLabel(state: SessionState, hasSelection: boolean): string {
  if (state === "watching") return "Regarder le cas vidéo";
  if (state === "question" && !hasSelection) return "Sélectionner une réponse";
  if (state === "question" && hasSelection) return "Valider ma réponse";
  return "Continuer mon parcours";
}

/**
 * Computes the Tailwind style classes dynamically for options based on state.
 */
export function getOptionClasses(
  state: SessionState,
  option: Option,
  selectedOptionId: string | null
): { cardClass: string; letterBg: string } {
  const isSelected = selectedOptionId === option.id;

  if (state === "watching") {
    return {
      cardClass: "border border-border bg-card text-foreground opacity-30 pointer-events-none",
      letterBg: "bg-secondary text-secondary-foreground border-border",
    };
  }

  if (state === "question") {
    if (isSelected) {
      return {
        cardClass: "border-2 border-primary bg-primary/5 text-foreground",
        letterBg: "bg-primary text-primary-foreground border-primary",
      };
    }
    return {
      cardClass: "border border-border bg-card text-foreground hover:bg-secondary/40",
      letterBg: "bg-secondary text-secondary-foreground border-border",
    };
  }

  // state === "feedback"
  if (option.isCorrect) {
    return {
      cardClass: "border-2 border-success-border bg-success-bg text-success-text pointer-events-none",
      letterBg: "bg-success-border text-success-text border-success-border font-extrabold",
    };
  }
  
  if (isSelected && !option.isCorrect) {
    return {
      cardClass: "border-2 border-destructive bg-destructive/10 text-destructive pointer-events-none",
      letterBg: "bg-destructive text-primary-foreground border-destructive",
    };
  }

  return {
    cardClass: "border border-border bg-card text-foreground/50 opacity-60 pointer-events-none",
    letterBg: "bg-secondary/40 text-secondary-foreground/40 border-border/40",
  };
}
