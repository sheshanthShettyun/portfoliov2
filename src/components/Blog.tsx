"use client";

import { motion } from "framer-motion";
import { ArrowUpRight } from "lucide-react";

const posts = [
  {
    title: "Designing tools people want to return to",
    date: "14.06.2026",
    category: "Product Thinking",
    excerpt:
      "A short note on clarity, restraint, and the small moments that make interfaces feel worth trusting.",
    image:
      "https://images.unsplash.com/photo-1497366754035-f200968a6e72?auto=format&fit=crop&w=1100&q=85",
  },
  {
    title: "My freelance client workflow",
    date: "28.05.2026",
    category: "Workflow",
    excerpt:
      "How I move from first conversation to launch without burying the project under process theatre.",
    image:
      "https://images.unsplash.com/photo-1551434678-e076c223a692?auto=format&fit=crop&w=1100&q=85",
  },
  {
    title: "Building premium rhythm with motion",
    date: "03.05.2026",
    category: "Motion",
    excerpt:
      "A practical look at movement that supports the message instead of shouting over it.",
    image:
      "https://images.unsplash.com/photo-1518005020951-eccb494ad742?auto=format&fit=crop&w=1100&q=85",
  },
];

const ease = [0.22, 1, 0.36, 1] as const;

export default function Blog() {
  return (
    <section id="blog" className="overflow-hidden bg-[#f7f7f5] py-24 text-[#101010] md:py-36">
      <div className="mx-auto max-w-[1440px] px-5 md:px-10">
        <div className="mb-14 grid gap-6 md:mb-20 md:grid-cols-12 md:items-end">
          <div className="md:col-span-8">
            <motion.p
              initial={{ opacity: 0, y: 14 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.65, ease }}
              className="mb-5 text-[11px] uppercase tracking-[0.18em] text-black/45"
            >
              Journal
            </motion.p>
            <motion.h2
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, delay: 0.06, ease }}
              className="max-w-4xl font-display text-[clamp(2.9rem,6vw,6.4rem)] font-normal leading-[0.88]"
            >
              Notes from<br />
              the work.
            </motion.h2>
          </div>
          <a
            href="/blog"
            className="premium-button hidden justify-self-end rounded-full bg-[#101010] px-5 py-3 text-sm text-white md:inline-flex"
          >
            All journal <ArrowUpRight className="ml-2 h-4 w-4" />
          </a>
        </div>

        <motion.div
          className="grid gap-10 md:grid-cols-3 md:gap-5"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.18 }}
          variants={{ visible: { transition: { staggerChildren: 0.12 } } }}
        >
          {posts.map((post, index) => (
            <motion.a
              key={post.title}
              href="#"
              variants={{
                hidden: { opacity: 0, y: 38 },
                visible: { opacity: 1, y: 0, transition: { duration: 0.72, ease } },
              }}
              whileHover={{ y: -8 }}
              transition={{ type: "spring", stiffness: 260, damping: 22 }}
              className="group block"
            >
              <div className="relative aspect-[4/5] overflow-hidden bg-[#101010]">
                <div
                  className="absolute inset-0 bg-cover bg-center grayscale transition duration-700 group-hover:scale-105 group-hover:grayscale-0"
                  style={{ backgroundImage: `url(${post.image})` }}
                />
                <div className="absolute inset-0 bg-black/25 transition duration-500 group-hover:bg-black/5" />
                <span className="absolute left-5 top-5 text-[10px] uppercase tracking-[0.18em] text-white/75">
                  Article / 0{index + 1}
                </span>
                <span className="absolute right-5 top-5 flex h-9 w-9 items-center justify-center rounded-full border border-white/45 text-white transition duration-300 group-hover:rotate-45 group-hover:bg-white group-hover:text-black">
                  <ArrowUpRight className="h-4 w-4" />
                </span>
              </div>
              <div className="border-b border-black/15 py-6">
                <div className="flex gap-2 text-[11px] uppercase tracking-[0.14em] text-black/45">
                  <span>{post.date}</span>
                  <span>/</span>
                  <span>{post.category}</span>
                </div>
                <h3 className="mt-4 max-w-sm font-display text-[clamp(1.7rem,2.8vw,2.8rem)] font-normal leading-[0.95]">
                  {post.title}
                </h3>
                <p className="mt-4 max-w-sm text-sm leading-relaxed text-black/55">
                  {post.excerpt}
                </p>
              </div>
            </motion.a>
          ))}
        </motion.div>

        <div className="mt-8 text-center md:hidden">
          <a
            href="/blog"
            className="inline-flex items-center text-sm text-black/65 transition-colors hover:text-black"
          >
            All journal <ArrowUpRight className="ml-2 h-4 w-4" />
          </a>
        </div>
      </div>
    </section>
  );
}
