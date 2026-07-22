"use client";
import { motion } from "framer-motion";
import { useState } from "react";
import ProjectModal, { type Project } from "./ProjectModal";

const projects: Project[] = [
  {
    title: "FlavorInsight",
    type: "AI RAG / Shipped",
    subtitle: "Local AI review analyzer",
    image: "/images/flavorinsight.png",
    copy: "Fully offline RAG system ingesting 4,318 Yelp reviews with mxbai-embed-large into ChromaDB, answering queries via local Gemma-4 LLM — zero API calls, VADER sentiment scoring.",
    longDescription: "A fully offline RAG system that ingests 4,318 real Yelp restaurant reviews, embeds them with mxbai-embed-large into a Chroma vector store, and answers natural language questions using a local gemma-4-uncensored LLM served by Ollama. All inference runs locally — zero API calls. Sentiment analysis (VADER) was used to score every review for richer query context.",
    tags: ["LangChain", "ChromaDB", "Ollama", "VADER", "Gemma-4"],
    github: "https://github.com/sheshanthShettyun/localAI",
    video: undefined,
  },
  {
    title: "INTutGPT",
    type: "AI RAG / In Progress",
    subtitle: "RAG textbook platform",
    image: "https://images.unsplash.com/photo-1517694712202-14dd9538aa97?auto=format&fit=crop&w=1500&q=85",
    copy: "RAG platform for students to query textbooks via natural language — PDF ingestion, semantic chunking, BGE-M3 embeddings, and citation-grounded responses.",
    longDescription: "INTutGPT is a Retrieval-Augmented Generation (RAG) platform that lets students query textbooks and study materials in natural language. The automated document ingestion pipeline parses PDFs (PyMuPDF), performs semantic chunking, generates vector embeddings via BGE-M3/Jina/Sentence Transformers, and indexes content in ChromaDB. Semantic retrieval delivers context-aware, citation-based responses grounded in textbook content.",
    tags: ["FastAPI", "ChromaDB", "LangChain", "PyMuPDF", "Sentence Transformers"],
    github: "#",
    video: undefined,
  },
];

const ease = [0.22, 1, 0.36, 1] as const;

export default function Projects() {
  const [selected, setSelected] = useState<Project | null>(null);

  return <>
    <section id="projects" className="bg-[#111] py-24 text-[#f7f7f5] md:py-28">
      <div className="mx-auto max-w-[1440px] px-5 md:px-10">
        <div className="mb-12 flex flex-col gap-5 md:mb-16 md:flex-row md:items-end md:justify-between">
          <h2 className="font-display text-[clamp(2.8rem,5.5vw,5.5rem)] leading-[0.88] tracking-[-.06em]">Projects</h2>
          <p className="max-w-xs text-sm leading-relaxed text-white/45">Systems that process data, reason through complexity, and ship to production.</p>
        </div>

        <div className="grid gap-4 md:grid-cols-2 md:gap-5">
          {projects.map((project, index) => (
            <motion.div
              key={project.title}
              initial={{ opacity: 0, y: 28 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.15 }}
              transition={{ duration: 0.6, delay: index * 0.08, ease }}
              onClick={() => setSelected(project)}
              className="group cursor-pointer overflow-hidden rounded-[20px] border border-white/[0.06]"
            >
              <div className="relative aspect-[16/9] overflow-hidden bg-white/[0.04]">
                <div
                  className="h-full w-full bg-cover bg-center grayscale transition-all duration-[500ms] ease-out group-hover:scale-105 group-hover:grayscale-0"
                  style={{ backgroundImage: `url(${project.image})` }}
                />
                <div className="absolute inset-0 bg-black/20 transition-colors duration-[400ms] group-hover:bg-black/0" />
                <span className="absolute bottom-3 left-3 rounded-full bg-black/40 px-3 py-1 text-[10px] font-medium uppercase tracking-[.14em] text-white backdrop-blur-sm">
                  {project.type}
                </span>
              </div>

              <div className="p-5 md:p-6">
                <h3 className="font-display text-[clamp(1.5rem,2.2vw,2rem)] leading-[0.95] tracking-[-.04em]">
                  {project.title}
                </h3>
                <p className="mt-3 text-[13px] leading-relaxed text-white/40">
                  {project.subtitle || project.copy}
                </p>
                <span className="mt-4 inline-block text-[11px] font-medium tracking-[.12em] text-white/35 transition-colors group-hover:text-white/70">
                  View details →
                </span>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
    <ProjectModal project={selected!} isOpen={!!selected} onClose={() => setSelected(null)} />
  </>;
}
