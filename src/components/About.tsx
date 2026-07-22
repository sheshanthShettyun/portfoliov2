"use client";

import { motion } from "framer-motion";
import GitHubHeatmap from "./GitHubHeatmap";
import { useState } from "react";

const ease = [0.22, 1, 0.36, 1] as const;

export default function About() {
  const [flipped, setFlipped] = useState(false);

  return (
    <section id="about" className="bg-[#111] py-28 text-white md:py-40">
      <div className="mx-auto max-w-[1440px] px-5 md:px-10">
        <motion.div
          initial={{ opacity: 0, y: 32 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.25 }}
          transition={{ duration: 0.8, ease }}
          className="grid gap-10 md:gap-16 lg:grid-cols-[0.45fr_0.55fr] items-center"
          style={{ fontFamily: "system-ui, -apple-system, sans-serif" }}
        >
          <div className="flex flex-col" style={{ perspective: "1200px" }}>
            <p className="mb-6 text-[11px] uppercase tracking-[0.18em] text-white/30">
              About
            </p>
            <motion.div
              animate={{ rotateY: flipped ? 180 : 0 }}
              transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
              style={{ transformStyle: "preserve-3d", position: "relative" }}
            >
              <div
                className="flex h-full flex-col rounded-[24px] bg-[#101010] p-10 md:p-12"
                style={{ backfaceVisibility: "hidden" }}
              >
                <h2 className="font-display text-[clamp(2.4rem,4.5vw,5rem)] leading-[0.92] tracking-[-0.05em]">
                  I&apos;m Sriyaan<span className="text-white/20">.</span>
                </h2>

                <p className="mt-7 text-[15px] leading-[1.7] text-white/55 md:text-[16px]">
                  A web designer and developer with a passion for crafting
                  digital experiences that feel intuitive, beautiful, and
                  human. With a background in design and front-end
                  development, I bring a thoughtful balance of creativity
                  and strategy to every project.
                </p>

                <div className="flex-1" />

                <a
                  href="#contact"
                  className="mt-6 flex w-full items-center justify-center rounded-[14px] bg-white px-8 py-3.5 text-[14px] font-medium text-[#101010] transition duration-300 hover:bg-white/90"
                  style={{ boxShadow: "0 2px 8px rgba(0,0,0,0.06), 0 10px 24px rgba(0,0,0,0.04)" }}
                >
                  About me
                </a>

                <button
                  onClick={() => setFlipped(true)}
                  className="mt-4 flex w-full items-center justify-center gap-2 rounded-[14px] border border-white/[0.06] px-8 py-3 text-[13px] font-medium text-white/40 transition-colors hover:bg-white/[0.04] hover:text-white/60"
                >
                  <svg viewBox="0 0 24 24" className="h-4 w-4 fill-current"><path d="M12 0C5.37 0 0 5.37 0 12c0 5.31 3.435 9.795 8.205 11.385.6.105.825-.255.825-.57 0-.285-.015-1.23-.015-2.235-3.015.555-3.795-.735-4.035-1.41-.135-.345-.72-1.41-1.23-1.695-.42-.225-1.02-.78-.015-.795.945-.015 1.62.87 1.845 1.23 1.08 1.815 2.805 1.305 3.495.99.105-.78.42-1.305.765-1.605-2.67-.3-5.46-1.335-5.46-5.925 0-1.305.465-2.385 1.23-3.225-.12-.3-.54-1.53.12-3.18 0 0 1.005-.315 3.3 1.23.96-.27 1.98-.405 3-.405s2.04.135 3 .405c2.295-1.56 3.3-1.23 3.3-1.23.66 1.65.24 2.88.12 3.18.765.84 1.23 1.905 1.23 3.225 0 4.605-2.805 5.625-5.475 5.925.435.375.81 1.095.81 2.22 0 1.605-.015 2.895-.015 3.3 0 .315.225.69.825.57A12.02 12.02 0 0024 12c0-6.63-5.37-12-12-12z"/></svg>
                  GitHub activity →
                </button>
              </div>

              <div
                className="absolute inset-0 flex h-full flex-col rounded-[24px] bg-[#101010] p-10 md:p-12"
                style={{ backfaceVisibility: "hidden", transform: "rotateY(180deg)" }}
              >
                <div className="mb-6 flex items-center justify-between">
                  <span className="text-[11px] uppercase tracking-[0.18em] text-white/30">GitHub Activity</span>
                  <button
                    onClick={() => setFlipped(false)}
                    className="text-[11px] font-medium text-white/40 transition-colors hover:text-white/70"
                  >
                    ← Back
                  </button>
                </div>
                <GitHubHeatmap username="sheshanthShettyun" compact />
              </div>
            </motion.div>
          </div>

          <div className="flex flex-col gap-12">
            <div className="space-y-5">
              <p className="text-[16px] leading-[1.7] text-white/55 md:text-[18px]">
                I bridge the gap between complex machine learning models and
                robust production environments. With a background in MLOps and
                DevOps, I build autonomous systems that navigate tasks with
                intent and reliability.
              </p>
              <p className="text-[15px] leading-[1.65] text-white/35">
                Currently exploring the frontier of agentic development —
                RAG pipelines, LLM-powered applications, and automated
                workflows that reason through complexity.
              </p>
            </div>

            <div className="grid grid-cols-2 gap-4">
              {[
                ["2+", "Years building"],
                ["6+", "Projects built"],
              ].map(([value, label]) => (
                <div
                  key={label}
                  className="rounded-[20px] bg-white/[0.04] px-6 py-6 md:px-8 md:py-7"
                >
                  <p className="font-display text-[clamp(2rem,3vw,3.2rem)] leading-none tracking-[-0.04em]">
                    {value}
                  </p>
                  <p className="mt-2 text-[12px] uppercase tracking-[0.14em] text-white/30">
                    {label}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
