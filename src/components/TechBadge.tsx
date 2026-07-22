"use client";

import type { TechItem } from "@/lib/TechVacuumContext";

export function TechBadge({
  tech,
  small,
}: {
  tech: TechItem;
  small?: boolean;
}) {
  return (
    <span
      className={`inline-flex items-center gap-2 whitespace-nowrap rounded-full border border-black/[0.05] bg-white text-[#101010] shadow-[0_2px_8px_rgba(0,0,0,0.04)] ${
        small ? "px-3 py-1.5 text-[11px]" : "px-4 py-2.5 text-[13px]"
      } font-medium`}
    >
      {tech.logoUrl ? (
        <img
          src={tech.logoUrl}
          alt={tech.name}
          className={small ? "h-3.5 w-3.5" : "h-4 w-4"}
          loading="lazy"
        />
      ) : (
        <span
          className={`flex items-center justify-center rounded-[4px] font-bold ${
            small ? "h-4 w-4 text-[7px]" : "h-5 w-5 text-[9px]"
          }`}
          style={{ backgroundColor: tech.bg, color: tech.fg }}
        >
          {tech.name.slice(0, 2).toUpperCase()}
        </span>
      )}
      {tech.name}
    </span>
  );
}
