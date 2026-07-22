"use client";

import { motion, AnimatePresence } from "framer-motion";
import { useTechVacuum } from "@/lib/TechVacuumContext";

const stack = [
  { name: "Python", logo: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/python/python-original.svg" },
  { name: "JavaScript", logo: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/javascript/javascript-original.svg" },
  { name: "TypeScript", logo: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/typescript/typescript-original.svg" },
  { name: "Next.js", logo: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/nextjs/nextjs-original.svg" },
  { name: "FastAPI", logo: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/fastapi/fastapi-original.svg" },
  { name: "Docker", logo: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/docker/docker-original.svg" },
  { name: "PostgreSQL", logo: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/postgresql/postgresql-original.svg" },
  { name: "Kubernetes", logo: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/kubernetes/kubernetes-original.svg" },
  { name: "Linux", logo: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/linux/linux-original.svg" },
  { name: "Git", logo: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/git/git-original.svg" },
  { name: "SQL", abbr: "SQ", bg: "#336791", fg: "#fff" },
  { name: "LangChain", abbr: "LC", bg: "#1C3C3C", fg: "#00D96B" },
  { name: "ChromaDB", abbr: "Ch", bg: "#7B61FF", fg: "#fff" },
  { name: "MLflow", abbr: "ML", bg: "#0194E2", fg: "#fff" },
  { name: "LangGraph", abbr: "LG", bg: "#1C3C3C", fg: "#00D96B" },
  { name: "CI/CD", abbr: "CD", bg: "#555555", fg: "#fff" },
];

function TechPill({ tech, layoutId }: { tech: (typeof stack)[0]; layoutId?: string }) {
  const el = (
    <span className="inline-flex items-center gap-2.5 whitespace-nowrap rounded-full border border-black/[0.05] bg-white px-4 py-2.5 text-[13px] font-medium text-[#101010] shadow-[0_2px_8px_rgba(0,0,0,0.04)]">
      {tech.logo ? (
        <img src={tech.logo} alt={tech.name} className="h-4 w-4" loading="lazy" />
      ) : (
        <span className="flex h-5 w-5 items-center justify-center rounded-[5px] text-[9px] font-bold"
          style={{ backgroundColor: tech.bg, color: tech.fg }}>
          {tech.abbr}
        </span>
      )}
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
