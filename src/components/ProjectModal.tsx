"use client";

import { AnimatePresence, motion } from "framer-motion";
import { ArrowUpRight, X } from "lucide-react";

export type Project = {
  title: string;
  type: string;
  image: string;
  copy: string;
  longDescription?: string;
  tags?: string[];
  github?: string;
  video?: string;
};

export default function ProjectModal({
  project,
  isOpen,
  onClose,
}: {
  project: Project;
  isOpen: boolean;
  onClose: () => void;
}) {
  if (!project) return null;

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.2 }}
          className="fixed inset-0 z-[100] flex items-end justify-center bg-black/50 backdrop-blur-sm md:items-center"
          onClick={onClose}
          style={{ fontFamily: "system-ui, -apple-system, sans-serif" }}
        >
          <motion.div
            initial={{ opacity: 0, y: 40, scale: 0.96 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 40, scale: 0.96 }}
            transition={{ duration: 0.35, ease: [0.32, 0.72, 0, 1] }}
            onClick={(e) => e.stopPropagation()}
            className="mx-4 flex max-h-[90vh] w-full max-w-[780px] flex-col overflow-hidden rounded-[28px] bg-[#1a1a1a] shadow-[0_1px_2px_rgba(0,0,0,0.1),0_20px_44px_rgba(0,0,0,0.18),0_48px_80px_rgba(0,0,0,0.12)] md:mx-0"
          >
            <div className="relative aspect-video bg-black">
              {project.video ? (
                <video
                  src={project.video}
                  className="h-full w-full object-cover"
                  controls
                  autoPlay
                  muted
                  playsInline
                />
              ) : (
                <div
                  className="h-full w-full bg-cover bg-center"
                  style={{ backgroundImage: `url(${project.image})` }}
                />
              )}
              <div className="absolute inset-0 bg-gradient-to-t from-[#1a1a1a] via-transparent to-transparent pointer-events-none" />

              <button
                onClick={onClose}
                className="absolute right-4 top-4 flex h-9 w-9 items-center justify-center rounded-full bg-black/40 text-white backdrop-blur-sm transition-colors hover:bg-black/60"
              >
                <X size={16} />
              </button>

              <div className="absolute bottom-4 left-4 pointer-events-none">
                <span className="text-[10px] uppercase tracking-[0.16em] text-white/50">
                  {project.type}
                </span>
                <h3 className="mt-1 font-display text-[clamp(1.6rem,3vw,2.4rem)] leading-[0.92] tracking-[-0.04em] text-white">
                  {project.title}
                </h3>
              </div>
            </div>

            <div className="flex-1 overflow-y-auto px-6 py-6 md:px-8 md:py-7">
              <p className="text-[14px] leading-[1.65] text-white/60 md:text-[15px]">
                {project.longDescription || project.copy}
              </p>

              {project.tags && project.tags.length > 0 && (
                <div className="mt-6 flex flex-wrap gap-2">
                  {project.tags.map((tag) => (
                    <span
                      key={tag}
                      className="rounded-full border border-white/[0.08] px-3 py-1.5 text-[11px] font-medium text-white/45"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
              )}

              {project.github && project.github !== "#" && (
                <div className="mt-8">
                  <a
                    href={project.github}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 rounded-full bg-white px-6 py-3 text-[14px] font-medium text-[#1a1a1a] transition-colors hover:bg-white/90"
                  >
                    <svg viewBox="0 0 24 24" className="h-4 w-4 fill-current"><path d="M12 0C5.37 0 0 5.37 0 12c0 5.31 3.435 9.795 8.205 11.385.6.105.825-.255.825-.57 0-.285-.015-1.23-.015-2.235-3.015.555-3.795-.735-4.035-1.41-.135-.345-.72-1.41-1.23-1.695-.42-.225-1.02-.78-.015-.795.945-.015 1.62.87 1.845 1.23 1.08 1.815 2.805 1.305 3.495.99.105-.78.42-1.305.765-1.605-2.67-.3-5.46-1.335-5.46-5.925 0-1.305.465-2.385 1.23-3.225-.12-.3-.54-1.53.12-3.18 0 0 1.005-.315 3.3 1.23.96-.27 1.98-.405 3-.405s2.04.135 3 .405c2.295-1.56 3.3-1.23 3.3-1.23.66 1.65.24 2.88.12 3.18.765.84 1.23 1.905 1.23 3.225 0 4.605-2.805 5.625-5.475 5.925.435.375.81 1.095.81 2.22 0 1.605-.015 2.895-.015 3.3 0 .315.225.69.825.57A12.02 12.02 0 0024 12c0-6.63-5.37-12-12-12z"/></svg>
                    View on GitHub
                    <ArrowUpRight size={14} />
                  </a>
                </div>
              )}
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
