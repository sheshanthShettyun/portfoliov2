"use client";

import { motion } from "framer-motion";

const ease = [0.22, 1, 0.36, 1] as const;

export default function About() {
  return (
    <section id="about" className="bg-[#111] py-28 text-white md:py-40">
      <div className="mx-auto max-w-[1440px] px-5 md:px-10">
        <motion.div
          initial={{ opacity: 0, y: 32 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.25 }}
          transition={{ duration: 0.8, ease }}
          className="grid gap-10 md:gap-16 lg:grid-cols-[0.45fr_0.55fr]"
          style={{ fontFamily: "system-ui, -apple-system, sans-serif" }}
        >
          <div>
            <p className="mb-6 text-[11px] uppercase tracking-[0.18em] text-white/30">
              About
            </p>
            <h2 className="font-display text-[clamp(2.6rem,5vw,5.6rem)] leading-[0.9] tracking-[-0.055em]">
              I&apos;m Sriyaan<span className="text-white/20">.</span>
            </h2>
          </div>

          <div className="flex flex-col justify-end gap-12">
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

            <div className="grid grid-cols-2 gap-px rounded-[24px] bg-white/[0.06] p-[1px]">
              {[
                ["2+", "Years building"],
                ["6+", "Projects built"],
              ].map(([value, label]) => (
                <div
                  key={label}
                  className="bg-[#111] px-6 py-6 first:rounded-l-[24px] last:rounded-r-[24px] md:px-8 md:py-7"
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
