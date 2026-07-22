"use client";

import { motion } from "framer-motion";

const ease = [0.22, 1, 0.36, 1] as const;

export default function Hero() {
  return (
    <section id="home" className="bg-[#f7f7f5] pb-8 pt-[142px] text-[#101010] md:pb-12 md:pt-[178px]">
      <div className="mx-auto max-w-[1440px] px-5 md:px-10">
        <motion.div initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8, ease }} className="mb-7 flex items-center gap-3 text-[11px] font-medium uppercase tracking-[0.16em]">
          <span className="h-2.5 w-2.5 rounded-full bg-[#22c55e] shadow-[0_0_8px_rgba(34,197,94,0.5)]" /> Available
        </motion.div>
        <motion.h1 initial={{ opacity: 0, y: 35 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.95, delay: 0.08, ease }} className="max-w-[1160px] font-display text-[clamp(3.35rem,8.6vw,8.5rem)] font-normal leading-[0.96]">
          Digital products,<br />built to <em className="font-normal">reason.</em>
        </motion.h1>
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8, delay: 0.26, ease }} className="mt-10 flex flex-col justify-between gap-8 border-t border-black/15 pt-5 md:flex-row md:items-end">
          <p className="max-w-md text-[15px] leading-[1.5] text-black/60 md:text-[17px]">I&apos;m Sriyaan, bridging machine learning and production infrastructure. Building autonomous systems, RAG pipelines, and agentic workflows that reason through complexity.</p>
          <div className="flex gap-3"><a href="#projects" className="premium-button rounded-full bg-[#101010] px-6 py-3 text-sm text-white">Explore work ↘</a><a href="#contact" className="rounded-full border border-black/20 px-6 py-3 text-sm transition-colors hover:bg-[#101010] hover:text-white">Let&apos;s talk</a></div>
        </motion.div>
      </div>
    </section>
  );
}
