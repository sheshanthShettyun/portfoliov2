"use client";
import { motion, AnimatePresence } from "framer-motion";
import { useTechVacuum, cardTechMap } from "@/lib/TechVacuumContext";

const services = [
  ["01", "Languages & Web", "Building end-to-end applications with modern runtimes and frameworks — Python, JavaScript, SQL, Next.js, FastAPI, and REST APIs."],
  ["02", "AI & Data", "Engineering RAG pipelines, vector search, and LLM-powered applications with LangChain, ChromaDB, PostgreSQL, and NoSQL."],
  ["03", "DevOps & Tools", "Orchestrating deployments, automating pipelines, and shipping reliably with Docker, Git, Linux, CI/CD, and agentic coding tools."],
];

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

export default function Services() {
  const { activeCard, openCard, closeCard } = useTechVacuum();

  return (
    <section className="bg-[#f7f7f5] py-24 md:py-36">
      <div className="mx-auto max-w-[1440px] px-5 md:px-10">
        <div className="grid gap-10 md:grid-cols-12">
          <div className="md:col-span-4">
            <p className="mb-4 text-[11px] uppercase tracking-[.18em] text-black/45">Capabilities</p>
            <h2 className="max-w-sm font-display text-[clamp(2.8rem,5vw,5rem)] leading-[.86] tracking-[-.06em]">Make the complex feel simple.</h2>
          </div>
          <div className="md:col-span-7 md:col-start-6">
            {services.map(([number, title, copy], index) => {
              const isOpen = activeCard === title;
              const techs = cardTechMap[title] || [];
              return (
                <motion.div
                  key={number}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.65, delay: index * 0.09 }}
                  layout
                  onClick={() => (isOpen ? closeCard() : openCard(title))}
                  className="group cursor-pointer border-t border-black/15 py-7 md:py-9"
                >
                  <motion.div layout className="grid grid-cols-[48px_1fr_auto] gap-3 md:grid-cols-[70px_1fr_auto]">
                    <span className="pt-1 text-[11px] tracking-[.12em] text-black/40">{number}</span>
                    <div>
                      <h3 className="font-display text-[clamp(1.9rem,3vw,3.1rem)] leading-none tracking-[-.05em]">{title}</h3>
                      <p className="mt-4 max-w-md text-sm leading-relaxed text-black/55">{copy}</p>
                      <AnimatePresence>
                        {isOpen && (
                          <motion.div
                            initial={{ height: 0, opacity: 0 }}
                            animate={{ height: "auto", opacity: 1 }}
                            exit={{ height: 0, opacity: 0 }}
                            transition={{ duration: 0.35, ease: [0.32, 0.72, 0, 1] }}
                            className="overflow-hidden"
                          >
                            <div className="mt-5 flex flex-wrap gap-2">
                              <AnimatePresence>
                                {techs.map((techName) => {
                                  const t = stack.find((s) => s.name === techName);
                                  if (!t) return null;
                                  return (
                                    <motion.span
                                      key={techName}
                                      layoutId={techName}
                                    >
                                      <span className="inline-flex items-center gap-2 whitespace-nowrap rounded-full border border-black/[0.05] bg-white px-3 py-1.5 text-[11px] font-medium text-[#101010] shadow-[0_2px_8px_rgba(0,0,0,0.04)]">
                                        <span
                                          className="flex h-4 w-4 items-center justify-center rounded-[4px] text-[7px] font-bold"
                                          style={{ backgroundColor: t.bg, color: t.fg }}
                                        >
                                          {t.abbr}
                                        </span>
                                        {t.name}
                                      </span>
                                    </motion.span>
                                  );
                                })}
                              </AnimatePresence>
                            </div>
                          </motion.div>
                        )}
                      </AnimatePresence>
                    </div>
                    <motion.span animate={{ rotate: isOpen ? 45 : 0 }} className="text-2xl">↗</motion.span>
                  </motion.div>
                </motion.div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}
