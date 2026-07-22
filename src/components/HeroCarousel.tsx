"use client";

import { motion, AnimatePresence } from "framer-motion";
import { useTechVacuum } from "@/lib/TechVacuumContext";

const stack = [
  { name: "Python", abbr: "Py", bg: "#3776AB", fg: "#FFD43B" },
  { name: "JavaScript", abbr: "JS", bg: "#F7DF1E", fg: "#000000" },
  { name: "TypeScript", abbr: "TS", bg: "#3178C6", fg: "#ffffff" },
  { name: "Next.js", abbr: "Nx", bg: "#000000", fg: "#ffffff" },
  { name: "FastAPI", abbr: "FA", bg: "#009688", fg: "#ffffff" },
  { name: "Docker", abbr: "Dk", bg: "#2496ED", fg: "#ffffff" },
  { name: "PostgreSQL", abbr: "PG", bg: "#4169E1", fg: "#ffffff" },
  { name: "LangChain", abbr: "LC", bg: "#1C3C3C", fg: "#00D96B" },
  { name: "Kubernetes", abbr: "K8", bg: "#326CE5", fg: "#ffffff" },
  { name: "Linux", abbr: "Lx", bg: "#222222", fg: "#FCC624" },
  { name: "Git", abbr: "Gi", bg: "#F05032", fg: "#ffffff" },
  { name: "MLflow", abbr: "ML", bg: "#0194E2", fg: "#ffffff" },
  { name: "LangGraph", abbr: "LG", bg: "#1C3C3C", fg: "#00D96B" },
  { name: "ChromaDB", abbr: "Ch", bg: "#7B61FF", fg: "#ffffff" },
  { name: "SQL", abbr: "SQ", bg: "#336791", fg: "#ffffff" },
  { name: "CI/CD", abbr: "CD", bg: "#555555", fg: "#ffffff" },
];

function TechPill({ tech, layoutId }: { tech: (typeof stack)[0]; layoutId?: string }) {
  const el = (
    <span className="inline-flex items-center gap-2.5 whitespace-nowrap rounded-full border border-black/[0.05] bg-white px-4 py-2.5 text-[13px] font-medium text-[#101010] shadow-[0_2px_8px_rgba(0,0,0,0.04)]">
      <span
        className="flex h-5 w-5 items-center justify-center rounded-[5px] text-[9px] font-bold"
        style={{ backgroundColor: tech.bg, color: tech.fg }}
      >
        {tech.abbr}
      </span>
      {tech.name}
    </span>
  );

  if (layoutId) {
    return <motion.span layoutId={layoutId} style={{ display: "inline-flex" }}>{el}</motion.span>;
  }
  return el;
}

export default function HeroCarousel() {
  const { activeCard, isVacuumed } = useTechVacuum();
  const paused = activeCard !== null;

  return (
    <section className="overflow-hidden bg-[#f7f7f5] py-16 md:py-20">
      <div className="mb-8 text-center">
        <p className="text-[11px] uppercase tracking-[0.18em] text-black/30">Stack</p>
      </div>
      <motion.div initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} viewport={{ once: true }}>
        <motion.div
          initial={{ x: 0 }}
          animate={paused ? { x: 0 } : { x: [0, -1000, 0] }}
          transition={paused ? { duration: 0.3 } : { duration: 30, ease: "linear", x: { duration: 30, repeat: Infinity, repeatType: "mirror", ease: "linear" } }}
          className="flex w-max gap-3 px-5 md:px-10"
          style={{ willChange: "transform" }}
        >
          <AnimatePresence>
            {stack.map((tech) =>
              isVacuumed(tech.name) ? null : (
                <TechPill key={tech.name} tech={tech} layoutId={tech.name} />
              )
            )}
          </AnimatePresence>

          {stack.map((tech) =>
            isVacuumed(tech.name) ? null : (
              <TechPill key={`dup-${tech.name}`} tech={tech} />
            )
          )}
        </motion.div>
      </motion.div>
    </section>
  );
}
