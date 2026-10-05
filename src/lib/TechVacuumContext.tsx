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
  { name: "SQL", logoUrl: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/azuresqldatabase/azuresqldatabase-original.svg", bg: "#336791", fg: "#ffffff" },
  { name: "Rust", logoUrl: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/rust/rust-original.svg", bg: "#000000", fg: "#ffffff" },
  { name: "Java", logoUrl: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/java/java-original.svg", bg: "#ED8B00", fg: "#ffffff" },
  { name: "LangChain", logoUrl: undefined, bg: "#1C3C3C", fg: "#00D96B" },
  { name: "ChromaDB", logoUrl: undefined, bg: "#7B61FF", fg: "#ffffff" },
  { name: "LangGraph", logoUrl: undefined, bg: "#1C3C3C", fg: "#00D96B" },
  { name: "RAG", logoUrl: undefined, bg: "#7C3AED", fg: "#ffffff" },
  { name: "AI Agents", logoUrl: undefined, bg: "#9333EA", fg: "#ffffff" },
  { name: "LLM Applications", logoUrl: undefined, bg: "#DB2777", fg: "#ffffff" },
  { name: "Prompt Engineering", logoUrl: undefined, bg: "#059669", fg: "#ffffff" },
  { name: "FastAPI", logoUrl: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/fastapi/fastapi-original.svg", bg: "#009688", fg: "#ffffff" },
  { name: "PostgreSQL", logoUrl: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/postgresql/postgresql-original.svg", bg: "#4169E1", fg: "#ffffff" },
  { name: "REST APIs", logoUrl: undefined, bg: "#0EA5E9", fg: "#ffffff" },
  { name: "Data Pipelines", logoUrl: undefined, bg: "#6366F1", fg: "#ffffff" },
  { name: "Docker", logoUrl: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/docker/docker-original.svg", bg: "#2496ED", fg: "#ffffff" },
  { name: "Kubernetes", logoUrl: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/kubernetes/kubernetes-original.svg", bg: "#326CE5", fg: "#ffffff" },
  { name: "Linux", logoUrl: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/linux/linux-original.svg", bg: "#222222", fg: "#FCC624" },
  { name: "Git", logoUrl: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/git/git-original.svg", bg: "#F05032", fg: "#ffffff" },
  { name: "GitHub", logoUrl: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/github/github-original.svg", bg: "#181717", fg: "#ffffff" },
  { name: "CI/CD", logoUrl: undefined, bg: "#555555", fg: "#ffffff" },
  { name: "OpenCode", logoUrl: undefined, bg: "#111111", fg: "#ffffff" },
  { name: "Claude Code", logoUrl: undefined, bg: "#D97757", fg: "#ffffff" },
  { name: "Codex", logoUrl: undefined, bg: "#10A37F", fg: "#ffffff" },
];

export const cardTechMap: Record<string, string[]> = {
  "Programming Languages": ["Python", "SQL", "Rust", "Java"],
  "AI Engineering": ["LangChain", "ChromaDB", "LangGraph", "RAG", "AI Agents", "LLM Applications", "Prompt Engineering"],
  "Backend & Data": ["FastAPI", "PostgreSQL", "REST APIs", "Data Pipelines"],
  "DevOps & Tools": ["Docker", "Kubernetes", "Linux", "Git", "GitHub", "CI/CD", "OpenCode", "Claude Code", "Codex"],
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
