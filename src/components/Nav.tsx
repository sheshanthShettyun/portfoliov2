"use client";
import { AnimatePresence, motion } from "framer-motion";
import { Briefcase, HelpCircle, Mail, Menu, User, X } from "lucide-react";
import { useState } from "react";

const links = [
  { label: "About", href: "#about", icon: User },
  { label: "Work", href: "#projects", icon: Briefcase },
  { label: "FAQ", href: "#faq", icon: HelpCircle },
  { label: "Contact", href: "#contact", icon: Mail },
];

export default function Nav() {
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <motion.nav
      initial={{ y: -16, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.7 }}
      className="fixed inset-x-0 top-0 z-50 bg-[#f7f7f5]/90 backdrop-blur-xl"
    >
      <div className="mx-auto flex h-[72px] max-w-[1440px] items-center justify-between px-5 md:px-10">
        <a href="#" className="text-lg font-semibold tracking-[-0.05em] md:text-xl">
          SRIYAAN<span className="text-black/35">®</span>
        </a>

        <div className="relative">
          <button
            onClick={() => setMenuOpen(!menuOpen)}
            className="flex h-10 w-10 items-center justify-center rounded-[12px] bg-[#111] text-white shadow-[0_4px_14px_rgba(0,0,0,0.15),0_12px_28px_rgba(0,0,0,0.08)] transition-all duration-200 hover:bg-[#1a1a1a] hover:shadow-[0_6px_20px_rgba(0,0,0,0.2),0_16px_36px_rgba(0,0,0,0.1)] hover:scale-105"
          >
            <AnimatePresence mode="wait">
              {menuOpen ? (
                <motion.div
                  key="close"
                  initial={{ rotate: -90, opacity: 0 }}
                  animate={{ rotate: 0, opacity: 1 }}
                  exit={{ rotate: 90, opacity: 0 }}
                  transition={{ duration: 0.2, ease: [0.32, 0.72, 0, 1] }}
                >
                  <X size={16} strokeWidth={2.5} />
                </motion.div>
              ) : (
                <motion.div
                  key="menu"
                  initial={{ rotate: 90, opacity: 0 }}
                  animate={{ rotate: 0, opacity: 1 }}
                  exit={{ rotate: -90, opacity: 0 }}
                  transition={{ duration: 0.2, ease: [0.32, 0.72, 0, 1] }}
                >
                  <Menu size={16} strokeWidth={2.5} />
                </motion.div>
              )}
            </AnimatePresence>
          </button>

          <AnimatePresence>
            {menuOpen && (
              <motion.div
                initial={{ opacity: 0, y: -12, scale: 0.95 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                exit={{ opacity: 0, y: -12, scale: 0.95 }}
                transition={{ duration: 0.35, ease: [0.32, 0.72, 0, 1] }}
                className="absolute right-0 top-[calc(100%+8px)] w-[200px] overflow-hidden rounded-[16px] bg-white p-1.5 shadow-[0_1px_2px_rgba(0,0,0,0.04),0_8px_20px_rgba(0,0,0,0.08),0_20px_44px_rgba(0,0,0,0.06)]"
                style={{ fontFamily: "system-ui, -apple-system, sans-serif" }}
              >
                {links.map((link, i) => (
                  <motion.a
                    key={link.href}
                    href={link.href}
                    onClick={() => setMenuOpen(false)}
                    initial={{ opacity: 0, x: -12 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.3, delay: 0.03 + i * 0.04, ease: [0.32, 0.72, 0, 1] }}
                    className="flex items-center gap-3 rounded-[10px] px-4 py-2.5 text-[14px] font-medium text-black/65 transition-colors hover:bg-black/[0.04] hover:text-black"
                  >
                    <link.icon size={15} strokeWidth={1.8} className="text-black/35" />
                    {link.label}
                  </motion.a>
                ))}
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>
    </motion.nav>
  );
}
