"use client";
import { motion } from "framer-motion";
import { useState } from "react";
import ProjectModal, { type Project } from "./ProjectModal";

const projects: Project[] = [
  {
    title: "FlavorInsight",
    type: "AI RAG / Shipped",
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
    <section id="projects" className="bg-[#111] py-24 text-[#f7f7f5] md:py-36"><div className="mx-auto max-w-[1440px] px-5 md:px-10">
      <div className="mb-16 flex flex-col gap-5 md:mb-24 md:flex-row md:items-end md:justify-between"><div><p className="mb-4 text-[11px] uppercase tracking-[.18em] text-white/45">Selected work</p><h2 className="font-display text-[clamp(3rem,6.4vw,6.6rem)] leading-[.84] tracking-[-.065em]">Work with<br /><em className="font-normal">a pulse.</em></h2></div><p className="max-w-xs text-sm leading-relaxed text-white/55">Systems that process data, reason through complexity, and ship to production.</p></div>
      <div className="space-y-16 md:space-y-28">{projects.map((project, index) => <motion.div onClick={() => setSelected(project)} key={project.title} initial={{ opacity: 0, y: 36 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, amount: .2 }} transition={{ duration: .8, ease }} className={`group grid cursor-pointer gap-5 border-t border-white/20 pt-5 md:grid-cols-12 md:gap-8 ${index % 2 ? "md:[&>div:first-child]:order-2" : ""}`}>
        <div className="relative h-[330px] overflow-hidden bg-white/10 md:col-span-8 md:h-[570px]"><div className="absolute inset-0 bg-cover bg-center grayscale transition duration-1000 ease-out group-hover:scale-105 group-hover:grayscale-0" style={{ backgroundImage: `url(${project.image})` }} /><div className="absolute inset-0 bg-black/15 transition-colors duration-700 group-hover:bg-black/0" /><span className="absolute bottom-5 left-5 text-[10px] font-medium tracking-[.18em]">OPEN CASE STUDY ↗</span></div>
        <div className="flex flex-col justify-between py-2 md:col-span-4"><div><p className="mb-5 text-[11px] uppercase tracking-[.16em] text-white/45">{project.type}</p><h3 className="max-w-sm font-display text-[clamp(2.25rem,4vw,4.5rem)] leading-[.86] tracking-[-.06em]">{project.title}</h3></div><p className="mt-12 max-w-xs text-[15px] leading-relaxed text-white/55">{project.copy}</p></div>
      </motion.div>)}</div>
    </div></section>
    <ProjectModal project={selected!} isOpen={!!selected} onClose={() => setSelected(null)} />
  </>;
}
