import { describe, it, expect } from "vitest";
import {
  getNextState,
  getActionButtonLabel,
  getOptionClasses,
  Option,
  SessionState,
} from "./session-logic";

describe("Session Logic - Automate d'états", () => {
  
  describe("getNextState()", () => {
    it("devrait passer de 'watching' à 'question' à la fin de la vidéo", () => {
      const state = getNextState("watching", "ended", false);
      expect(state).toBe("question");
    });

    it("ne devrait pas changer d'état si validation sans sélection en état 'question'", () => {
      const state = getNextState("question", "validate", false);
      expect(state).toBe("question");
    });

    it("devrait passer de 'question' à 'feedback' après validation avec une sélection", () => {
      const state = getNextState("question", "validate", true);
      expect(state).toBe("feedback");
    });

    it("devrait revenir à 'watching' après 'continue' depuis l'état 'feedback'", () => {
      const state = getNextState("feedback", "continue", false);
      expect(state).toBe("watching");
    });
  });

  describe("getActionButtonLabel()", () => {
    it("devrait renvoyer 'Regarder le cas vidéo' dans l'état watching", () => {
      expect(getActionButtonLabel("watching", false)).toBe("Regarder le cas vidéo");
    });

    it("devrait renvoyer 'Sélectionner une réponse' dans l'état question sans sélection", () => {
      expect(getActionButtonLabel("question", false)).toBe("Sélectionner une réponse");
    });

    it("devrait renvoyer 'Valider ma réponse' dans l'état question avec sélection", () => {
      expect(getActionButtonLabel("question", true)).toBe("Valider ma réponse");
    });

    it("devrait renvoyer 'Continuer mon parcours' dans l'état feedback", () => {
      expect(getActionButtonLabel("feedback", false)).toBe("Continuer mon parcours");
      expect(getActionButtonLabel("feedback", true)).toBe("Continuer mon parcours");
    });
  });

  describe("getOptionClasses()", () => {
    const mockOptionCorrect: Option = { id: "1", letter: "A", label: "Choix A", isCorrect: true };
    const mockOptionIncorrect: Option = { id: "2", letter: "B", label: "Choix B", isCorrect: false };

    it("devrait appliquer une opacité réduite en état watching", () => {
      const { cardClass } = getOptionClasses("watching", mockOptionCorrect, null);
      expect(cardClass).toContain("opacity-30");
      expect(cardClass).toContain("pointer-events-none");
    });

    it("devrait appliquer une bordure primaire au choix sélectionné en état question", () => {
      const { cardClass, letterBg } = getOptionClasses("question", mockOptionCorrect, "1");
      expect(cardClass).toContain("border-primary");
      expect(letterBg).toContain("bg-primary");
    });

    it("devrait appliquer une bordure neutre aux choix non sélectionnés en état question", () => {
      const { cardClass } = getOptionClasses("question", mockOptionIncorrect, "1");
      expect(cardClass).toContain("border-border");
      expect(cardClass).not.toContain("border-primary");
    });

    it("devrait appliquer un style de succès vert à la bonne réponse en état feedback", () => {
      const { cardClass, letterBg } = getOptionClasses("feedback", mockOptionCorrect, "1");
      expect(cardClass).toContain("border-success-border");
      expect(cardClass).toContain("bg-success-bg");
      expect(letterBg).toContain("bg-success-border");
    });

    it("devrait appliquer un style d'erreur rouge corail au mauvais choix sélectionné en état feedback", () => {
      const { cardClass, letterBg } = getOptionClasses("feedback", mockOptionIncorrect, "2");
      expect(cardClass).toContain("border-destructive");
      expect(cardClass).toContain("bg-destructive/10");
      expect(letterBg).toContain("bg-destructive");
    });

    it("devrait griser les choix non sélectionnés incorrects en état feedback", () => {
      const { cardClass } = getOptionClasses("feedback", mockOptionIncorrect, "1");
      expect(cardClass).toContain("opacity-60");
      expect(cardClass).toContain("text-foreground/50");
    });
  });

});
