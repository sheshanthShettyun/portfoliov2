"use client";

import { motion } from "framer-motion";
import { ArrowRight, Download } from "lucide-react";

const ease = [0.22, 1, 0.36, 1] as const;
const btnEase = [0.22, 0.61, 0.36, 1] as const;

export default function Hero() {
  return (
    <section id="home" className="bg-[#f7f7f5] pb-8 pt-[142px] text-[#101010] md:pb-12 md:pt-[178px]">
      <div className="mx-auto max-w-[1440px] px-5 md:px-10">
        <motion.div initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8, ease }} className="mb-10 flex items-center gap-3 text-[12px] font-bold uppercase tracking-[0.2em] text-black/40">
          <span className="relative flex h-3 w-3">
            <span className="absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75 animate-ping" />
            <span className="relative inline-flex h-3 w-3 rounded-full bg-green-500" />
          </span>
          Available for projects
        </motion.div>
        <motion.h1 initial={{ opacity: 0, y: 35 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.95, delay: 0.08, ease }} className="max-w-[1200px] font-display text-[clamp(3.5rem,9vw,9.5rem)] font-medium leading-[0.92] tracking-[-0.05em]">
          Digital products,<br />built to <em className="italic font-light opacity-50">reason.</em>
        </motion.h1>
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8, delay: 0.26, ease }} className="mt-10 flex flex-col justify-between gap-8 border-t border-black/15 pt-5 md:flex-row md:items-end">
          <p className="max-w-xl font-display text-[18px] font-medium leading-[1.65] text-black/70 md:text-[22px]">I&apos;m Sriyaan, bridging machine learning and production infrastructure. Building autonomous systems, RAG pipelines, and agentic workflows that reason through complexity.</p>
          <div className="flex gap-4">
            <a
              href="#projects"
              className="group relative inline-flex h-[52px] items-center gap-3.5 rounded-full bg-[#111111] px-8 text-[15px] font-medium tracking-[-0.02em] text-white transition-all duration-[250ms] ease-[0.22,0.61,0.36,1] hover:translate-y-[-2px] hover:scale-[1.02] active:scale-[0.98]"
              style={{
                background: "linear-gradient(180deg, #1E1E1E 0%, #111111 100%)",
                boxShadow: "0 14px 34px rgba(0,0,0,0.18), 0 6px 16px rgba(0,0,0,0.08), inset 0 1px 0 rgba(255,255,255,0.08)",
              }}
            >
              Explore work
              <ArrowRight className="h-[18px] w-[18px] transition-transform duration-[250ms] ease-[0.22,0.61,0.36,1] group-hover:translate-x-1" strokeWidth={1.8} />
              <span className="absolute inset-0 rounded-full shadow-[0_20px_40px_rgba(0,0,0,0.22),0_8px_20px_rgba(0,0,0,0.12),inset_0_1px_0_rgba(255,255,255,0.08)] opacity-0 transition-opacity duration-[250ms] group-hover:opacity-100" />
            </a>
            <a
              href="/resume.pdf"
              download="SheshantShettyResume.pdf"
              className="group relative inline-flex h-[52px] items-center gap-3.5 rounded-full border border-black/[0.08] bg-white/75 px-7 text-[15px] font-medium tracking-[-0.02em] text-black/80 transition-all duration-[250ms] ease-[0.22,0.61,0.36,1] hover:translate-y-[-2px] hover:bg-white hover:border-black/15 active:scale-[0.98]"
              style={{
                backdropFilter: "blur(12px)",
                WebkitBackdropFilter: "blur(12px)",
              }}
            >
              Resume
              <Download className="h-[16px] w-[16px] transition-transform duration-[250ms] ease-[0.22,0.61,0.36,1] group-hover:translate-y-0.5" strokeWidth={1.8} />
              <span className="absolute inset-0 rounded-full shadow-[0_10px_24px_rgba(0,0,0,0.06),0_4px_10px_rgba(0,0,0,0.04)] opacity-0 transition-opacity duration-[250ms] group-hover:opacity-100" />
            </a>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
