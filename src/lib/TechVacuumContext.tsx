"use client";

import { createContext, useContext, useState, useCallback, type ReactNode } from "react";

export type TechItem = {
  name: string;
  logoUrl?: string;
  bg: string;
  fg: string;
};

const allTechs: TechItem[] = [
  { name: "Python", logoUrl: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/python/python-original.svg", bg: "#3776AB", fg: "#FFD43B" },
  { name: "JavaScript", logoUrl: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/javascript/javascript-original.svg", bg: "#F7DF1E", fg: "#000000" },
  { name: "TypeScript", logoUrl: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/typescript/typescript-original.svg", bg: "#3178C6", fg: "#ffffff" },
  { name: "Next.js", logoUrl: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/nextjs/nextjs-original.svg", bg: "#000000", fg: "#ffffff" },
  { name: "FastAPI", logoUrl: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/fastapi/fastapi-original.svg", bg: "#009688", fg: "#ffffff" },
  { name: "SQL", logoUrl: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/azuresqldatabase/azuresqldatabase-original.svg", bg: "#336791", fg: "#ffffff" },
  { name: "Docker", logoUrl: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/docker/docker-original.svg", bg: "#2496ED", fg: "#ffffff" },
  { name: "PostgreSQL", logoUrl: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/postgresql/postgresql-original.svg", bg: "#4169E1", fg: "#ffffff" },
  { name: "LangChain", logoUrl: undefined, bg: "#1C3C3C", fg: "#00D96B" },
  { name: "ChromaDB", logoUrl: undefined, bg: "#7B61FF", fg: "#ffffff" },
  { name: "Kubernetes", logoUrl: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/kubernetes/kubernetes-original.svg", bg: "#326CE5", fg: "#ffffff" },
  { name: "Linux", logoUrl: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/linux/linux-original.svg", bg: "#222222", fg: "#FCC624" },
  { name: "Git", logoUrl: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/git/git-original.svg", bg: "#F05032", fg: "#ffffff" },
  { name: "MLflow", logoUrl: undefined, bg: "#0194E2", fg: "#ffffff" },
  { name: "LangGraph", logoUrl: undefined, bg: "#1C3C3C", fg: "#00D96B" },
  { name: "CI/CD", logoUrl: undefined, bg: "#555555", fg: "#ffffff" },
];

export const cardTechMap: Record<string, string[]> = {
  "Web Dev": ["Python", "JavaScript", "TypeScript", "Next.js", "FastAPI"],
  "AI & Data": ["SQL", "LangChain", "ChromaDB", "PostgreSQL", "MLflow", "LangGraph"],
  "DevOps": ["Docker", "Git", "Linux", "Kubernetes", "CI/CD"],
};

type VacuumContextType = {
  activeCard: string | null;
  vacuumedSet: Set<string>;
  openCard: (cardName: string) => void;
  closeCard: () => void;
  isVacuumed: (techName: string) => boolean;
  allTechs: typeof allTechs;
};

const VacuumContext = createContext<VacuumContextType | null>(null);

export function TechVacuumProvider({ children }: { children: ReactNode }) {
  const [activeCard, setActiveCard] = useState<string | null>(null);
  const [vacuumedSet, setVacuumedSet] = useState<Set<string>>(new Set());

  const openCard = useCallback((cardName: string) => {
    setActiveCard(cardName);
    setVacuumedSet(new Set(cardTechMap[cardName] || []));
  }, []);

  const closeCard = useCallback(() => {
    setActiveCard(null);
    setVacuumedSet(new Set());
  }, []);

  const isVacuumed = useCallback(
    (techName: string) => vacuumedSet.has(techName),
    [vacuumedSet]
  );

  return (
    <VacuumContext.Provider
      value={{ activeCard, vacuumedSet, openCard, closeCard, isVacuumed, allTechs }}
    >
      {children}
    </VacuumContext.Provider>
  );
}

export function useTechVacuum() {
  const ctx = useContext(VacuumContext);
  if (!ctx) throw new Error("useTechVacuum must be used within TechVacuumProvider");
  return ctx;
}
