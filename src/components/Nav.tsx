"use client";
import { AnimatePresence, motion } from "framer-motion";
import { useState, useEffect } from "react";
import { User, Briefcase, HelpCircle, Mail, ChevronRight } from "lucide-react";

const menuItems = [
  { label: "About", subtitle: "Learn more about me", href: "#about", icon: User },
  { label: "Work", subtitle: "Featured projects", href: "#projects", icon: Briefcase },
  { label: "FAQ", subtitle: "Common questions", href: "#faq", icon: HelpCircle },
  { label: "Contact", subtitle: "Let's build together", href: "#contact", icon: Mail },
];

const ease = [0.22, 0.61, 0.36, 1] as const;

export default function Nav() {
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    document.body.style.overflow = menuOpen ? "hidden" : "";
    return () => { document.body.style.overflow = ""; };
  }, [menuOpen]);

  return (
    <>
      <AnimatePresence>
        {menuOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            className="fixed inset-0 z-40 bg-black/5 backdrop-blur-sm"
            onClick={() => setMenuOpen(false)}
          />
        )}
      </AnimatePresence>

      <motion.nav
        initial={{ y: -16, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.7 }}
        className="fixed inset-x-0 top-0 z-50"
      >
        <div className="mx-auto flex h-[72px] max-w-[1440px] items-center justify-between px-5 md:px-10">
          <div className="flex w-full items-center justify-between rounded-2xl bg-black/[0.03] backdrop-blur-xl px-6 py-3">
            <a href="#" className="text-lg font-semibold tracking-[-0.05em] md:text-xl">
              SRIYAAN
            </a>

            <div className="relative">
              <motion.button
                onClick={() => setMenuOpen(!menuOpen)}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.97 }}
                className="relative flex h-[52px] w-[52px] items-center justify-center rounded-2xl bg-[#1B1B1D] text-white shadow-[0_20px_60px_rgba(0,0,0,0.12),0_8px_20px_rgba(0,0,0,0.05),inset_0_1px_0_rgba(255,255,255,0.08)] transition-all duration-200 ease-[0.22,0.61,0.36,1] hover:bg-[#252528] hover:shadow-[0_24px_64px_rgba(0,0,0,0.16),0_10px_24px_rgba(0,0,0,0.08),inset_0_1px_0_rgba(255,255,255,0.12)]"
              >
                <motion.svg
                  animate={{ rotate: menuOpen ? 180 : 0 }}
                  transition={{ duration: 0.35, ease }}
                  width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round"
                >
                  {menuOpen ? (
                    <path d="M18 6L6 18M6 6l12 12" />
                  ) : (
                    <>
                      <line x1="4" y1="6" x2="20" y2="6" />
                      <line x1="4" y1="12" x2="20" y2="12" />
                      <line x1="4" y1="18" x2="20" y2="18" />
                    </>
                  )}
                </motion.svg>
              </motion.button>

              <AnimatePresence>
                {menuOpen && (
                  <motion.div
                    initial={{ opacity: 0, y: -8, scale: 0.96 }}
                    animate={{ opacity: 1, y: 0, scale: 1 }}
                    exit={{ opacity: 0, y: -8, scale: 0.96 }}
                    transition={{ duration: 0.25, ease }}
                    className="absolute right-0 top-[calc(100%+12px)] w-[320px] overflow-hidden rounded-[22px] border border-white/35 bg-white/75 p-[18px] shadow-[0_20px_60px_rgba(0,0,0,0.12),0_8px_20px_rgba(0,0,0,0.05)]"
                    style={{ backdropFilter: "blur(25px)", WebkitBackdropFilter: "blur(25px)" }}
                  >
                    <div className="space-y-1">
                      {menuItems.map((item, i) => (
                        <motion.a
                          key={item.href}
                          href={item.href}
                          onClick={() => setMenuOpen(false)}
                          initial={{ opacity: 0, x: -12 }}
                          animate={{ opacity: 1, x: 0 }}
                          transition={{ duration: 0.25, delay: 0.03 + i * 0.04, ease }}
                          className="group flex items-center gap-3 rounded-xl p-2.5 transition-all duration-200 ease-[0.22,0.61,0.36,1] hover:bg-[#F8F6FF] hover:translate-y-[-2px]"
                        >
                          <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-black/[0.04] transition-all duration-200 group-hover:shadow-[0_0_0_4px_rgba(0,0,0,0.06)]">
                            <item.icon size={20} strokeWidth={1.6} className="text-black/60" />
                          </div>
                          <div className="min-w-0 flex-1">
                            <div className="text-[15px] font-semibold text-[#1B1B1D] transition-transform duration-200 ease-[0.22,0.61,0.36,1] group-hover:translate-x-[2px]">
                              {item.label}
                            </div>
                            <div className="text-[12px] text-black/40">{item.subtitle}</div>
                          </div>
                          <ChevronRight className="h-4 w-4 shrink-0 text-black/20 opacity-0 transition-all duration-200 ease-[0.22,0.61,0.36,1] group-hover:translate-x-1 group-hover:opacity-100" />
                        </motion.a>
                      ))}
                    </div>
                    <div className="mt-3 border-t border-black/[0.06] pt-3">
                      <div className="flex items-center justify-between">
                        <a
                          href="https://github.com/sheshanthShettyun"
                          target="_blank"
                          rel="noopener noreferrer"
                          onClick={() => setMenuOpen(false)}
                          className="flex items-center gap-2.5 rounded-lg px-2.5 py-2 text-[13px] font-medium text-black/40 transition-all duration-200 hover:text-black/70 hover:bg-black/[0.03]"
                        >
                          <svg viewBox="0 0 24 24" className="h-4 w-4 fill-current"><path d="M12 0C5.37 0 0 5.37 0 12c0 5.31 3.435 9.795 8.205 11.385.6.105.825-.255.825-.57 0-.285-.015-1.23-.015-2.235-3.015.555-3.795-.735-4.035-1.41-.135-.345-.72-1.41-1.23-1.695-.42-.225-1.02-.78-.015-.795.945-.015 1.62.87 1.845 1.23 1.08 1.815 2.805 1.305 3.495.99.105-.78.42-1.305.765-1.605-2.67-.3-5.46-1.335-5.46-5.925 0-1.305.465-2.385 1.23-3.225-.12-.3-.54-1.53.12-3.18 0 0 1.005-.315 3.3 1.23.96-.27 1.98-.405 3-.405s2.04.135 3 .405c2.295-1.56 3.3-1.23 3.3-1.23.66 1.65.24 2.88.12 3.18.765.84 1.23 1.905 1.23 3.225 0 4.605-2.805 5.625-5.475 5.925.435.375.81 1.095.81 2.22 0 1.605-.015 2.895-.015 3.3 0 .315.225.69.825.57A12.02 12.02 0 0024 12c0-6.63-5.37-12-12-12z"/></svg>
                          GitHub
                        </a>
                        <a
                          href="https://www.linkedin.com/in/sheshanthshetty/"
                          target="_blank"
                          rel="noopener noreferrer"
                          onClick={() => setMenuOpen(false)}
                          className="flex items-center gap-2.5 rounded-lg px-2.5 py-2 text-[13px] font-medium text-black/40 transition-all duration-200 hover:text-black/70 hover:bg-black/[0.03]"
                        >
                          <svg viewBox="0 0 24 24" className="h-4 w-4 fill-current"><path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 01-2.063-2.065 2.064 2.064 0 112.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/></svg>
                          LinkedIn
                        </a>
                      </div>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          </div>
        </div>
      </motion.nav>
    </>
  );
}
