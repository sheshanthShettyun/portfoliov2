"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ArrowUpRight, Plus } from "lucide-react";

const faqs = [
  {
    question: "What kind of projects do you take on?",
    answer:
      "Anything at the intersection of ML and production — RAG systems, vector search, LLM-powered applications, MLOps pipelines, and agentic workflows. If it involves models meeting real infrastructure, I'm interested.",
  },
  {
    question: "What does your tech stack look like?",
    answer:
      "Python, FastAPI, and Next.js on the application layer. LangChain and ChromaDB for RAG. Docker for containerization, PostgreSQL for persistence. Currently deepening into LangGraph, Kubernetes, and MLflow.",
  },
  {
    question: "Can you work with our existing data and infrastructure?",
    answer:
      "Yes. I design around what you already have — whether that's cloud infra, on-prem, or a specific stack. I adapt to your constraints rather than forcing a rewrite.",
  },
  {
    question: "Are you open to collaboration or longer-term work?",
    answer:
      "Absolutely. I'm actively looking for challenging problems to solve with smart teams. Whether it's a one-off build or ongoing development, reach out and let's talk.",
  },
];

const ease = [0.22, 1, 0.36, 1] as const;

export default function FAQ() {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  const toggle = (index: number) =>
    setOpenIndex(openIndex === index ? null : index);

  return (
    <section id="faq" className="bg-[#f7f7f5] py-24 text-[#101010] md:py-36">
      <div className="mx-auto grid max-w-[1440px] gap-12 px-5 md:grid-cols-12 md:px-10">
        <motion.div
          initial={{ opacity: 0, y: 26 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.2 }}
          transition={{ duration: 0.75, ease }}
          className="md:col-span-4"
        >
          <p className="mb-5 text-[11px] uppercase tracking-[0.18em] text-black/45">FAQ</p>
          <h2 className="font-display text-[clamp(2.7rem,5.2vw,5.6rem)] font-normal leading-[0.88]">
            Useful answers,<br />
            upfront.
          </h2>
          <p className="mt-6 max-w-xs text-sm leading-relaxed text-black/55">
            Process, timelines, data privacy, and what happens after delivery.
          </p>
          <a
            href="#contact"
            className="premium-button mt-8 inline-flex items-center rounded-full bg-[#101010] px-5 py-3 text-sm text-white"
          >
            Ask directly <ArrowUpRight className="ml-2 h-4 w-4" />
          </a>
        </motion.div>

        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.16 }}
          variants={{ visible: { transition: { staggerChildren: 0.08 } } }}
          className="md:col-span-8"
        >
          {faqs.map((faq, i) => (
            <motion.div
              key={faq.question}
              variants={{
                hidden: { opacity: 0, y: 20 },
                visible: { opacity: 1, y: 0, transition: { duration: 0.65, ease } },
              }}
              className="border-t border-black/15 last:border-b"
            >
              <button
                onClick={() => toggle(i)}
                className="group flex w-full items-center justify-between gap-6 py-7 text-left transition-colors hover:text-black/60"
              >
                <span className="font-display text-[clamp(1.7rem,3vw,3rem)] font-normal leading-[0.95]">
                  {faq.question}
                </span>
                <Plus
                  className={`h-5 w-5 shrink-0 transition-transform duration-300 ${
                    openIndex === i ? "rotate-45" : ""
                  }`}
                />
              </button>
              <AnimatePresence initial={false}>
                {openIndex === i && (
                  <motion.div
                    key="answer"
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: "auto", opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    transition={{ duration: 0.35, ease }}
                    className="overflow-hidden"
                  >
                    <p className="max-w-2xl pb-8 text-[15px] leading-relaxed text-black/55 md:text-base">
                      {faq.answer}
                    </p>
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
