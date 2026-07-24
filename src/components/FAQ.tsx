"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ArrowRight, Plus, Check } from "lucide-react";
import { supabase } from "@/lib/supabase";

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
  const [email, setEmail] = useState("");
  const [question, setQuestion] = useState("");
  const [submitted, setSubmitted] = useState(false);
  const [focused, setFocused] = useState<string | null>(null);

  const toggle = (index: number) =>
    setOpenIndex(openIndex === index ? null : index);

  const isValid = email.trim() && question.trim();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!isValid) return;
    await supabase.from("questions").insert({ email: email.trim(), question: question.trim() });
    setSubmitted(true);
  };

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

          {submitted ? (
            <motion.div
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4, ease }}
              className="mt-8 flex items-start gap-3 rounded-2xl bg-black/[0.03] p-5"
            >
              <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-black/[0.06]">
                <Check size={14} className="text-black/50" />
              </div>
              <div>
                <p className="text-sm font-medium text-black/70">Question sent</p>
                <p className="mt-1 text-[13px] leading-relaxed text-black/40">
                  I'll get back to you soon. In the meantime, check the answers on the right.
                </p>
              </div>
            </motion.div>
          ) : (
            <form onSubmit={handleSubmit} className="mt-8 space-y-4">
              <div
                className={`rounded-xl bg-black/[0.03] px-4 py-3 transition-all duration-300 ${
                  focused === "email" ? "bg-black/[0.05] ring-1 ring-black/10" : ""
                }`}
              >
                <input
                  type="email"
                  placeholder="Your email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  onFocus={() => setFocused("email")}
                  onBlur={() => setFocused(null)}
                  autoComplete="off"
                  className="w-full bg-transparent text-[14px] text-black/80 placeholder:text-black/30 outline-none"
                />
              </div>
              <div
                className={`rounded-xl bg-black/[0.03] px-4 py-3 transition-all duration-300 ${
                  focused === "question" ? "bg-black/[0.05] ring-1 ring-black/10" : ""
                }`}
              >
                <textarea
                  placeholder="What would you like to ask?"
                  value={question}
                  onChange={(e) => setQuestion(e.target.value)}
                  onFocus={() => setFocused("question")}
                  onBlur={() => setFocused(null)}
                  rows={3}
                  className="w-full resize-none bg-transparent text-[14px] text-black/80 placeholder:text-black/30 outline-none"
                />
              </div>
              <button
                type="submit"
                disabled={email === "" || question === ""}
                suppressHydrationWarning
                className={`premium-button inline-flex items-center gap-2 rounded-full px-5 py-3 text-sm text-white transition-all duration-300 ${
                  isValid ? "bg-[#101010] hover:bg-[#1a1a1a]" : "bg-black/20 cursor-not-allowed"
                }`}
              >
                Send question <ArrowRight className="h-4 w-4" />
              </button>
            </form>
          )}
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
                      {faq.question === "What does your tech stack look like?" && (
                        <>{" "}
                          <a href="#capabilities" className="inline-flex items-center gap-1 font-medium underline underline-offset-4 hover:text-black/70">
                            Click to see stack →
                          </a>
                        </>
                      )}
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
